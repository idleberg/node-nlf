'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var JSON5 = require('json5');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var JSON5__namespace = /*#__PURE__*/_interopNamespace(JSON5);

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
 * Get version from input string
 * @param input
 */
function getVersion(input) {
    var _a, _b;
    var groups = (_a = input.match(/(?<version>\d+)$/)) === null || _a === void 0 ? void 0 : _a.groups;
    return ((_b = groups === null || groups === void 0 ? void 0 : groups.version) === null || _b === void 0 ? void 0 : _b.length)
        ? groups === null || groups === void 0 ? void 0 : groups.version
        : '6';
}
/**
 * Parses an NSIS language file string
 * @param input - NLF string
 * @returns - NLF object
 */
function parse(input, options) {
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
    var version = getVersion(lines[0]);
    lines.map(function (line, index) {
        var key = NLFStrings["v".concat(version)][index];
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
}
/**
 * Stringifies an NSIS language file object
 * @param input - NLF object
 * @returns - NLF string
 */
function stringify(input) {
    var output = [];
    var inputObj = typeof input === 'string'
        ? JSON5__namespace.parse(input)
        : input;
    // get NLF version
    var version = getVersion(inputObj.header);
    output.push('# Header, don\'t edit', inputObj.header);
    output.push('# Language ID', String(inputObj.id));
    if (typeof inputObj.font !== 'undefined' && NLFStrings["v".concat(version)].includes('fontname')) {
        output.push("# Font and size - dash (-) means default");
        if (inputObj.font.name) {
            output.push("".concat(inputObj.font.name));
        }
        else {
            output.push('-');
        }
        if (inputObj.font.size) {
            output.push("".concat(inputObj.font.size));
        }
        else {
            output.push('-');
        }
    }
    if (NLFStrings["v".concat(version)].includes('code_page')) {
        output.push("# Codepage - dash (-) means ASCII code page");
        if (inputObj.code_page) {
            output.push("".concat(inputObj.code_page));
        }
        else {
            output.push('-');
        }
    }
    if (NLFStrings["v".concat(version)].includes('rtl')) {
        output.push("# RTL - anything else than RTL means LTR");
        if (inputObj.rtl) {
            output.push('RTL');
        }
        else {
            output.push('-');
        }
    }
    for (var key in inputObj.strings) {
        if (NLFStrings["v".concat(version)].includes("^".concat(key))) {
            output.push("# ^".concat(key), inputObj.strings[key]);
        }
    }
    return output.join('\n');
}

exports.parse = parse;
exports.stringify = stringify;
