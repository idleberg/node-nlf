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
 * @param {Object|string} input - NLF object
 * @returns {string} - NLF string
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
    try {
        output += "# Header, don't edit\n" + inputObj.header;
        output += "\n# Language ID\n" + inputObj.id;
        output += "\n# Font and size - dash (-) means default";
        if (typeof inputObj.font !== 'undefined') {
            output += (inputObj.font.name === null) ? '\n-' : "\n" + inputObj.font.name;
            output += (inputObj.font.size === null) ? '\n-' : "\n" + inputObj.font.size;
        }
        output += "\n# Codepage - dash (-) means ASCII code page";
        output += (inputObj.codepage === null) ? '\n-' : "\n" + inputObj.codepage;
        output += "\n# RTL - anything else than RTL means LTR";
        output += (inputObj.rtl === true) ? '\nRTL' : '\n-';
        for (var key in inputObj.strings) {
            if (inputObj.strings.hasOwnProperty(key)) {
                output += "\n# ^" + key + "\n" + inputObj.strings[key];
            }
        }
    }
    catch (e) {
        throw e;
    }
    return output;
};
exports.stringify = stringify;
// Helpers
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
