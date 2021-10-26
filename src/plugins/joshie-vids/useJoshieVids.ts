import * as React from "react";
import { findRecursive, randomOne, createVid, Vid, replaceSlashes } from "./utils";

const numToCache = 3;

export const useJoshieVids = (rootDir: string) => {
  const allPaths = React.useMemo(() => {
    try {
      return findRecursive(rootDir).map((p) => replaceSlashes(p));
    } catch (e) {
      console.log(`failed trying to recusively find joshie vids`);
      return [];
    }
  }, [rootDir]);

  return allPaths;
};
