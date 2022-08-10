module.exports = async (time) => {
    function interval(time) {
    return new Promise(resolve => {
        setInterval(async () => {
            resolve();
        }, time);
    });
}
    return interval(time);
}