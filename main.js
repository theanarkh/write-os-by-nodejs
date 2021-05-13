const { spawn, sched } = require('./process');
const { socket, bind, listen } = require('./net/socket');
const { init } = require('./net/net');
init();
spawn({
    run: function *(params) {
       const fd = socket('AF_INET', 'TCP');
       bind(fd, {addr: '127.0.0.1', port: 80});
       listen(fd);
       console.log(current.fd[fd].inode.socket)
    //    while(1) {
    //     console.log('hello'); 
    //     yield;
    //    }
    }()
});
sched();
