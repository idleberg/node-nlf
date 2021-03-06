import JSON5 from 'json5';
import NLFStrings from './mapping';

/**
 * Get version from input string
 * @param input
 */
function getVersion(input: string): string {
  const groups = input.match(/(?<version>\d+)$/)?.groups;

  return groups?.version?.length
  ? groups?.version
  : '6';
}

/**
 * Parses an NSIS language file string
 * @param input - NLF string
 * @returns - NLF object
 */
function parse(input: string, options: ParserOptions = {}): unknown | string {
  const output: NSISLanguageObject = {
    header: '',
    id: 0,
    font: {
      name: null,
      size: null
    },
    code_page: null,
    rtl: false,
    strings: {},
  };

  // remove all comments
  input = input.trim().replace(/^#.*(\r?\n|$)/mg, '');

  // split into lines
  const lines: Array<string> = input.split(/\r?\n/);

  // get NLF version
  const version = getVersion(lines[0]);

  lines.map((line, index) => {
    let key = NLFStrings[`v${version}`][index];

    if (typeof key !== 'undefined' && key.startsWith('^')) {
      // Language String
      key = key.replace('^', '');
      output.strings[key] = lines[index];
    } else {
      // Meta Data
      switch (key) {
        case 'id':
        case 'code_page':
          output[key] = (lines[index] === '-')
            ? null
            : parseInt(lines[index]);

          break;
        case 'font':
        case 'fontname':
          output.font.name = (lines[index] === '-')
            ? null
            : lines[index];

          break;
        case 'fontsize':
          output.font.size = (lines[index] === '-')
            ? null
            : parseInt(lines[index]);

          break;
        case 'rtl':
          output[key] = (lines[index].toUpperCase() === 'RTL')
            ? true
            : false;

          break;
        default:
          if (typeof key !== 'undefined') {
            output[key] = lines[index];
          }
          break;
      }
    }
  });

  if (options.stringify === true) {
    const indentation: number = (options.minify === true)
      ? 0
      : 2;

    return JSON.stringify(output, null, indentation);
  }

  return output;
}

/**
 * Stringifies an NSIS language file object
 * @param input - NLF object
 * @returns - NLF string
 */
function stringify(input: string | NSISLanguageObject): string {
  const output: string[] = [];

  const inputObj: NSISLanguageObject = typeof input === 'string'
    ? JSON5.parse(input)
    : input;

  // get NLF version
  const version = getVersion(inputObj.header);

  output.push('# Header, don\'t edit', inputObj.header);
  output.push('# Language ID', String(inputObj.id));

  if (typeof inputObj.font !== 'undefined' && NLFStrings[`v${version}`].includes('fontname')) {
    output.push(`# Font and size - dash (-) means default`);
    if (inputObj.font.name) {
      output.push(`${inputObj.font.name}`);
    } else {
      output.push('-');
    }

    if (inputObj.font.size) {
      output.push(`${inputObj.font.size}`);
    } else {
      output.push('-');
    }
  }

  if (NLFStrings[`v${version}`].includes('code_page')) {
    output.push(`# Codepage - dash (-) means ASCII code page`);

    if (inputObj.code_page) {
      output.push(`${inputObj.code_page}`);
    } else {
      output.push('-');
    }
  }

  if (NLFStrings[`v${version}`].includes('rtl')) {
    output.push(`# RTL - anything else than RTL means LTR`);

    if (inputObj.rtl) {
      output.push('RTL');
    } else {
      output.push('-');
    }
  }

  for (const key in inputObj.strings) {
    if (NLFStrings[`v${version}`].includes(`^${key}`)) {
      output.push(`# ^${key}`, inputObj.strings[key]);
    }
  }

  return output.join('\n');
}

export { parse, stringify };
