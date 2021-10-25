import { produceConfig } from "./utils/produceConfig";

import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), "../.env"),
});

export const config = produceConfig(
  {
    NEWS_API_KEY: ``,
    XYLOPHONE_SIZE_RATIO: `1`,
    ROOT_JOSHIE_VIDS_PATH: `//PINAS/CannMedia/Josh Photos`,
  },
  { requiredInEnv: "all" }
);
