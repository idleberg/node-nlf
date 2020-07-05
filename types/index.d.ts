interface NSISLanguageObject {
  code_page: null | number;
  font: FontSettings;
  header: string;
  id: number;
  rtl: boolean;
  strings: LanguageStrings;
}

interface LanguageStrings {
  Branding?: string;
  SetupCaption?: string;
  UninstallCaption?: string;
  LicenseSubCaption?: string;
  ComponentsSubCaption?: string;
  DirSubCaption?: string;
  InstallingSubCaption?: string;
  CompletedSubCaption?: string;
  UnComponentsSubCaption?: string;
  UnDirSubCaption?: string;
  ConfirmSubCaption?: string;
  UninstallingSubCaption?: string;
  UnCompletedSubCaption?: string;
  BackBtn?: string;
  NextBtn?: string;
  AgreeBtn?: string;
  AcceptBtn?: string;
  DontAcceptBtn?: string;
  InstallBtn?: string;
  UninstallBtn?: string;
  CancelBtn?: string;
  CloseBtn?: string;
  BrowseBtn?: string;
  ShowDetailsBtn?: string;
  ClickNext?: string;
  ClickInstall?: string;
  ClickUninstall?: string;
  Name?: string;
  Completed?: string;
  LicenseText?: string;
  LicenseTextCB?: string;
  LicenseTextRB?: string;
  UnLicenseText?: string;
  UnLicenseTextCB?: string;
  UnLicenseTextRB?: string;
  Custom?: string;
  ComponentsText?: string;
  ComponentsSubText1?: string;
  ComponentsSubText2_NoInstTypes?: string;
  ComponentsSubText2?: string;
  UnComponentsText?: string;
  UnComponentsSubText1?: string;
  UnComponentsSubText2_NoInstTypes?: string;
  UnComponentsSubText2?: string;
  DirText?: string;
  DirSubText?: string;
  DirBrowseText?: string;
  UnDirText?: string;
  UnDirSubText?: string;
  UnDirBrowseText?: string;
  SpaceAvailable?: string;
  SpaceRequired?: string;
  UninstallingText?: string;
  UninstallingSubText?: string;
  FileError?: string;
  FileError_NoIgnore?: string;
  CantWrite?: string;
  CopyFailed?: string;
  CopyTo?: string;
  Registering?: string;
  Unregistering?: string;
  SymbolNotFound?: string;
  CouldNotLoad?: string;
  CreateFolder?: string;
  CreateShortcut?: string;
  CreatedUninstaller?: string;
  Delete?: string;
  DeleteOnReboot?: string;
  ErrorCreatingShortcut?: string;
  ErrorCreating?: string;
  ErrorDecompressing?: string;
  ErrorRegistering?: string;
  ExecShell?: string;
  Exec?: string;
  Extract?: string;
  ErrorWriting?: string;
  InvalidOpcode?: string;
  NoOLE?: string;
  OutputFolder?: string;
  RemoveFolder?: string;
  RenameOnReboot?: string;
  Rename?: string;
  Skipped?: string;
  CopyDetails?: string;
  LogInstall?: string;
  Byte?: string;
  Kilo?: string;
  Mega?: string;
  Giga?: string;
}

interface FontSettings {
  name: null | string;
  size: null | number;
}

interface ParserOptions {
  minify?: boolean;
  stringify?: boolean;
}
