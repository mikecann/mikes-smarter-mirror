import * as React from "react";
import { randomOne, Vid, createVid } from "./utils";
import { crawlForVideos } from "./crawlForVideos";

const numToCache = 3;

interface VidState {
  remotePath: string;
  readyToPlay: boolean;
}

interface Props {}

export const JoshieVids: React.FC<Props> = ({}) => {
  const [videoUrls, setVideoUrls] = React.useState<string[]>([]);
  const [currentVid, setCurrentVid] = React.useState<Vid>();

  React.useEffect(() => {
    crawlForVideos()
      .then((results) => {
        console.log(`videos loaded`, results);
        setVideoUrls(results);
      })
      .catch((e) => console.error(`crawl finished`, e));
  }, []);

  React.useEffect(() => {
    if (currentVid != undefined) return;
    if (videoUrls.length == 0) return;
    setCurrentVid(createVid(randomOne(videoUrls)));
  }, [videoUrls, currentVid]);

  return (
    <div>
      {currentVid && (
        <div style={{ position: "relative", height: `60vh` }}>
          <video
            src={currentVid.url}
            autoPlay
            height={`100%`}
            onEnded={() => {
              console.log(`VidPlayer played`, { currentVid });
              setCurrentVid(undefined);
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              background: `rgba(0,0,0,0.5)`,
              color: "white",
              padding: 10,
            }}
          >
            {currentVid.month} {currentVid.year}
          </div>
        </div>
      )}
    </div>
  );
};
