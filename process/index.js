
function *Generator() { 
    while(1) {
        console.log('idle'); 
        yield;
    } 
}

const processs = [];
class Process {
    constructor(options) {
        Object.assign(this, global.current, options);
        processs.push(this);
        this.state = 'READY';
        this.fd = [];
    }
}
// processs.push(new Process({run: Generator()}));
function sched() {
    for (let i = 0; i < processs.length; ) {
        if (processs[i].state === 'READY') {
            global.current = processs[i];
            processs[i].run.next();
            i = (++i % processs.length);
        }
    }
}

function spawn(options) {
    return new Process(options);
}
module.exports = {
    Process,
    sched,
    spawn,
}
