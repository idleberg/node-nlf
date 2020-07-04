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
    try {
        // remove all comments
        input = input.trim().replace(/^#.*(\r?\n|$)/mg, '');
        // split into lines
        var lines_1 = input.split(/\r?\n/);
        // get NLF version
        var version_1 = lines_1[0].match(/\d+$/)[0] || 6;
        lines_1.forEach(function (line, index) {
            var key = NLFStrings["v" + version_1][index];
            if (typeof key !== 'undefined' && key.startsWith('^')) {
                // Language String
                key = key.replace('^', '');
                output.strings[key] = lines_1[index];
            }
            else {
                // Meta Data
                switch (key) {
                    case 'id':
                    case 'code_page':
                        output[key] = (lines_1[index] === '-') ? null : parseInt(lines_1[index]);
                        break;
                    case 'font':
                    case 'fontname':
                        output.font.name = (lines_1[index] === '-') ? null : lines_1[index];
                        break;
                    case 'fontsize':
                        output.font.size = (lines_1[index] === '-') ? null : parseInt(lines_1[index]);
                        break;
                    case 'rtl':
                        output[key] = (lines_1[index].toUpperCase() === 'RTL') ? true : false;
                        break;
                    default:
                        if (typeof key !== 'undefined') {
                            output[key] = lines_1[index];
                        }
                        break;
                }
            }
        });
    }
    catch (e) {
        throw e;
    }
    if (options.stringify === true) {
        var indentation = (options.minify === true) ? 0 : 2;
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
    var output = '';
    var inputObj;
    // Convert JSON string to object, if necessary
    if (isObject(input) === false) {
        inputObj = JSON.parse(input);
    }
    else {
        inputObj = input;
    }
    // get NLF version
    var version = inputObj.header.match(/\d+$/)[0] || 6;
    try {
        output += "# Header, don't edit\n" + inputObj.header;
        output += "\n# Language ID\n" + inputObj.id;
        if (typeof inputObj.font !== 'undefined' && NLFStrings["v" + version].includes('fontname')) {
            output += "\n# Font and size - dash (-) means default";
            output += (inputObj.font.name === null) ? '\n-' : "\n" + inputObj.font.name;
            output += (inputObj.font.size === null) ? '\n-' : "\n" + inputObj.font.size;
        }
        if (NLFStrings["v" + version].includes('code_page')) {
            output += "\n# Codepage - dash (-) means ASCII code page";
            output += (inputObj.code_page === null) ? '\n-' : "\n" + inputObj.code_page;
        }
        if (NLFStrings["v" + version].includes('rtl')) {
            output += "\n# RTL - anything else than RTL means LTR";
            output += (inputObj.rtl === true) ? '\nRTL' : '\n-';
        }
        for (var key in inputObj.strings) {
            if (inputObj.strings.hasOwnProperty(key) && NLFStrings["v" + version].includes("^" + key)) {
                output += "\n# ^" + key + "\n" + inputObj.strings[key];
            }
        }
    }
    catch (e) {
        throw e;
    }
    return output;
};
// Helpers
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

exports.parse = parse;
exports.stringify = stringify;
