import { TOptions } from "i18next";
import { TextHelper } from "../TextHelper";
import { format } from "../utils";
import { IPhaserText, IPhaserTextOptions, TConfig } from "../types";
import Phaser from "phaser";

export class PhaserText extends Phaser.GameObjects.Text {
  static texts: IPhaserText[] = [];

  private translationKey: string;
  private options: IPhaserTextOptions;

  private constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    styles?: Phaser.Types.GameObjects.Text.TextStyle | null,
    options?: IPhaserTextOptions
  ) {
    super(scene, x, y, key, styles || {});

    // if (!styles?.fontFamily) {
    //   this.setFontFamily(FONT_FAMILY.PRIMARY);
    // }

    this.translationKey = key;
    this.options = options || {};

    this.update();

    TextHelper.onLanguageChange(this.update.bind(this));

    scene.add.existing(this);

    PhaserText.texts.push({
      object: this,
      key: this.translationKey,
      options: options || {},
    });
  }

  static create(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    options?: {
      i18n?: TOptions;
      config?: TConfig;
      styles?: Phaser.Types.GameObjects.Text.TextStyle;
    }
  ) {
    return new PhaserText(scene, x, y, key, options?.styles, options);
  }

  setText(text: string, options?: IPhaserTextOptions) {
    this.translationKey = text;
    this.options = options || {};
    this.update();
    return this;
  }

  update() {
    super.update();
    const translation = TextHelper.translate(this.translationKey, {
      i18n: this.options.i18n,
      format: this.options.config?.format,
    });
    const formatted = format(translation || "", {
      format: this.options.config?.format,
    });
    super.setText(formatted);
  }

  destroy() {
    TextHelper.offLanguageChange(this.update.bind(this));
    PhaserText.texts = PhaserText.texts.filter((t) => t.object !== this);
    super.destroy();
  }

  static updateAll() {
    PhaserText.texts.forEach((t) => {
      (t.object as PhaserText).update();
    });
  }
}
