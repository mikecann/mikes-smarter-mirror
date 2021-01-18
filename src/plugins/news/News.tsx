import { Content, Horizontal, Vertical } from "gls/lib";
import * as React from "react";
import { config } from "../../config";
import { hoursToMs } from "../../utils/time";
import { randomOne } from "../../utils/num";
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
  `https://newsapi.org/v2/top-headlines?sources=abc-news-au,cnn,bbc-news&apiKey=${config.NEWS_API_KEY}ddd`,
  `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${config.NEWS_API_KEY}`,
];

export const News: React.FC<Props> = ({}) => {
  const [articles, setArticles] = React.useState<Article[]>([testArticle1]);

  useTick(10000);

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

  const { description, source, title, urlToImage } = randomOne(articles);

  return (
    <Vertical horizontalAlign="right" style={{ width: 800, textAlign: "right" }} spacing={10}>
      <img src={urlToImage} style={{ width: 800, objectFit: "cover", height: 400 }} />
      <div style={{ fontSize: "2em", color: `#ddd` }}>
        {source.name} - {title}
      </div>
      <div style={{ color: `#bbb` }}>{description}</div>
    </Vertical>
  );
};
