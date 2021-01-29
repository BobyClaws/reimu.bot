const log = require("../util/log");
const RBot = require("./RBot");

class Service {

    /**
     * 
     * @param {RBot} rbot 
     */
    constructor(rbot) {
        this.rbot = rbot;
        this.serviceName = "no service name configured";
        this.serviceInterval = 10000;
        
    }

    init() {
        log("service not initialized");
    }

    loop() {
        log("no loop defined.. guess im looping for no reason");
    }

    log(...msg) {
        log(`[${this.constructor.name} service]`, ...msg);
    }


}

module.exports = Service;