import * as fs from "fs";
import * as path from "path";
import { customRandom, urlAlphabet } from "nanoid";
import * as os from "os";

export const generateShortId = (): string => {
  const nanoid = customRandom(urlAlphabet, 10, (size) => {
    return new Uint8Array(size).map(() => 256 * Math.random());
  });
  return nanoid();
};

export function findRecursive(dir: string, paths: string[] = []): string[] {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      findRecursive(path.join(dir, file.name), paths);
    } else {
      if (file.name.endsWith(`m4v`)) paths.push(path.join(dir, file.name));
    }
  }
  return paths;
}

export function randomOne<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export interface Vid {
  status: "not-cached" | "caching" | "cached";
  localPath: string;
  remotePath: string;
  year: string | undefined;
  month: string | undefined;
}

export const createVid = (remotePath: string): Vid => {
  const parts = remotePath.split("/");
  return {
    remotePath,
    status: "not-cached",
    localPath: `${getTmpDir()}/${generateShortId()}.mp4`,
    month: parts[parts.length - 2],
    year: parts[parts.length - 3],
  };
};

export const replaceSlashes = (str: string): string => {
  const forwardSlashRegex = /(\\)/g;
  return str.replace(forwardSlashRegex, "/");
};

export const getTmpDir = () => {
  const path = os.tmpdir() + "/joshie-vids-cache";
  if (fs.existsSync(path)) return path;
  fs.mkdirSync(path);
  return path;
};

export const emptyTmpDir = () => {
  const dir = getTmpDir();
  console.log(`emptying tmp dir`, dir);
  for (const file of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, file.name);
    try {
      fs.unlinkSync(fullPath);
      console.log(`file deleted`, fullPath);
    } catch (e) {
      console.error(`could not delete`, fullPath, e);
    }
  }
};

export const catchAndCarryOn = <T>(fn: () => T, name?: string) => {
  try {
    return fn();
  } catch (e) {
    console.error(`catchAndCarryOn '${name}'`, e);
  }
};
