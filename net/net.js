const AF_INET = require('./af_inet'); 
const { tcpProt } = require('./tcp');
const protMap = {};
const familyMap = {};
function registerFamily(familyInfo) {
    familyMap[familyInfo.type] = familyInfo;
}
function registerProt(protInfo) {
    protMap[protInfo.type] = protInfo;
}
function init() {
    registerFamily(AF_INET);
    registerProt(tcpProt);
}

module.exports = {
    familyMap,
    init,
    protMap,
}