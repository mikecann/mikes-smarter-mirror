import { Content, Horizontal, Vertical } from "gls/lib";
import * as React from "react";
import { config } from "../../config";
import { hoursToMs } from "../../utils/time";
import { randomOne, wrap } from "../../utils/num";
import { testArticle1 } from "./fixtures";
import { useTick } from "../../utils/useTick";

interface Props {}

interface Result {
  status: "ok" | "error";
  articles: Article;
}

interface Article {
  source: ArticleSource;
  title: string;
  description: string;
  urlToImage: string;
}

interface ArticleSource {
  name: string;
}

const urls = [
  `https://newsapi.org/v2/top-headlines?country=AU&category=general&apiKey=${config.NEWS_API_KEY}`,
  `https://newsapi.org/v2/top-headlines?country=AU&category=technology&apiKey=${config.NEWS_API_KEY}`,
  `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${config.NEWS_API_KEY}`,
];

export const News: React.FC<Props> = ({}) => {
  const [articles, setArticles] = React.useState<Article[]>([testArticle1]);

  const index = useTick(10000);

  React.useEffect(() => {
    const check = async () => {
      console.log("checking the news...");
      const results: Result[] = await Promise.all(
        urls.map((url) => fetch(url).then((o) => o.json()))
      );
      setArticles(
        results
          .filter((r) => r.status != "error")
          .map((r) => r.articles)
          .flat()
      );
    };
    check();
    const id = setInterval(check, hoursToMs(4));
    return () => clearInterval(id);
  }, []);

  if (articles.length == 0) return null;

  const { description, source, title, urlToImage } = articles[wrap(index, articles.length)];

  return (
    <Vertical
      horizontalAlign="right"
      style={{ textAlign: "right", position: "relative" }}
      spacing={10}
    >
      <img src={urlToImage} style={{ objectFit: "cover", height: `35vh` }} />
      <div
        style={{
          fontSize: "2em",
          color: `#fff`,
          maxLines: 2,
          padding: 10,
          position: "absolute",
          bottom: 40,
          width: "100%",
          backgroundColor: `rgba(0,0,0,0.7)`,
        }}
      >
        <span>{title}</span>
      </div>
      {/* <div style={{ color: `#bbb` }}>{description}</div> */}
    </Vertical>
  );
};
