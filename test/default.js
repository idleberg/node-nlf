// Dependencies
import * as NLF from '../dist';
import { basename, dirname, join } from 'path';
import { readFileSync } from 'fs';
import glob from 'glob';
import test from 'ava';

glob(join(__dirname, '/fixtures/*.nlf'), (err, files) => {
  files.forEach((file) => {
    let fileDir = dirname(file);
    let fileBase = basename(file, '.nlf');

    test(basename(file), t => {
      let nlfFile = readFileSync(file, 'utf8');
      let jsonPath = join(fileDir, fileBase + '.json');
      let jsonFile = readFileSync(jsonPath, 'utf8');

      const nlfString = NLF.stringify(JSON.parse(jsonFile));
      const expected = nlfString.replace(/^#.*(\r?\n|$)/mg, '').replace(/\r\n/g, '\n');
      const actual = nlfFile.trim().replace(/^#.*(\r?\n|$)/mg, '').replace(/\r\n/g, '\n');

      t.is(expected, actual);
    });
  });
});
