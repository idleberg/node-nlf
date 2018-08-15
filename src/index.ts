const parse = (input: string): Object => {
  const output: NSISLanguageObject = {
    codepage: null,
    credits: [],
    font: {
      name: null,
      size: null
    },
    header: '',
    id: 0,
    rtl: false,
    strings: {},
  };
  let strings: any = {};
  const lines: Array<string> = input.trim().split(/\r?\n/);
  let credit = [];

  try {
    lines.forEach( (line, index) => {
      if (line === '# Start editing here') {
        return;
      } else if (line.match(/#\s*Header, don\'t edit/)) {
        output.header = lines[index + 1];
      } else if (line.match(/#\s*Language ID/)) {
        output.id = parseInt(lines[index + 1]);
      } else if (line.match(/#\s*Font and size/)) {
        output.font = {
          name: (lines[index + 1] === '-') ? null : lines[index + 1],
          size: (lines[index + 2] === '-') ? null : parseInt(lines[index + 2])
        };
      } else if (line.match(/#\s*Codepage/)) {
        output.codepage = (lines[index + 1] === '-') ? null : parseInt(lines[index + 1]);
      } else if (line.match(/#\s*RTL/)) {
        output.rtl = (lines[index + 1].toUpperCase() === 'RTL') ? true : false;
      } else if (line.match(/^#\s*Translat/)) {
        output.credits.push(line);
      } else if (line.match(/^#\s*\^/)) {
        let langString = line.replace(/^#\s*/, '');
        strings[langString] = lines[index + 1];
      }

      output.strings = strings;
    });
  } catch (e) {
    throw e;
  }

  return output;
};

const stringify = (input: NSISLanguageObject, startEditing: boolean = true): string => {
  let output: string = '';

  try {
    output += `# Header, don't edit\n${input.header}`;
    if (startEditing) output += `\n# Start editing here`;
    output += `\n# Language ID\n${input.id}`;
    output += `\n# Font and size - dash (-) means default`;
    output += (input.font.name === null) ? '\n-' : `\n${input.font.name}`;
    output += (input.font.size === null) ? '\n-' : `\n${input.font.size}`;
    output += `\n# Codepage - dash (-) means ASCII code page`;
    output += (input.codepage === null) ? '\n-' : `\n${input.codepage}`;
    output += `\n# RTL - anything else than RTL means LTR`;
    output += (input.rtl === true) ? '\nRTL' : '\n-';
    input.credits.forEach( credit => {
      output += `\n${credit}`;
    });
    for (let key in input.strings) {
      if (input.strings.hasOwnProperty(key)) {
        output += `\n# ${key}\n${input.strings[key]}`;
      }
    }
    output += '\n';
  } catch (e) {
    throw e;
  }

  return output;
};

export { parse, stringify };
