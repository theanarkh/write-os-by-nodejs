let fd = 0;
function getFd() {
    return fd++;
}

module.exports = {
    getFd,
}