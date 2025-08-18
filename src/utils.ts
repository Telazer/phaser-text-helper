import { TConfig } from "./types";
import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  kebabCase,
  noCase,
  pascalCase,
  pascalSnakeCase,
  pathCase,
  sentenceCase,
  snakeCase,
  trainCase,
} from "change-case";
export { TOptions } from "i18next";

export const format = (text: string, config?: TConfig | null): string => {
  if (config?.format) {
    const formatters: Record<
      NonNullable<TConfig["format"]>,
      (str: string) => string
    > = {
      upperCase: (str: string) => str.toUpperCase(),
      lowerCase: (str: string) => str.toLowerCase(),
      capitalCase: (str: string) => capitalCase(str),
      camelCase: (str: string) => camelCase(str),
      constantCase: (str: string) => constantCase(str),
      dotCase: (str: string) => dotCase(str),
      kebabCase: (str: string) => kebabCase(str),
      noCase: (str: string) => noCase(str),
      pascalCase: (str: string) => pascalCase(str),
      pascalSnakeCase: (str: string) => pascalSnakeCase(str),
      pathCase: (str: string) => pathCase(str),
      sentenceCase: (str: string) => sentenceCase(str),
      snakeCase: (str: string) => snakeCase(str),
      trainCase: (str: string) => trainCase(str),
    };

    return formatters[config.format](text);
  }
  return text;
};
