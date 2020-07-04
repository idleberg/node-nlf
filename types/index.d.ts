interface NSISLanguageObject {
  code_page: null | number;
  font: FontSettings;
  header: string;
  id: number;
  rtl: boolean;
  strings: object;
}

interface FontSettings {
  name: null | string;
  size: null | number;
}

interface ParserOptions {
  minify?: boolean;
  stringify?: boolean;
}
