# nlf

[![License](https://img.shields.io/github/license/idleberg/node-nlf?color=blue&style=for-the-badge)](https://github.com/idleberg/node-nlf/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@nsis/nlf?style=for-the-badge)](https://www.npmjs.org/package/@nsis/nlf)
[![Build](https://img.shields.io/github/actions/workflow/status/idleberg/node-nlf/default.yml?style=for-the-badge)](https://github.com/idleberg/node-nlf/actions)

Parser and stringifier for NSIS Language Files (.nlf)

## Installation

` npm install @nsis/nlf`

## Usage

```js
import * as NLF from "@nsis/nlf";
```

Example usage in script:

```js
// Read an NSIS Language File
const languageFile = fs.readFileSync(
	"Contrib/Language files/English.nlf",
	"utf8",
);

const languageObj = NLF.parse(languageFile);
const languageNew = NLF.stringify(languageObj);
```

### Methods

#### parse

Usage: `parse(string, options)`

Parses an NSIS Language File, constructing an object or JSON string that's easy to query

##### options.stringify

Type: `boolean`

Return a stringified object

##### options.minify

Type: `boolean`

Minifies a stringified object, requires `options.stringify` to be `true`

#### stringify

Usage: `stringify(Object|string)`

Converts an NSIS Language File object or JSON string to an `.nlf` string

##### options.eol

Type: `"crlf" | "lf"`

Selects the default end of line sequence. When not specified, it defaults to `"crlf"` on Windows and `"lf"` elsewhere.

## Related

- [nlf-cli](https://www.npmjs.org/package/@nsis/nlf-cli) - command-line tool to convert NLF files
- [vite-plugin-nlf](https://www.npmjs.org/package/@nsis/vite-plugin-nlf) - Vite plugin to load NSIS language files

## License

This work is licensed under [The MIT License](LICENSE)
