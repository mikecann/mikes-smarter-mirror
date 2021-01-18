import { produceConfig } from "./utils/produceConfig";

import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), "../.env"),
});

export const config = produceConfig(
  {
    NEWS_API_KEY: ``,
  },
  { requiredInEnv: "all" }
);
