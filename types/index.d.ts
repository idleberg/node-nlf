interface NSISLanguageObject {
  codepage: null|number;
  credits?: Array<string>;
  font: FontSettings;
  header: string;
  id: number;
  rtl: boolean;
  strings: Object;
}

interface FontSettings {
  name: null|string;
  size: null|number;
}
