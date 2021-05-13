
class Socket {}
const prot = {
    create: (socket, type) => {
        const sock =  new Socket();
        const { protMap } = require('./net');
        sock.prot = protMap[type].prot;
        sock.socket = socket;
        socket.sock = sock;
        return sock; 
    },
    bind(socket, addrInfo) {
        socket.sock.saddr = addrInfo.addr;
        socket.sock.sport = addrInfo.port;
    },

    listen(socket, backlog) {
        socket.sock.state = 'LISTEN';
    },

    connect(socket, addrInfo) {

    },
}

module.exports = {
    type:  'AF_INET',
    ...prot
}