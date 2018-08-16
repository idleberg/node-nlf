import NLFStrings from './enum.js';

/**
 * Parses an NSIS language file string
 * @param {string} input - NLF string
 * @returns {string} - NLF object
 */
const parse = (input: string): Object => {
  const output: NSISLanguageObject = {
    header: '',
    id: 0,
    font: {
      name: null,
      size: null
    },
    codepage: null,
    rtl: false,
    strings: {},
  };
  let strings: any = {};

  try {
    // remove all comments
    input = input.trim().replace(/^#.*(\r?\n|$)/mg, '');

    // split into lines
    const lines: Array<string> = input.split(/\r?\n/);

    lines.forEach((line, index) => {
      let key = NLFStrings[index];
      if (key.startsWith('^')) {
        // Language String
        key = key.replace('^', '');
        output.strings[key] = lines[index];
      } else {
        // Meta Data
        switch (key) {
          case 'id':
          case 'codepage':
            output[key] = (lines[index] === '-') ? null : parseInt(lines[index]);
            break;
          case 'font':
            output.font.name = (lines[index] === '-') ? null : lines[index];
            break;
          case 'fontsize':
            output.font.size = (lines[index] === '-') ? null : parseInt(lines[index]);
            break;
          case 'rtl':
            output[key] = (lines[index].toUpperCase() === 'RTL') ? true : false;
            break;
          default:
            output[key] = lines[index];
            break;
        }
      }
    });
  } catch (e) {
    throw e;
  }

  return output;
};

/**
 * Stringifies an NSIS language file object
 * @param {Object} input - NLF object
 * @returns {string} - NLF string
 */
const stringify = (input: NSISLanguageObject): string => {
  let output: string = '';

  try {
    output += `# Header, don't edit\n${input.header}`;
    output += `\n# Language ID\n${input.id}`;
    output += `\n# Font and size - dash (-) means default`;
    if (typeof input.font !== 'undefined') {
      output += (input.font.name === null) ? '\n-' : `\n${input.font.name}`;
      output += (input.font.size === null) ? '\n-' : `\n${input.font.size}`;
    }
    output += `\n# Codepage - dash (-) means ASCII code page`;
    output += (input.codepage === null) ? '\n-' : `\n${input.codepage}`;
    output += `\n# RTL - anything else than RTL means LTR`;
    output += (input.rtl === true) ? '\nRTL' : '\n-';
    for (let key in input.strings) {
      if (input.strings.hasOwnProperty(key)) {
        output += `\n# ^${key}\n${input.strings[key]}`;
      }
    }
  } catch (e) {
    throw e;
  }

  return output;
};

export { parse, stringify };
