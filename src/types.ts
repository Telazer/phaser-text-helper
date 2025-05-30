import { TOptions } from "i18next";

export type TConfig = {
  format?: "upperCase" | "lowerCase";
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
