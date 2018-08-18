interface NSISLanguageObject {
  codepage: null | number;
  font: FontSettings;
  header: string;
  id: number;
  rtl: boolean;
  strings: Object;
}

interface FontSettings {
  name: null | string;
  size: null | number;
}
