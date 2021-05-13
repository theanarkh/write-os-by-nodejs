const { spawn, sched } = require('./process');
const { socket, bind, listen } = require('./net/socket');
const { init } = require('./net/net');
const { pipe } = require('./ipc/pipe');
init();
spawn({
    run: function *(params) {
        // if (spawn()) {

        // }
        const fds = [];
        console.log(pipe(fds), fds, current);
    //    const fd = socket('AF_INET', 'TCP');
    //    bind(fd, {addr: '127.0.0.1', port: 80});
    //    listen(fd);
    //    console.log(current.fd[fd].inode.socket)
    //    while(1) {
    //     console.log('hello'); 
    //     yield;
    //    }
    }()
});

sched();
