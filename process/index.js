
function *Generator() { 
    while(1) {
        console.log('idle'); 
        yield;
    } 
}
const STATE = {
    RUNNING: 0,
    READY: 1,
    WAIT: 2,
    STOP: 3,
};
let pid = 0;
const processs = [];
class Process {
    constructor(options) {
        Object.assign(this, global.current, options);
        processs.push(this);
        this.state = STATE.READY;
        this.fd = [];
        this.pid = ++pid;
        this.ppid = global.current ? global.current.pid : 0;
    }
}
// processs.push(new Process({run: Generator()}));
function sched() {
    for (let i = 0; i < processs.length; ) {
        if (processs[i].state === STATE.READY) {
            global.current = processs[i];
            processs[i].run.next();
            i = (++i % processs.length);
        }
    }
}

function spawn(options) {
    return new Process(options);
}

function sleepon(queue) {
    queue.push(current);
}

function wakeup(queue) {
    const process = queue.shift();
    process.state = STATE.RUNNING;
}
module.exports = {
    Process,
    sched,
    spawn,
    wakeup,
    sleepon,
}
