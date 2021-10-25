import * as React from "react";
import { findRecursive, randomOne, createVid, Vid, replaceSlashes } from "./utils";

const numToCache = 3;

export const useJoshieVids = (rootDir: string) => {
  //const [cached, setCached] = React.useState<Vid[]>([])

  // const { onPlayed, remotePath } = useRemotePaths(rootDir);

  // const [vid, setVid] = React.useState<Vid>(() => createVid(remotePath));

  // React.useEffect(() => {
  //   const vid = createVid(remotePath);
  //   setVid(vid);

  // }, [remotePath]);

  // return {
  //   vid,
  //   onPlayed,
  // };

  const allPaths = React.useMemo(
    () => findRecursive(rootDir).map((p) => replaceSlashes(p)),
    [rootDir]
  );

  return allPaths;
};
