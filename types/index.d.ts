declare namespace NLF {
	type NsisLanguageObject = {
		code_page: null | number;
		font: FontSettings;
		header: string;
		id: number | null;
		rtl: boolean;
		strings: LanguageStrings;
		[key: string]: unknown;
	};

	type LanguageStrings = {
		AcceptBtn?: string;
		AgreeBtn?: string;
		BackBtn?: string;
		Branding?: string;
		BrowseBtn?: string;
		Byte?: string;
		CancelBtn?: string;
		CantWrite?: string;
		ClickInstall?: string;
		ClickNext?: string;
		ClickUninstall?: string;
		CloseBtn?: string;
		Completed?: string;
		CompletedSubCaption?: string;
		ComponentsSubCaption?: string;
		ComponentsSubText1?: string;
		ComponentsSubText2_NoInstTypes?: string;
		ComponentsSubText2?: string;
		ComponentsText?: string;
		ConfirmSubCaption?: string;
		CopyDetails?: string;
		CopyFailed?: string;
		CopyTo?: string;
		CouldNotLoad?: string;
		CreatedUninstaller?: string;
		CreateFolder?: string;
		CreateShortcut?: string;
		Custom?: string;
		Delete?: string;
		DeleteOnReboot?: string;
		DirBrowseText?: string;
		DirSubCaption?: string;
		DirSubText?: string;
		DirText?: string;
		DontAcceptBtn?: string;
		ErrorCreating?: string;
		ErrorCreatingShortcut?: string;
		ErrorDecompressing?: string;
		ErrorRegistering?: string;
		ErrorWriting?: string;
		Exec?: string;
		ExecShell?: string;
		Extract?: string;
		FileError_NoIgnore?: string;
		FileError?: string;
		Giga?: string;
		InstallBtn?: string;
		InstallingSubCaption?: string;
		InvalidOpcode?: string;
		Kilo?: string;
		LicenseSubCaption?: string;
		LicenseText?: string;
		LicenseTextCB?: string;
		LicenseTextRB?: string;
		LogInstall?: string;
		Mega?: string;
		Name?: string;
		NextBtn?: string;
		NoOLE?: string;
		OutputFolder?: string;
		Registering?: string;
		RemoveFolder?: string;
		Rename?: string;
		RenameOnReboot?: string;
		SetupCaption?: string;
		ShowDetailsBtn?: string;
		Skipped?: string;
		SpaceAvailable?: string;
		SpaceRequired?: string;
		SymbolNotFound?: string;
		UnCompletedSubCaption?: string;
		UnComponentsSubCaption?: string;
		UnComponentsSubText1?: string;
		UnComponentsSubText2_NoInstTypes?: string;
		UnComponentsSubText2?: string;
		UnComponentsText?: string;
		UnDirBrowseText?: string;
		UnDirSubCaption?: string;
		UnDirSubText?: string;
		UnDirText?: string;
		UninstallBtn?: string;
		UninstallCaption?: string;
		UninstallingSubCaption?: string;
		UninstallingSubText?: string;
		UninstallingText?: string;
		UnLicenseText?: string;
		UnLicenseTextCB?: string;
		UnLicenseTextRB?: string;
		Unregistering?: string;
		[key: string]: string | undefined;
	};

	type FontSettings = {
		name: null | string;
		size: null | number;
	};

	type EndOfLine = '\r\n' | '\n';

	type ParserOptions = {
		minify?: boolean;
		stringify?: boolean;
	};

	type StringifierOptions = {
		eol?: 'crlf' | 'lf';
	};
}

export = NLF;
export as namespace NLF;
