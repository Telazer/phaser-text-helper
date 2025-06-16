import i18next, { ResourceKey, TOptions } from "i18next";
import { DomText } from "./domText";
import { PhaserText } from "./phaserText";
import { ILocaleData } from "./types";

export class TextHelper {
  static DomText = DomText;
  static PhaserText = PhaserText;

  private static currentLanguage: string;
  private static onInitLanguageChangeHandler?: (language: string) => void;
  private static onLanguageChangeHandlers?: ((language: string) => void)[] = [];

  // Initialize Helper for Translation Support
  static async init({
    locales,
    defaultLocale,
    onLanguageChange,
  }: {
    locales?: { key: string; value: object }[];
    defaultLocale?: string;
    onLanguageChange?: (language: string) => void;
  }) {
    this.onInitLanguageChangeHandler = onLanguageChange;

    this.currentLanguage = defaultLocale || "en";

    await i18next.init({
      lng: this.currentLanguage,
    });

    locales?.forEach((locale) => {
      i18next.addResourceBundle(locale.key, "translation", locale.value);
    });

    return this;
  }

  // Change Language
  static changeLanguage(language: string) {
    this.currentLanguage = language;
    i18next.changeLanguage(language);

    this.onInitLanguageChangeHandler?.(language);
    this.onLanguageChangeHandlers?.forEach((handler) => handler(language));
  }

  // Translate Text
  static translate(key: string, options?: TOptions) {
    return i18next.t(key, options);
  }

  // On Language Change
  static onLanguageChange(handler: (language: string) => void) {
    this.onLanguageChangeHandlers?.push(handler);
  }

  // Off Language Change
  static offLanguageChange(handler: (language: string) => void) {
    this.onLanguageChangeHandlers = this.onLanguageChangeHandlers?.filter(
      (h) => h !== handler
    );
  }

  // Get Locales
  static get locales(): ILocaleData[] {
    return Object.entries(i18next.services.resourceStore.data).map(
      ([key, value]) => {
        return {
          key,
          name: (value.translation as Record<string, string>).localeName || key,
          value: i18next.services.resourceStore.data[key].translation as Record<
            string,
            string
          >,
        };
      }
    );
  }

  // Get Current Language
  static get locale() {
    return this.currentLanguage;
  }
}
