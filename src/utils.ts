import { TConfig } from "./types";
export { TOptions } from "i18next";

export const format = (text: string, config?: TConfig | null): string => {
  if (config?.format) {
    const formatters: Record<
      NonNullable<TConfig["format"]>,
      (str: string) => string
    > = {
      upperCase: (str: string) => str.toUpperCase(),
      lowerCase: (str: string) => str.toLowerCase(),
    };

    return formatters[config.format](text);
  }
  return text;
};
