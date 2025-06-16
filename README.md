# Telazer - Phaser Text Helper

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/Telazer/phaser-text-helper)

For more helpers and utilities, check out [Telazer NPM Page](https://www.npmjs.com/org/telazer)

A TypeScript utility library for [Phaser 4](https://phaser.io) that simplifies image handling and manipulation. It offers powerful helpers for:

- Seamless DOM text integration and management
- Enhanced Phaser text components with automatic updates
- Comprehensive internationalization (i18n) support
- Advanced text formatting capabilities
- Synchronized text management across all instances with automatic translation updates

---

## Installation

```typescript
npm install @telazer/phaser-text-helper
```

---

## Key Features

TextHelper is implemented as a static class, making it globally accessible throughout your application. This means you can access and manage text-related functionality from any component or scene without needing to create instances. The static structure ensures that:

- All text components share the same translation state
- Language changes are synchronized across the entire application
- Translation resources are managed centrally
- Event handlers for language changes are coordinated globally
- Text formatting and styling remain consistent

---

## Usage

Import `TextHelper` into your Phaser scenes. It's recommended to initialize it in the first scene to use as soon as possible.

### Initialization (Init Scene)

```ts
import TextHelper from "@telazer/phaser-text-helper";

const locales = [
  {
    key: "en_US",
    value: {
      localeName: "English",
      loading: "Loading...",
    },
  },
  {
    key: "tr_TR",
    value: {
      localeName: "Türkçe",
      loading: "Yükleniyor...",
    },
  },
];

export class InitScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.INIT });
  }

  async create() {
    TextHelper.init({
      locales: locales,
      defaultLocale: "en_US",
      onLanguageChange: (language) => {
        // add event listener for language changes
      },
    });
  }
}
```

### Change Language

```ts
import TextHelper from "@telazer/phaser-text-helper";

TextHelper.changeLanguage("en_US");
```

### Locale data

```ts
// Get current locale key
TextHelper.locale;

// Get available locales
TextHelper.locales.forEach((locale) => {
  // locale.key: The locale identifier (e.g. "en_US")
  // locale.name: The display name of the locale (e.g. "English"). Defaults to locale.key if localeName is not defined
  // locale.value: An object containing all translation key-value pairs for this locale
});
```

## Create Text instance

> All keys can be used as hardcoded strings if localization is not required. The given string will be displayed directly if no matching key is found in the translation file or if translations have not been initialized.

### Dom Text

Use as html `Text` element.

```ts
import TextHelper from "@telazer/phaser-text-helper";

// Optional field for more configuration
const domTextOptions = {
	// i18n config field to use for interpolation
	// https://www.i18next.com/translation-function/interpolation
	i18n: {
		count: 1;
	},
	// formatting options
	format: "upperCase" | "lowerCase"
}

// Create new DOM Text
const textNode = TextHelper.DomText.create("key", domTextOptions);

// Add to the UI
document.body.appendChild(textNode);

// Update already created text
textNode.change("key", domTextOptions);

// Get text content
console.log(textNode.content);

// Remove it from the DOM with all of it's listeners.
textNode.destroy();
```

### PhaserText

```ts
import TextHelper from "@telazer/phaser-text-helper";

// Optional field for more configuration
const phaserTextOptions = {
	// i18n config field to use for interpolation
	// https://www.i18next.com/translation-function/interpolation
	i18n: {
		count: 1;
	},
	config: {
		format: "upperCase" | "lowerCase"
	},
	// Phaser.Types.GameObjects.Text.TextStyle
	styles: {
		fontFamily: 'Arial',
		fontSize: '32px',
	}
}

// Add new Phaser Text to the Scene
// This will return a Phaser.GameObjects.Text instance
// All native Phaser text methods like setColor(), setFontSize(), etc. are available
// The text will automatically update when the language changes
const phaserText = TextHelper.PhaserText.create(
	this,
	400,
	250,
	"key",
	phaserTextOptions
);

// setText method is extended to accept options and will update the text with new translation key and options.
phaserText.setText("new_key", phaserTextOptions)

// Destroy
phaserText.destroy()
```

## Development

```bash
# Clone the repo and
git clone https://github.com/Telazer/phaser-text-helper

# Install dependencies
npm install

# Start the watcher for the development
npm run watch

# Build the library
npm run build
```

## License

MIT License

Copyright (c) 2025 Telazer LLC.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rightsto use, copy, modify, merge, publish, distribute, sublicense, and/or sellcopies of the Software, and to permit persons to whom the Software isfurnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in allcopies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS ORIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THEAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHERLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THESOFTWARE.
