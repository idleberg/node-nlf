import fs from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { globSync } from 'glob';
import JSON5 from 'json5';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import * as NLF from '../src/index.ts';

const files = globSync(resolve(process.cwd(), 'tests/fixtures/*.nlf'));

for (const file of files) {
	const fileDir = dirname(file);
	const fileBase = basename(file, '.nlf');

	test(`Object: ${fileBase}`, async () => {
		const nlfFile = await fs.promises.readFile(file, 'utf8');
		const jsonPath = resolve(fileDir, `${fileBase}.json`);
		const jsonFile = await fs.promises.readFile(jsonPath, 'utf8');

		const nlfString = NLF.stringify(JSON5.parse(jsonFile));

		// Remove comments and normalize line endings
		const actual = nlfString.replace(/^#.*(\r?\n|$)/gm, '').replace(/\r\n/g, '\n');
		const expected = nlfFile
			.trim()
			.replace(/^#.*(\r?\n|$)/gm, '')
			.replace(/\r\n/g, '\n');

		assert.is(actual, expected);
	});

	test(`JSON: ${fileBase}`, async () => {
		const nlfFile = await fs.promises.readFile(file, 'utf8');
		const jsonPath = resolve(fileDir, `${fileBase}.json`);
		const jsonFile = await fs.promises.readFile(jsonPath, 'utf8');

		const nlfString = NLF.stringify(jsonFile);

		// Remove comments and normalize line endings
		const actual = nlfString.replace(/^#.*(\r?\n|$)/gm, '').replace(/\r\n/g, '\n');
		const expected = nlfFile
			.trim()
			.replace(/^#.*(\r?\n|$)/gm, '')
			.replace(/\r\n/g, '\n');

		assert.is(actual, expected);
	});
}

test.run();
