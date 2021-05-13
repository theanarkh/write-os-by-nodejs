const { getFd } = require('../fs/fd');
const { getFile } = require('../fs/file');
const { getInode } = require('../fs/inode');
const { sleepon, wakeup } = require('../process');
const LEN = 100;
function pipe(fds) {
    const inode = getInode();
    const file1 = getFile();
    const fd1 = getFd();
    const file2 = getFile();
    const fd2 = getFd();
    current.fd[fd1] = file1;
    current.fd[fd2] = file2;
    file1.inode = inode;
    file2.inode = inode;
    inode.addr = new Uint8Array(LEN);
    Object.assign(inode, {
        read: 0,
        write: 0,
        len: 0,
        readQueue: [],
        writeQueue: []
    });
    fds[0] = fd1;
    fds[1] = fd2;
}


const INC = function(ptr) {
	return (ptr + 1 ) & (LEN -1);
};

function read_pipe(fd, len) {
    const inode = current.fd[fd].inode;
	const readableLen = inode.len;
	if (!readableLen && len) {
		sleepon(inode.readQueue);
		return -1;
	}
	const realLen = len > readableLen ? readableLen : len;
	const i = 0;
	const data = [];
	while(i < realLen) {
		data.push(inode.addr[inode.read]);
		inode.len--;
		inode.read = INC(inode.read);
		i++;
	}
	if (realLen && buf.writeQueue.length) {
		wakeup(buf.writeQueue)
	}
	return data;
}


function write_pipe(fd, data) {
	const writableLen = (LEN - inode.len);
	if (!writableLen && data.length) {
		sleepon(inode.writeQueue);
		return -1;
	}
	const realLen = data.length > writableLen ? writableLen : data.length;
	const i = 0;
	while(i < realLen) {
		inode.addr[inode.write] = data[i];
		inode.len++;
		inode.write = INC(inode.write);
		i++;
	}
	if (realLen && inode.readQueue.length) {
		wakeup(inode.readQueue);
	}
	return realLen;
}

module.exports = {
    pipe,
    read_pipe,
    write_pipe,
}