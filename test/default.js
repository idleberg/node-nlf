// Dependencies
import * as NLF from '../dist';
import { basename, dirname, join } from 'path';
import fs from 'fs';
import glob from 'glob';
import test from 'ava';

glob(join(__dirname, '/fixtures/*.nlf'), (err, files) => {
  files.forEach(file => {
    let fileDir = dirname(file);
    let fileBase = basename(file, '.nlf');

    test(`Object: ${basename(file)}`, async t => {
      let nlfFile = await fs.promises.readFile(file, 'utf8');
      let jsonPath = join(fileDir, fileBase + '.json');
      let jsonFile = await fs.promises.readFile(jsonPath, 'utf8');

      const nlfString = NLF.stringify(JSON.parse(jsonFile));

      // Remove comments and normalize line endings
      const actual = nlfString.replace(/^#.*(\r?\n|$)/mg, '').replace(/\r\n/g, '\n');
      const expected = nlfFile.trim().replace(/^#.*(\r?\n|$)/mg, '').replace(/\r\n/g, '\n');

      t.is(actual, expected);
    });

    test(`JSON: ${basename(file)}`, async t => {
      let nlfFile = await fs.promises.readFile(file, 'utf8');
      let jsonPath = join(fileDir, fileBase + '.json');
      let jsonFile = await fs.promises.readFile(jsonPath, 'utf8');

      const nlfString = NLF.stringify(jsonFile);

      // Remove comments and normalize line endings
      const actual = nlfString.replace(/^#.*(\r?\n|$)/mg, '').replace(/\r\n/g, '\n');
      const expected = nlfFile.trim().replace(/^#.*(\r?\n|$)/mg, '').replace(/\r\n/g, '\n');

      t.is(actual, expected);
    });
  });
});
