import NLFStrings from './enum.js';

/**
 * Parses an NSIS language file string
 * @param input - NLF string
 * @returns - NLF object
 */
const parse = (input: string, stringify: boolean = false, minify: boolean = false): Object|string => {
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
      if (typeof key !== 'undefined' && key.startsWith('^')) {
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

  if (stringify === true) {
    const indentation: number = (minify === true) ? 0 : 2;
    return JSON.stringify(output, null, indentation);
  }

  return output;
};

/**
 * Stringifies an NSIS language file object
 * @param input - NLF object
 * @returns - NLF string
 */
const stringify = (input: any): string => {
  let output: string = '';
  let inputObj: NSISLanguageObject;

  // Convert JSON string to object, if necessary
  if (isObject(input) === false) {
    inputObj = JSON.parse(input);
  } else {
    inputObj = input;
  }

  try {
    output += `# Header, don't edit\n${inputObj.header}`;
    output += `\n# Language ID\n${inputObj.id}`;
    output += `\n# Font and size - dash (-) means default`;
    if (typeof inputObj.font !== 'undefined') {
      output += (inputObj.font.name === null) ? '\n-' : `\n${inputObj.font.name}`;
      output += (inputObj.font.size === null) ? '\n-' : `\n${inputObj.font.size}`;
    }
    output += `\n# Codepage - dash (-) means ASCII code page`;
    output += (inputObj.codepage === null) ? '\n-' : `\n${inputObj.codepage}`;
    output += `\n# RTL - anything else than RTL means LTR`;
    output += (inputObj.rtl === true) ? '\nRTL' : '\n-';
    for (let key in inputObj.strings) {
      if (inputObj.strings.hasOwnProperty(key)) {
        output += `\n# ^${key}\n${inputObj.strings[key]}`;
      }
    }
  } catch (e) {
    throw e;
  }

  return output;
};

export { parse, stringify };

// Helpers
function isObject (obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
