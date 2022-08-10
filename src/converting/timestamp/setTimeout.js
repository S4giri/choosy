module.exports = async (time) => {
    function wait(time) {
    return new Promise(resolve => {
        setTimeout(async () => {
            resolve();
        }, time);
    });
}
    return wait(time);
}