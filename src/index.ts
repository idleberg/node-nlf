import JSON5 from 'json5';
import NLFStrings from './mapping.ts';
import type { NsisLanguageObject, StringifierOptions } from './types.js';
import { getEOL, getVersion, getVersionKey, validateInput, valueOrDash } from './utils.ts';

/**
 * Parses an NSIS language file (NLF) string into a structured object.
 *
 * Supports both NLF v2 (NSIS 2.0 beta 3 and earlier) and v6 (NSIS 2.0 beta 4+).
 * Comments (lines starting with #) are automatically stripped during parsing.
 *
 * @param input - The NLF file content as a string
 * @returns Parsed language object, or JSON string if stringify option is true
 * @throws {Error} If input is empty, invalid, or uses an unsupported NLF version
 *
 * @example
 * ```ts
 * const nlfContent = '# NLF v6\n1033\n...';
 * const parsed = parse(nlfContent);
 * console.log(parsed.id); // 1033
 * ```
 */
export function parse(input: string): NsisLanguageObject | string {
	validateInput(input);

	const output: NsisLanguageObject = {
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

	if (lines.length === 0) {
		throw new Error('Input contains no valid lines');
	}

	// get NLF version
	const firstLine = lines[0];
	if (!firstLine) {
		throw new Error('First line is missing or empty');
	}

	const version = getVersion(firstLine);
	const versionKey = getVersionKey(version);
	const mapping = NLFStrings[versionKey];

	if (!mapping) {
		throw new Error(`Unsupported NLF version: ${version}`);
	}

	for (const [index, line] of lines.entries()) {
		let key = mapping[index];

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

	return output;
}

/**
 * Converts a language object or JSON string into an NSIS language file (NLF) format.
 *
 * Supports both NLF v2 and v6 formats based on the header version.
 * String ordering is maintained according to the NLF specification for the detected version.
 *
 * @param input - Language object or JSON5 string to convert
 * @param options - Stringifier options
 * @param options.eol - Line ending style ('crlf' for Windows, 'lf' for Unix, defaults to platform)
 * @returns NLF formatted string
 * @throws {Error} If input is empty, invalid, cannot be parsed, or uses an unsupported NLF version
 *
 * @example
 * ```ts
 * const langObj = {
 *   header: 'NLF v6',
 *   id: 1033,
 *   font: { name: 'Arial', size: 8 },
 *   code_page: 1252,
 *   rtl: false,
 *   strings: { Branding: 'MyApp Installer' }
 * };
 * const nlf = stringify(langObj, { eol: 'lf' });
 * ```
 */
export function stringify(input: string | NsisLanguageObject, options: StringifierOptions = {}): string {
	validateInput(input);

	let inputObj: NsisLanguageObject;

	if (typeof input === 'string') {
		try {
			inputObj = JSON5.parse(input);
		} catch (error) {
			throw new Error(`Failed to parse input JSON: ${error instanceof Error ? error.message : String(error)}`);
		}
	} else {
		inputObj = input;
	}

	if (!inputObj.header) {
		throw new Error('Input object must have a header property');
	}

	const output: string[] = [];

	// get NLF version
	const version = getVersion(inputObj.header);
	const versionKey = getVersionKey(version);
	const mapping = NLFStrings[versionKey];

	if (!mapping) {
		throw new Error(`Unsupported NLF version: ${version}`);
	}

	output.push("# Header, don't edit", inputObj.header);
	output.push('# Language ID', valueOrDash(inputObj.id));

	if (typeof inputObj.font !== 'undefined' && mapping.includes('fontname')) {
		output.push('# Font and size - dash (-) means default');
		output.push(valueOrDash(inputObj.font.name));
		output.push(valueOrDash(inputObj.font.size));
	}

	if (mapping.includes('code_page')) {
		output.push('# Codepage - dash (-) means ASCII code page');
		output.push(valueOrDash(inputObj.code_page));
	}

	if (mapping.includes('rtl')) {
		output.push('# RTL - anything else than RTL means LTR');
		output.push(inputObj.rtl ? 'RTL' : '-');
	}

	// Maintain proper ordering by iterating through mapping instead of object keys
	for (const mappingKey of mapping) {
		if (mappingKey.startsWith('^')) {
			const key = mappingKey.substring(1);
			const value = inputObj.strings[key];
			if (value !== undefined) {
				output.push(`# ${mappingKey}`, value);
			}
		}
	}

	const endOfLine = getEOL(options);

	return output.join(endOfLine);
}
