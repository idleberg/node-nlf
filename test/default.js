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
  const expected = JSON.parse(arabicJSON);
  const actual = NLF.parse(arabicFile);

  t.deepEqual(actual, expected);
});

test('English: Convert', t => {
  const expected = JSON.parse(englishJSON);
  const actual = NLF.parse(englishFile);

   t.deepEqual(actual, expected);
});

test('Farsi: Convert', t => {
  const expected = JSON.parse(farsiJSON);
  const actual = NLF.parse(farsiFile);

   t.deepEqual(actual, expected);
});

test('Greek: Convert', t => {
  const expected = JSON.parse(greekJSON);
  const actual = NLF.parse(greekFile);

   t.deepEqual(actual, expected);
});

test('Japanese: Convert', t => {
  const expected = JSON.parse(japaneseJSON);
  const actual = NLF.parse(japaneseFile);

   t.deepEqual(actual, expected);
});

test('Russian: Convert', t => {
  const expected = JSON.parse(russianJSON);
  const actual = NLF.parse(russianFile);

   t.deepEqual(actual, expected);
});

test('Thai: Convert', t => {
  const expected = JSON.parse(thaiJSON);
  const actual = NLF.parse(thaiFile);

   t.deepEqual(actual, expected);
});
