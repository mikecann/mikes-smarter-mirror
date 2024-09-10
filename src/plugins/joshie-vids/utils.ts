import { customRandom, urlAlphabet } from "nanoid";

export const generateShortId = (): string => {
  const nanoid = customRandom(urlAlphabet, 10, (size) => {
    return new Uint8Array(size).map(() => 256 * Math.random());
  });
  return nanoid();
};

export function randomOne<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export interface Vid {
  url: string;
  year: string | undefined;
  month: string | undefined;
}

export const createVid = (url: string): Vid => {
  const parts = url.split("/");
  return {
    url,
    month: parts[parts.length - 2],
    year: parts[parts.length - 3],
  };
};

export const replaceSlashes = (str: string): string => {
  const forwardSlashRegex = /(\\)/g;
  return str.replace(forwardSlashRegex, "/");
};
