import * as React from "react";
import { useJoshieVids } from "./useJoshieVids";
import { config } from "../../config";
import { randomOne, getTmpDir, emptyTmpDir, catchAndCarryOn } from "./utils";
import { VidPlayer } from "./VidPlayer";
import * as fs from "fs";

const numToCache = 3;

interface VidState {
  remotePath: string;
  readyToPlay: boolean;
}

interface Props {}

export const JoshieVids: React.FC<Props> = ({}) => {
  const allPaths = useJoshieVids(config.ROOT_JOSHIE_VIDS_PATH);

  const [vids, setVids] = React.useState<Record<string, VidState>>({});
  const [playing, setPlaying] = React.useState<string>();

  // Clear out the cache on starup
  React.useEffect(() => {
    emptyTmpDir();
  }, []);

  React.useEffect(() => {
    if (Object.keys(vids).length >= numToCache) return;
    const remotePath = randomOne(allPaths);
    setVids((v) => ({ ...v, [remotePath]: { remotePath, readyToPlay: false } }));
  }, [Object.keys(vids).length]);

  React.useEffect(() => {
    if (playing) return;
    setPlaying(Object.values(vids).find((v) => v.readyToPlay)?.remotePath);
  }, [playing, vids]);

  return (
    <div>
      {Object.values(vids).map((p) => (
        <VidPlayer
          key={p.remotePath}
          remotePath={p.remotePath}
          canPlay={playing == p.remotePath}
          onCached={() => {
            setVids((v) => ({
              ...v,
              [p.remotePath]: { remotePath: p.remotePath, readyToPlay: true },
            }));
          }}
          onFinished={() => {
            setPlaying(undefined);
            setVids((v) => {
              const copy = { ...v };
              delete copy[p.remotePath];
              return copy;
            });
          }}
        />
      ))}
    </div>
  );
};
