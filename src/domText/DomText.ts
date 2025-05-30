import { TextHelper } from "../TextHelper";
import { TOptions } from "i18next";
import { format } from "../utils";
import { TConfig, IDomTextOptions } from "../types";

export class DomText extends Text {
  static Texts: DomText[] = [];

  private options?: IDomTextOptions;

  private key: string;

  private constructor(key: string, options?: IDomTextOptions) {
    super(key);
    this.key = key;
    this.options = options;
    this.update();

    TextHelper.onLanguageChange(this.update.bind(this));
  }

  public static create(
    key: string,
    options?: {
      i18n?: TOptions;
      format?: TConfig["format"];
    }
  ) {
    const newText = new DomText(key, options);
    DomText.Texts.push(newText);
    return newText;
  }

  public update() {
    const translated = TextHelper.translate(this.key, this.options?.i18n);
    this.textContent = format(translated || "", {
      format: this.options?.format,
    });
  }

  public change(
    key: string,
    options?: {
      i18n?: TOptions;
      format?: TConfig["format"];
    }
  ) {
    this.key = key;
    this.options = {
      ...this.options,
      ...options,
    };
    this.update();
  }

  public get content() {
    return this.textContent || "";
  }

  public static updateAll() {
    DomText.Texts.forEach((t) => {
      t.update();
    });
  }

  public destroy() {
    this.remove();
    TextHelper.offLanguageChange(this.update.bind(this));
    DomText.Texts = DomText.Texts.filter((t) => t !== this);
  }
}
