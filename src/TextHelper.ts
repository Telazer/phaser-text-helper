import i18next, { TOptions } from "i18next";
import { DomText } from "./domText";
import { PhaserText } from "./phaserText";

export class TextHelper {
  static DomText = DomText;
  static PhaserText = PhaserText;

  static currentLanguage: string;
  static onInitLanguageChangeHandler?: (language: string) => void;
  static onLanguageChangeHandlers?: ((language: string) => void)[] = [];

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
  static get locales() {
    return Object.keys(i18next.services.resourceStore.data);
  }

  // Get Current Language
  static get language() {
    return this.currentLanguage;
  }
}
