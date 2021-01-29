const fs = require("fs");
const Discord = require("discord.js");
const confLoader = require("../util/confLoader");
const ModuleManager = require("./ModuleManager");
const ServiceManager = require("./ServiceManager");
const log = require("../util/log");

class RBot {

    constructor() {
        
        this.dClient = new Discord.Client();
        this.modules = [];
        this.services = [];
        this.moduleManager = new ModuleManager(this);
        this.serviceManager = new ServiceManager(this);
    }

    /**
     * configure the bot using the bot config file
     * @param {string} configFile 
     */
    configure(configFile) {
        this.botConfig = confLoader.load(configFile);
    }



    // TODO: add this to service manager
    loadServices() {
        const serviceFiles = fs.readdirSync("services")
            .filter((file) => file.endsWith(".js"));
        
        log("found services: " + serviceFiles);

        for (const file of serviceFiles) {
            log("loading service: " + file);
            let serviceClass = require(`../services/${file}`);
            let service = new serviceClass();
            log("Done.");
            this.services.push(service);
            
        }

    }




    start() {
        this.moduleManager.start();
        this.serviceManager.start();
        this.dClient.login(this.botConfig.botToken);
    }
}

module.exports = RBot;