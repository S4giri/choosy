module.exports = (num) => {
    num += '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(num)) {
        num = num.replace(rgx, '$1' + ',' + '$2');
    }
    return num.replace(".", ",");
};