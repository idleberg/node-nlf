import { platform } from 'node:os';
import JSON5 from 'json5';
import NLFStrings from './mapping.ts';

/**
 * Get version from input string
 * @param {string} input
 * @returns {string}
 */
function getVersion(input: string): string {
	const groups = input.match(/(?<version>\d+)$/)?.groups;

	return groups?.version?.length ? groups?.version : '6';
}

/**
 * Determines default line-breaks depending on operating system
 * @returns {NLF.EndOfLine}
 */
function getEOL(options: NLF.StringifierOptions): NLF.EndOfLine {
	switch (true) {
		case options?.eol === 'crlf':
			return '\r\n';

		case options?.eol === 'lf':
			return '\n';

		default:
			break;
	}
	return platform() === 'win32' ? '\r\n' : '\n';
}

/**
 * Parses an NSIS language file string
 * @param {string} input
 * @param {NLF.ParserOptions} options
 * @returns {NLF.NsisLanguageObject | string}
 */
export function parse(input: string, options: NLF.ParserOptions = {}): NLF.NsisLanguageObject | string {
	const output: NLF.NsisLanguageObject = {
		header: '',
		id: 0,
		font: {
			name: null,
			size: null,
		},
		code_page: null,
		rtl: false,
		strings: {},
	};

	// remove all comments
	const trimmedInput = input.trim().replace(/^#.*(\r?\n|$)/gm, '');

	// split into lines
	const lines: Array<string> = trimmedInput.split(/\r?\n/);

	// get NLF version
	const version = getVersion(lines[0]);

	for (const [index, line] of lines.entries()) {
		let key = NLFStrings[`v${version}`][index];

		if (key?.startsWith('^')) {
			// Language String
			key = key.replace('^', '');
			output.strings[key] = line;
		} else {
			// Meta Data
			switch (key) {
				case 'id':
				case 'code_page':
					output[key] = line === '-' ? null : Number.parseInt(line, 10);
					break;
				case 'font':
				case 'fontname':
					output.font.name = line === '-' ? null : line;
					break;
				case 'fontsize':
					output.font.size = line === '-' ? null : Number.parseInt(line, 10);
					break;
				case 'rtl':
					output[key] = line.toUpperCase() === 'RTL';
					break;
				default:
					if (typeof key !== 'undefined') {
						output[key] = line;
					}
					break;
			}
		}
	}

	if (options?.stringify) {
		const indentation: number = options.minify === true ? 0 : 2;

		return JSON.stringify(output, null, indentation);
	}

	return output;
}

/**
 * Stringifies an NSIS language file object
 * @param {string | NLF.NsisLanguageObject} input
 * @param {NLF.StringifierOptions} options
 * @returns {string}
 */
export function stringify(input: string | NLF.NsisLanguageObject, options: NLF.StringifierOptions = {}): string {
	const output: string[] = [];

	const inputObj: NLF.NsisLanguageObject = typeof input === 'string' ? JSON5.parse(input) : input;

	// get NLF version
	const version = getVersion(inputObj.header);

	output.push("# Header, don't edit", inputObj.header);
	output.push('# Language ID', String(inputObj.id));

	if (typeof inputObj.font !== 'undefined' && NLFStrings[`v${version}`].includes('fontname')) {
		output.push('# Font and size - dash (-) means default');

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
		output.push('# Codepage - dash (-) means ASCII code page');

		if (inputObj.code_page) {
			output.push(`${inputObj.code_page}`);
		} else {
			output.push('-');
		}
	}

	if (NLFStrings[`v${version}`].includes('rtl')) {
		output.push('# RTL - anything else than RTL means LTR');

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

	const endOfLine = getEOL(options);

	return output.join(endOfLine);
}
