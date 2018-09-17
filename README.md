# nlf

[![npm](https://flat.badgen.net/npm/license/@nsis/nlf)](https://www.npmjs.org/package/@nsis/nlf)
[![npm](https://flat.badgen.net/npm/v/@nsis/nlf)](https://www.npmjs.org/package/@nsis/nlf)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/node-nlf)](https://circleci.com/gh/idleberg/node-nlf)
[![David](https://flat.badgen.net/david/dev/idleberg/node-nlf)](https://david-dm.org/idleberg/node-nlf?type=dev)

Parser and stringifier for NSIS Language Files (.nlf)

## Installation

`yarn add @nsis/nlf || npm install @nsis/nlf`

## Usage

Use ES6 imports or `require()` to include the module:

```js
// ECMAScript Import
import * as NLF from 'nlf';

// CommonJS Require
const NLF = require('nlf');
```

Example usage in script:

```js
// Read an NSIS Language File
const languageFile = fs.readFileSync('Contrib/Languages/English.nlf', 'utf8');

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

## Related

- [nlf-cli](https://www.npmjs.org/package/@nsis/nlf-cli) - command-line tool to convert NLF files

## License

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)

## Donate

You are welcome to support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/node-nlf) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
