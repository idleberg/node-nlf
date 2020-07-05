'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var NLFStrings = {
    /**
     * NLF v2
     + used up to NSIS 2.0 beta 3
     */
    v2: [
        'header',
        'id',
        '^Branding',
        '^SetupCaption',
        '^UninstallCaption',
        '^LicenseSubCaption',
        '^ComponentsSubCaption',
        '^DirSubCaption',
        '^InstallingSubCaption',
        '^CompletedSubCaption',
        '^ConfirmSubCaption',
        '^UninstallingSubCaption',
        '^UnCompletedSubCaption',
        '^BackBtn',
        '^NextBtn',
        '^AgreeBtn',
        '^InstallBtn',
        '^UninstallBtn',
        '^CancelBtn',
        '^CloseBtn',
        '^BrowseBtn',
        '^ShowDetailsBtn',
        '^Name',
        '^Completed',
        '^Custom',
        '^ComponentsText',
        '^ComponentsSubText1',
        '^ComponentsSubText2',
        '^DirText',
        '^SpaceAvailable',
        '^SpaceRequired',
        '^UninstallingText',
        '^FileError_NoIgnore',
        '^CantWrite',
        '^CopyFailed',
        '^CopyTo',
        '^SymbolNotFound',
        '^CouldNotLoad',
        '^CreateFolder',
        '^CreateShortcut',
        '^CreatedUninstaller',
        '^Delete',
        '^DeleteOnReboot',
        '^ErrorCreatingShortcut',
        '^ErrorCreating',
        '^ErrorDecompressing',
        '^ErrorRegistering',
        '^ExecShell',
        '^Exec',
        '^Extract',
        '^ErrorWriting',
        '^InvalidOpcode',
        '^NoOLE',
        '^OutputFolder',
        '^RemoveFolder',
        '^RenameOnReboot',
        '^Rename',
        '^Skipped',
        '^CopyDetails',
    ],
    /**
     * NLF v6
     + used as of NSIS 2.0 beta 4
     */
    v6: [
        'header',
        'id',
        'fontname',
        'fontsize',
        'code_page',
        'rtl',
        '^Branding',
        '^SetupCaption',
        '^UninstallCaption',
        '^LicenseSubCaption',
        '^ComponentsSubCaption',
        '^DirSubCaption',
        '^InstallingSubCaption',
        '^CompletedSubCaption',
        '^UnComponentsSubCaption',
        '^UnDirSubCaption',
        '^ConfirmSubCaption',
        '^UninstallingSubCaption',
        '^UnCompletedSubCaption',
        '^BackBtn',
        '^NextBtn',
        '^AgreeBtn',
        '^AcceptBtn',
        '^DontAcceptBtn',
        '^InstallBtn',
        '^UninstallBtn',
        '^CancelBtn',
        '^CloseBtn',
        '^BrowseBtn',
        '^ShowDetailsBtn',
        '^ClickNext',
        '^ClickInstall',
        '^ClickUninstall',
        '^Name',
        '^Completed',
        '^LicenseText',
        '^LicenseTextCB',
        '^LicenseTextRB',
        '^UnLicenseText',
        '^UnLicenseTextCB',
        '^UnLicenseTextRB',
        '^Custom',
        '^ComponentsText',
        '^ComponentsSubText1',
        '^ComponentsSubText2_NoInstTypes',
        '^ComponentsSubText2',
        '^UnComponentsText',
        '^UnComponentsSubText1',
        '^UnComponentsSubText2_NoInstTypes',
        '^UnComponentsSubText2',
        '^DirText',
        '^DirSubText',
        '^DirBrowseText',
        '^UnDirText',
        '^UnDirSubText',
        '^UnDirBrowseText',
        '^SpaceAvailable',
        '^SpaceRequired',
        '^UninstallingText',
        '^UninstallingSubText',
        '^FileError',
        '^FileError_NoIgnore',
        '^CantWrite',
        '^CopyFailed',
        '^CopyTo',
        '^Registering',
        '^Unregistering',
        '^SymbolNotFound',
        '^CouldNotLoad',
        '^CreateFolder',
        '^CreateShortcut',
        '^CreatedUninstaller',
        '^Delete',
        '^DeleteOnReboot',
        '^ErrorCreatingShortcut',
        '^ErrorCreating',
        '^ErrorDecompressing',
        '^ErrorRegistering',
        '^ExecShell',
        '^Exec',
        '^Extract',
        '^ErrorWriting',
        '^InvalidOpcode',
        '^NoOLE',
        '^OutputFolder',
        '^RemoveFolder',
        '^RenameOnReboot',
        '^Rename',
        '^Skipped',
        '^CopyDetails',
        '^LogInstall',
        '^Byte',
        '^Kilo',
        '^Mega',
        '^Giga'
    ]
};

