// Dependencies
import * as NLF from '../dist';
import { join } from 'path';
import { readFileSync } from 'fs';
import test from 'ava';

const arabicFile = readFileSync(join(__dirname, '/fixtures/Arabic.nlf'), 'utf8');
const arabicJSON = readFileSync(join(__dirname, '/fixtures/Arabic.json'), 'utf8');
const englishFile = readFileSync(join(__dirname, '/fixtures/English.nlf'), 'utf8');
const englishJSON = readFileSync(join(__dirname, '/fixtures/English.json'), 'utf8');
const farsiFile = readFileSync(join(__dirname, '/fixtures/Farsi.nlf'), 'utf8');
const farsiJSON = readFileSync(join(__dirname, '/fixtures/Farsi.json'), 'utf8');
const greekFile = readFileSync(join(__dirname, '/fixtures/Greek.nlf'), 'utf8');
const greekJSON = readFileSync(join(__dirname, '/fixtures/Greek.json'), 'utf8');
const koreanFile = readFileSync(join(__dirname, '/fixtures/Korean.nlf'), 'utf8');
const koreanJSON = readFileSync(join(__dirname, '/fixtures/Korean.json'), 'utf8');
const japaneseFile = readFileSync(join(__dirname, '/fixtures/Japanese.nlf'), 'utf8');
const japaneseJSON = readFileSync(join(__dirname, '/fixtures/Japanese.json'), 'utf8');
const russianFile = readFileSync(join(__dirname, '/fixtures/Russian.nlf'), 'utf8');
const russianJSON = readFileSync(join(__dirname, '/fixtures/Russian.json'), 'utf8');
const thaiFile = readFileSync(join(__dirname, '/fixtures/Thai.nlf'), 'utf8');
const thaiJSON = readFileSync(join(__dirname, '/fixtures/Thai.json'), 'utf8');

// Let's run the tests
test('Arabic: Convert', t => {
  const expected = arabicFile;
  const actual = NLF.stringify(NLF.parse(expected), false);

  t.is(actual.trim(), expected.trim());
});

test('Arabic: Parse', t => {
  const actual = NLF.parse(arabicFile);
  const expected = JSON.parse(arabicJSON);

  t.deepEqual(actual, expected);
});

test('Arabic: Stringify', t => {
  const actual = NLF.stringify(JSON.parse(arabicJSON), false);
  const expected = arabicFile;

  t.is(actual.trim(), expected.trim());
});

test('English: Convert', t => {
  const expected = englishFile;
  const actual = NLF.stringify(NLF.parse(expected));

  t.is(actual.trim(), expected.trim());
});

test('English: Parse', t => {
  const actual = NLF.parse(englishFile);
  const expected = JSON.parse(englishJSON);

  t.deepEqual(actual, expected);
});

test('English: Stringify', t => {
  const actual = NLF.stringify(JSON.parse(englishJSON));
  const expected = englishFile;

  t.is(actual.trim(), expected.trim());
});

test('Farsi: Convert', t => {
  const expected = farsiFile;
  const actual = NLF.stringify(NLF.parse(expected));

  t.is(actual.trim(), expected.trim());
});

test('Farsi: Parse', t => {
  const actual = NLF.parse(farsiFile);
  const expected = JSON.parse(farsiJSON);

  t.deepEqual(actual, expected);
});

test('Farsi: Stringify', t => {
  const actual = NLF.stringify(JSON.parse(farsiJSON));
  const expected = farsiFile;

  t.is(actual.trim(), expected.trim());
});

test('Greek: Convert', t => {
  const expected = greekFile;
  const actual = NLF.stringify(NLF.parse(expected), false);

  t.is(actual.trim(), expected.trim());
});

test('Greek: Parse', t => {
  const actual = NLF.parse(greekFile);
  const expected = JSON.parse(greekJSON);

  t.deepEqual(actual, expected);
});

test('Greek: Stringify', t => {
  const actual = NLF.stringify(JSON.parse(greekJSON), false);
  const expected = greekFile;

  t.is(actual.trim(), expected.trim());
});

test('Japanese: Convert', t => {
  const expected = japaneseFile;
  const actual = NLF.stringify(NLF.parse(expected), false);

  t.is(actual.trim(), expected.trim());
});

test('Japanese: Parse', t => {
  const actual = NLF.parse(japaneseFile);
  const expected = JSON.parse(japaneseJSON);

  t.deepEqual(actual, expected);
});

test('Japanese: Stringify', t => {
  const actual = NLF.stringify(JSON.parse(japaneseJSON), false);
  const expected = japaneseFile;

  t.is(actual.trim(), expected.trim());
});

test('Russian: Convert', t => {
  const expected = russianFile;
  const actual = NLF.stringify(NLF.parse(expected), false);

  t.is(actual.trim(), expected.trim());
});

test('Russian: Parse', t => {
  const actual = NLF.parse(russianFile);
  const expected = JSON.parse(russianJSON);

  t.deepEqual(actual, expected);
});

test('Russian: Stringify', t => {
  const actual = NLF.stringify(JSON.parse(russianJSON), false);
  const expected = russianFile;

  t.is(actual.trim(), expected.trim());
});

test('Thai: Convert', t => {
  const expected = thaiFile;
  const actual = NLF.stringify(NLF.parse(expected));

  t.is(actual.trim(), expected.trim());
});

test('Thai: Parse', t => {
  const actual = NLF.parse(thaiFile);
  const expected = JSON.parse(thaiJSON);

  t.deepEqual(actual, expected);
});

test('Thai: Stringify', t => {
  const actual = NLF.stringify(JSON.parse(thaiJSON));
  const expected = thaiFile;

  t.is(actual.trim(), expected.trim());
});
