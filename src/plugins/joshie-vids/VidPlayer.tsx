import * as React from "react";
import { createVid, Vid } from "./utils";
import * as fs from "fs";
import { promisify } from "util";
import { Vertical } from "gls/lib";

interface Props {
  remotePath: string;
  onCached: () => unknown;
  canPlay: boolean;
  onFinished: () => unknown;
}

export const VidPlayer: React.FC<Props> = ({ remotePath, canPlay, onCached, onFinished }) => {
  const [vid, setVid] = React.useState<Vid>();

  React.useEffect(() => {
    let exited = false;

    const vid = createVid(remotePath);
    setVid({ ...vid, status: "caching" });

    console.log(`VidPlayer starting to cache vid`, { remotePath });
    promisify(fs.copyFile)(vid.remotePath, vid.localPath).then(() => {
      if (exited) return;
      console.log(`VidPlayer cached`, { remotePath });
      setVid({ ...vid, status: "cached" });
      onCached();
    });

    return () => {
      exited = true;
    };
  }, [remotePath]);

  if (!vid || vid.status != "cached") return null;
  if (!canPlay) return null;

  return (
    <Vertical horizontalAlign="center" spacing={0}>
      <div>
        {vid.month} {vid.year}
      </div>
      <video
        src={vid.localPath}
        height={400}
        autoPlay
        onEnded={() => {
          console.log(`VidPlayer played`, { remotePath });
          onFinished();
          fs.unlink(vid.localPath, (err) => {
            console.log(`VidPlayer deleted local file`, { err, vid });
          });
        }}
      />
    </Vertical>
  );
};