/**
 * Parses an NSIS language file string
 * @param input - NLF string
 * @returns - NLF object
 */
var parse = function (input, options) {
    if (options === void 0) { options = {}; }
    var output = {
        header: '',
        id: 0,
        font: {
            name: null,
            size: null
        },
        code_page: null,
        rtl: false,
        strings: {}
    };
    // remove all comments
    input = input.trim().replace(/^#.*(\r?\n|$)/mg, '');
    // split into lines
    var lines = input.split(/\r?\n/);
    // get NLF version
    var version = lines[0].match(/\d+$/)[0] || 6;
    lines.map(function (line, index) {
        var key = NLFStrings["v" + version][index];
        if (typeof key !== 'undefined' && key.startsWith('^')) {
            // Language String
            key = key.replace('^', '');
            output.strings[key] = lines[index];
        }
        else {
            // Meta Data
            switch (key) {
                case 'id':
                case 'code_page':
                    output[key] = (lines[index] === '-')
                        ? null
                        : parseInt(lines[index]);
                    break;
                case 'font':
                case 'fontname':
                    output.font.name = (lines[index] === '-')
                        ? null
                        : lines[index];
                    break;
                case 'fontsize':
                    output.font.size = (lines[index] === '-')
                        ? null
                        : parseInt(lines[index]);
                    break;
                case 'rtl':
                    output[key] = (lines[index].toUpperCase() === 'RTL')
                        ? true
                        : false;
                    break;
                default:
                    if (typeof key !== 'undefined') {
                        output[key] = lines[index];
                    }
                    break;
            }
        }
    });
    if (options.stringify === true) {
        var indentation = (options.minify === true)
            ? 0
            : 2;
        return JSON.stringify(output, null, indentation);
    }
    return output;
};
/**
 * Stringifies an NSIS language file object
 * @param input - NLF object
 * @returns - NLF string
 */
var stringify = function (input) {
    var output = [];
    var inputObj = typeof input === 'string'
        ? JSON.parse(input)
        : input;
    // get NLF version
    var version = inputObj.header.match(/\d+$/)[0] || 6;
    output.push('# Header, don\'t edit', inputObj.header);
    output.push('# Language ID', inputObj.id);
    if (typeof inputObj.font !== 'undefined' && NLFStrings["v" + version].includes('fontname')) {
        output.push("# Font and size - dash (-) means default");
        if (inputObj.font.name) {
            output.push("" + inputObj.font.name);
        }
        else {
            output.push('-');
        }
        if (inputObj.font.size) {
            output.push("" + inputObj.font.size);
        }
        else {
            output.push('-');
        }
    }
    if (NLFStrings["v" + version].includes('code_page')) {
        output.push("# Codepage - dash (-) means ASCII code page");
        if (inputObj.code_page) {
            output.push("" + inputObj.code_page);
        }
        else {
            output.push('-');
        }
    }
    if (NLFStrings["v" + version].includes('rtl')) {
        output.push("# RTL - anything else than RTL means LTR");
        if (inputObj.rtl) {
            output.push('RTL');
        }
        else {
            output.push('-');
        }
    }
    for (var key in inputObj.strings) {
        if (NLFStrings["v" + version].includes("^" + key)) {
            output.push("# ^" + key, inputObj.strings[key]);
        }
    }
    return output.join('\n');
};

exports.parse = parse;
exports.stringify = stringify;
