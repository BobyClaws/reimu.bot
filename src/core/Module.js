const log = require("../util/log");

class Module {

    constructor(rbot) {
        this.rbot = rbot;
        this.moduleName = null;
    }

    processInteraction() {
        this.log("method processInteraction() not implemented, skipping");
    }

    processCommand() {
        this.log("method processCommand() not implemented, skipping");
    }

    processMessage() {
        this.log("method processMessage() not implemented, skipping");
    }

    log(...msg) {
        log(`[${this.constructor.name} module]`, ...msg);
    }

}

module.exports = Module;