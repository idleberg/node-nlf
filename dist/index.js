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
                var credit = [];
                for (var i = index; i < lines.length; i++) {
                    if (lines[i].match(/^#\s*\^/))
                        break;
                    credit.push(lines[i]);
                }
                output.credits = credit;
            }
            else if (line.match(/^#\s*\^/)) {
                var langString = line.replace(/^#\s*/, '');
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
                output += "\n# " + key + "\n" + input.strings[key];
            }
        }
    }
    catch (e) {
        throw e;
    }
    return output;
};
exports.stringify = stringify;
