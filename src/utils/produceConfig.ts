import { pick } from "./obj";
import { areSetsEqual, getDifferenceBetweenSets } from "./set";

type BaseConfig = Record<string, string>;

interface Options<T extends BaseConfig> {
  requiredInEnv?: (keyof T)[] | "all" | undefined;
  getEnv?: () => NodeJS.ProcessEnv;
}

export const produceConfig = <T extends BaseConfig>(base: T, options?: Options<T>): Readonly<T> => {
  const getEnv = options && options.getEnv ? options.getEnv : () => process.env;

  const envVars = getEnv();
  const definedEnvKeys = Object.keys(envVars).filter((k) => base.hasOwnProperty(k));
  const baseKeys = Object.keys(base);

  if (options && options.requiredInEnv) {
    const baseKeysSet = new Set(baseKeys);
    const definedKeysSet = new Set(definedEnvKeys);
    const requiredKeys = new Set(
      options.requiredInEnv == "all" ? baseKeysSet : options.requiredInEnv
    );

    if (!areSetsEqual(requiredKeys, definedKeysSet)) {
      const difference = Array.from(getDifferenceBetweenSets(requiredKeys, definedKeysSet)).join(
        ", "
      );
      throw new Error(
        `Cannot produce config, missing the expected environment variables: '${difference}'`
      );
    }
  }

  return Object.freeze({
    ...base,
    ...pick(envVars, ...definedEnvKeys),
  }) as any;
};
