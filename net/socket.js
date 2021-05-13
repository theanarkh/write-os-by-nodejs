const { familyMap } = require('./net');
const { getFd } = require('../fs/fd');
const { getFile } = require('../fs/file');
const { getInode } = require('../fs/inode');
class Socket {};

function socket(family, type, protocol) {
    const newSocket = new Socket();
    const familyInfo = familyMap[family];
    familyInfo.create(newSocket, type);
    newSocket.ops = familyInfo;
    const inode = getInode();
    const file = getFile();
    const fd = getFd();
    current.fd[fd] = file;
    file.inode = inode;
    inode.socket = newSocket;
     
    return fd;
}

function lookupSocket(fd) {
    return current.fd[fd].inode.socket;
}
function bind(fd, addrInfo) {
    const socket = lookupSocket(fd);
    socket.ops.bind(socket, addrInfo);
}

function listen(fd, backlog) {
    const socket = lookupSocket(fd);
    socket.ops.listen(socket, backlog);
}

function connect(fd, addrInfo) {
    const socket = lookupSocket(fd);
    socket.ops.connect(socket, backlog);
}

module.exports = {
    socket,
    bind,
    listen,
    connect,
}