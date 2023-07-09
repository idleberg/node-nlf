import { basename, dirname, resolve } from 'node:path';
import { glob } from 'glob';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import * as NLF from '../dist/index.mjs';
import fs from 'node:fs';
import JSON5 from 'json5';

const files = await glob(resolve(process.cwd(), 'tests/fixtures/*.nlf'));

files.map(file => {
  const fileDir = dirname(file);
  const fileBase = basename(file, '.nlf');

  test(`Object: ${fileBase}`, async () => {
    const nlfFile = await fs.promises.readFile(file, 'utf8');
    const jsonPath = resolve(fileDir, fileBase + '.json');
    const jsonFile = await fs.promises.readFile(jsonPath, 'utf8');

    const nlfString = NLF.stringify(JSON5.parse(jsonFile));

    // Remove comments and normalize line endings
    const actual = nlfString.replace(/^#.*(\r?\n|$)/mg, '').replace(/\r\n/g, '\n');
    const expected = nlfFile.trim().replace(/^#.*(\r?\n|$)/mg, '').replace(/\r\n/g, '\n');

    assert.is(actual, expected);
  });

  test(`JSON: ${fileBase}`, async () => {
    const nlfFile = await fs.promises.readFile(file, 'utf8');
    const jsonPath = resolve(fileDir, fileBase + '.json');
    const jsonFile = await fs.promises.readFile(jsonPath, 'utf8');

    const nlfString = NLF.stringify(jsonFile);

    // Remove comments and normalize line endings
    const actual = nlfString.replace(/^#.*(\r?\n|$)/mg, '').replace(/\r\n/g, '\n');
    const expected = nlfFile.trim().replace(/^#.*(\r?\n|$)/mg, '').replace(/\r\n/g, '\n');

    assert.is(actual, expected);
  });

});

test.run();