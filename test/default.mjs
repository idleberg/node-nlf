// Dependencies
import { basename, dirname, resolve } from 'node:path';
import * as NLF from '../dist/index.mjs';
import fs from 'node:fs';
import glob from 'glob';
import JSON from 'json5';
import test from 'ava';

const __dirname = resolve(dirname(''));

glob(resolve(__dirname, 'test/fixtures/*.nlf'), (err, files) => {
  files.map(file => {
    const fileDir = dirname(file);
    const fileBase = basename(file, '.nlf');

    test(`Object: ${basename(file)}`, async t => {
      const nlfFile = await fs.promises.readFile(file, 'utf8');
      const jsonPath = resolve(fileDir, fileBase + '.json');
      const jsonFile = await fs.promises.readFile(jsonPath, 'utf8');

      const nlfString = NLF.stringify(JSON.parse(jsonFile));

      // Remove comments and normalize line endings
      const actual = nlfString.replace(/^#.*(\r?\n|$)/mg, '').replace(/\r\n/g, '\n');
      const expected = nlfFile.trim().replace(/^#.*(\r?\n|$)/mg, '').replace(/\r\n/g, '\n');

      t.is(actual, expected);
    });

    test(`JSON: ${basename(file)}`, async t => {
      const nlfFile = await fs.promises.readFile(file, 'utf8');
      const jsonPath = resolve(fileDir, fileBase + '.json');
      const jsonFile = await fs.promises.readFile(jsonPath, 'utf8');

      const nlfString = NLF.stringify(jsonFile);

      // Remove comments and normalize line endings
      const actual = nlfString.replace(/^#.*(\r?\n|$)/mg, '').replace(/\r\n/g, '\n');
      const expected = nlfFile.trim().replace(/^#.*(\r?\n|$)/mg, '').replace(/\r\n/g, '\n');

      t.is(actual, expected);
    });
  });
});
