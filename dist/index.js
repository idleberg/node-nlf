"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parse = function (input) {
    var output = {
        codepage: null,
        credits: [],
        font: {
            name: null,
            size: null
        },
        header: '',
        id: 0,
        rtl: false,
        strings: {},
    };
    var strings = {};
    var lines = input.trim().split(/\r?\n/);
    var credit = [];
    try {
        lines.forEach(function (line, index) {
            if (line === '# Start editing here') {
                return;
            }
            else if (line.match(/#\s*Header, don\'t edit/)) {
                output.header = lines[index + 1];
            }
            else if (line.match(/#\s*Language ID/)) {
                output.id = parseInt(lines[index + 1]);
            }
            else if (line.match(/#\s*Font and size/)) {
                output.font = {
                    name: (lines[index + 1] === '-') ? null : lines[index + 1],
                    size: (lines[index + 2] === '-') ? null : parseInt(lines[index + 2])
                };
            }
            else if (line.match(/#\s*Codepage/)) {
                output.codepage = (lines[index + 1] === '-') ? null : parseInt(lines[index + 1]);
            }
            else if (line.match(/#\s*RTL/)) {
                output.rtl = (lines[index + 1].toUpperCase() === 'RTL') ? true : false;
            }
            else if (line.match(/^#\s*Translat/)) {
                output.credits.push(line);
            }
            else if (line.match(/^#\s*\^?(Branding|SetupCaption|UninstallCaption|LicenseSubCaption|ComponentsSubCaption|DirSubCaption|InstallingSubCaption|CompletedSubCaption|UnComponentsSubCaption|UnDirSubCaption|ConfirmSubCaption|UninstallingSubCaption|UnCompletedSubCaption|BackBtn|NextBtn|AgreeBtn|AcceptBtn|DontAcceptBtn|InstallBtn|UninstallBtn|CancelBtn|CloseBtn|BrowseBtn|ShowDetailsBtn|ClickNext|ClickInstall|ClickUninstall|Name|Completed|LicenseText|LicenseTextCB|LicenseTextRB|UnLicenseText|UnLicenseTextCB|UnLicenseTextRB|Custom|ComponentsText|ComponentsSubText1|ComponentsSubText2_NoInstTypes|ComponentsSubText2|UnComponentsText|UnComponentsSubText1|UnComponentsSubText2_NoInstTypes|UnComponentsSubText2|DirText|DirSubText|DirBrowseText|UnDirText|UnDirSubText|UnDirBrowseText|SpaceAvailable|SpaceRequired|UninstallingText|UninstallingSubText|FileError|FileError_NoIgnore|CantWrite|CopyFailed|CopyTo|Registering|Unregistering|SymbolNotFound|CouldNotLoad|CreateFolder|CreateShortcut|CreatedUninstaller|Delete|DeleteOnReboot|ErrorCreatingShortcut|ErrorCreating|ErrorDecompressing|ErrorRegistering|ExecShell|Exec|Extract|ErrorWriting|InvalidOpcode|NoOLE|OutputFolder|RemoveFolder|RenameOnReboot|Rename|Skipped|CopyDetails|LogInstall|Byte|Kilo|Mega|Giga)/i)) {
                var langString = line.replace('^', '').replace(/^#\s*/, '');
                strings[langString] = lines[index + 1];
            }
            output.strings = strings;
        });
    }
    catch (e) {
        throw e;
    }
    return output;
};
exports.parse = parse;
var stringify = function (input, startEditing) {
    if (startEditing === void 0) { startEditing = true; }
    var output = '';
    try {
        output += "# Header, don't edit\n" + input.header;
        if (startEditing)
            output += "\n# Start editing here";
        output += "\n# Language ID\n" + input.id;
        output += "\n# Font and size - dash (-) means default";
        output += (input.font.name === null) ? '\n-' : "\n" + input.font.name;
        output += (input.font.size === null) ? '\n-' : "\n" + input.font.size;
        output += "\n# Codepage - dash (-) means ASCII code page";
        output += (input.codepage === null) ? '\n-' : "\n" + input.codepage;
        output += "\n# RTL - anything else than RTL means LTR";
        output += (input.rtl === true) ? '\nRTL' : '\n-';
        input.credits.forEach(function (credit) {
            output += "\n" + credit;
        });
        for (var key in input.strings) {
            if (input.strings.hasOwnProperty(key)) {
                output += "\n# ^" + key + "\n" + input.strings[key];
            }
        }
        output += '\n';
    }
    catch (e) {
        throw e;
    }
    return output;
};
exports.stringify = stringify;
