// Dependencies
import * as NLF from '../dist';
import { join } from 'path';
import { readFileSync } from 'fs';
import { test } from 'ava';

const languageFile = readFileSync(join(__dirname, '/fixtures/English.nlf'), 'utf8');
const languageJSON = readFileSync(join(__dirname, '/fixtures/English.json'), 'utf8');

// Let's run the tests
test('Convert English.nlf', t => {
  const expected = languageFile;
  const actual = NLF.stringify(NLF.parse(expected));

  t.is(actual.trim(), expected.trim());
});

test('Parse English.nlf', t => {
  const actual = NLF.parse(languageFile);
  const expected = JSON.parse(languageJSON);

  t.deepEqual(actual, expected);
});

test('Stringify English.json', t => {
  const actual = NLF.stringify(JSON.parse(languageJSON));
  const expected = languageFile;

  t.is(actual.trim(), expected.trim());
});
