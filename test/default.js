// Dependencies
import * as NLF from '../dist';
import { join } from 'path';
import { readFileSync } from 'fs';
import test from 'ava';

const arabicFile = readFileSync(join(__dirname, '/fixtures/Arabic.nlf'), 'utf8');
const arabicJSON = readFileSync(join(__dirname, '/fixtures/Arabic.json'), 'utf8');
const englishFile = readFileSync(join(__dirname, '/fixtures/English.nlf'), 'utf8');
const englishJSON = readFileSync(join(__dirname, '/fixtures/English.json'), 'utf8');
const japaneseFile = readFileSync(join(__dirname, '/fixtures/Japanese.nlf'), 'utf8');
const japaneseJSON = readFileSync(join(__dirname, '/fixtures/Japanese.json'), 'utf8');

// Let's run the tests
test('Convert Arabic.nlf', t => {
  const expected = arabicFile;
  const actual = NLF.stringify(NLF.parse(expected), false);

  t.is(actual.trim(), expected.trim());
});

test('Parse Arabic.nlf', t => {
  const actual = NLF.parse(arabicFile);
  const expected = JSON.parse(arabicJSON);

  t.deepEqual(actual, expected);
});

test('Stringify Arabic.json', t => {
  const actual = NLF.stringify(JSON.parse(arabicJSON), false);
  const expected = arabicFile;

  t.is(actual.trim(), expected.trim());
});

test('Convert Japanese.nlf', t => {
  const expected = japaneseFile;
  const actual = NLF.stringify(NLF.parse(expected), false);

  t.is(actual.trim(), expected.trim());
});

test('Parse Japanese.nlf', t => {
  const actual = NLF.parse(japaneseFile);
  const expected = JSON.parse(japaneseJSON);

  t.deepEqual(actual, expected);
});

test('Stringify Japanese.json', t => {
  const actual = NLF.stringify(JSON.parse(japaneseJSON), false);
  const expected = japaneseFile;

  t.is(actual.trim(), expected.trim());
});
test('Convert English.nlf', t => {
  const expected = englishFile;
  const actual = NLF.stringify(NLF.parse(expected));

  t.is(actual.trim(), expected.trim());
});

test('Parse English.nlf', t => {
  const actual = NLF.parse(englishFile);
  const expected = JSON.parse(englishJSON);

  t.deepEqual(actual, expected);
});

test('Stringify English.json', t => {
  const actual = NLF.stringify(JSON.parse(englishJSON));
  const expected = englishFile;

  t.is(actual.trim(), expected.trim());
});
