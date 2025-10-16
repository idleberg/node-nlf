import { platform } from 'node:os';

const isWindows = platform() === 'win32';

/**
 * Extracts the NLF version number from a header string.
 * Defaults to version 6 if no version number is found.
 *
 * @param input - The header string to parse
 * @returns The version number as a string (e.g., '2' or '6')
 */
export function getVersion(input: string): string {
	const groups = input.match(/(?<version>\d+)$/)?.groups;

	return groups?.version?.length ? groups?.version : '6';
}

/**
 * Converts a version string to a valid NLFStrings mapping key.
 *
 * @param version - The version number as a string
 * @returns The version key for accessing NLFStrings mapping
 */
export function getVersionKey(version: string): 'v2' | 'v6' {
	return `v${version}` as 'v2' | 'v6';
}

/**
 * Validates that input is not empty or whitespace-only.
 *
 * @param input - The input to validate
 * @throws {Error} If input is empty or whitespace-only
 */
export function validateInput(input: string | NLF.NsisLanguageObject): void {
	if (!input) {
		throw new Error('input is required and cannot be empty');
	}

	if (typeof input === 'string' && input.trim().length === 0) {
		throw new Error('input cannot be an empty string');
	}
}

/**
 * Converts a value to a string or returns '-' for null/undefined values.
 * This is used for NLF format where '-' represents default/empty values.
 *
 * @param value - The value to convert
 * @returns The stringified value or '-' for null/undefined
 */
export function valueOrDash(value: string | number | null | undefined): string {
	return value ? String(value) : '-';
}

/**
 * Determines the appropriate line-break character(s) based on options or platform.
 *
 * @param options - Stringifier options that may specify EOL preference
 * @returns The end-of-line character sequence
 */
export function getEOL(options: NLF.StringifierOptions): NLF.EndOfLine {
	if (options?.eol === 'crlf') {
		return '\r\n';
	}

	if (options?.eol === 'lf') {
		return '\n';
	}

	return isWindows ? '\r\n' : '\n';
}
