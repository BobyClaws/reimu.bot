class Module {

    constructor(rbot) {
        this.rbot = rbot;
        this.moduleName = null;
    }

    processInteraction() {
        console.log('no interaction defined');
    }

    processCommand() {
        console.log('no command defined');
    }
}

module.exports = Module;