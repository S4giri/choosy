const abbrev = require("./plugins/abbrev.js");
const format1 = require("./plugins/Money_format/format_1.js");
const format2 = require("./plugins/Money_format/format_2.js");
const format3 = require("./plugins/Money_format/format_3.js");
const renderEmoji = require("./plugins/renderEmoji.js");
const convertAbbrev = require("./plugins/convertAbbrev");
const convertFormats = require("./plugins/convertFormats");

module.exports = class Util {
    static toAbbrev(num) {
        return abbrev(num);
    }

    static f_1(num) {
        return format1(num);
    }

    static f_2(num) {
        return format2(num);
    }

    static f_3(num) {
        return format3(num);
    }

    static renderEmoji(ctx, msg, x, y) {
        return renderEmoji(ctx, msg, x, y);
    }

    static notAbbrev(num) {
        return convertAbbrev(num);
    }

    static notFormats(num) {
        return convertFormats(num);
    }

};