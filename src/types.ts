import { TOptions } from "i18next";

export type TConfig = {
  /** Examples:
   * upperCase: "TEST STRING"
   * lowerCase: "test string"
   * camelCase: "testString"
   * capitalCase: "Test String"
   * constantCase: "TEST_STRING"
   * dotCase: "test.string"
   * kebabCase: "test-string"
   * noCase: "test string"
   * pascalCase: "TestString"
   * pascalSnakeCase: "Test_String"
   * pathCase: "test/string"
   * sentenceCase: "Test string"
   * snakeCase: "test_string"
   * trainCase: "Test-String"
   */
  format?:
    | "upperCase"
    | "lowerCase"
    | "camelCase"
    | "capitalCase"
    | "constantCase"
    | "dotCase"
    | "kebabCase"
    | "noCase"
    | "pascalCase"
    | "pascalSnakeCase"
    | "pathCase"
    | "sentenceCase"
    | "snakeCase"
    | "trainCase";
};

type ITextOptions = {
  i18n?: TOptions;
};

export interface IDomTextOptions extends ITextOptions {
  format?: TConfig["format"];
}

export interface IPhaserTextOptions extends ITextOptions {
  config?: TConfig;
  styles?: Phaser.Types.GameObjects.Text.TextStyle;
}

export interface IPhaserText {
  object: Phaser.GameObjects.Text;
  key: string;
  options?: IPhaserTextOptions;
}

export interface ILocaleData {
  // key: "en_US"
  key: string;
  // name: "English" or "en_US"
  // you can store localeName in the translation file to get the name of the locale
  name: string;
  // value: { loading: "Loading..." }
  value: Record<string, string>;
}
