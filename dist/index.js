"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enum_js_1 = require("./enum.js");
/**
 * Parses an NSIS language file string
 * @param {string} input - NLF string
 * @returns {string} - NLF object
 */
var parse = function (input) {
    var output = {
        header: '',
        id: 0,
        font: {
            name: null,
            size: null
        },
        codepage: null,
        rtl: false,
        strings: {},
    };
    var strings = {};
    try {
        // remove all comments
        input = input.trim().replace(/^#.*(\r?\n|$)/mg, '');
        // split into lines
        var lines_1 = input.split(/\r?\n/);
        lines_1.forEach(function (line, index) {
            var key = enum_js_1.default[index];
            if (key.startsWith('^')) {
                // Language String
                key = key.replace('^', '');
                output.strings[key] = lines_1[index];
            }
            else {
                // Meta Data
                switch (key) {
                    case 'id':
                    case 'codepage':
                        output[key] = (lines_1[index] === '-') ? null : parseInt(lines_1[index]);
                        break;
                    case 'font':
                        output.font.name = (lines_1[index] === '-') ? null : lines_1[index];
                        break;
                    case 'fontsize':
                        output.font.size = (lines_1[index] === '-') ? null : parseInt(lines_1[index]);
                        break;
                    case 'rtl':
                        output[key] = (lines_1[index].toUpperCase() === 'RTL') ? true : false;
                        break;
                    default:
                        output[key] = lines_1[index];
                        break;
                }
            }
        });
    }
    catch (e) {
        throw e;
    }
    return output;
};
exports.parse = parse;
/**
 * Stringifies an NSIS language file object
 * @param {Object} input - NLF object
 * @returns {string} - NLF string
 */
var stringify = function (input) {
    var output = '';
    try {
        output += "# Header, don't edit\n" + input.header;
        output += "\n# Language ID\n" + input.id;
        output += "\n# Font and size - dash (-) means default";
        if (typeof input.font !== 'undefined') {
            output += (input.font.name === null) ? '\n-' : "\n" + input.font.name;
            output += (input.font.size === null) ? '\n-' : "\n" + input.font.size;
        }
        output += "\n# Codepage - dash (-) means ASCII code page";
        output += (input.codepage === null) ? '\n-' : "\n" + input.codepage;
        output += "\n# RTL - anything else than RTL means LTR";
        output += (input.rtl === true) ? '\nRTL' : '\n-';
        for (var key in input.strings) {
            if (input.strings.hasOwnProperty(key)) {
                output += "\n# ^" + key + "\n" + input.strings[key];
            }
        }
    }
    catch (e) {
        throw e;
    }
    return output;
};
exports.stringify = stringify;
