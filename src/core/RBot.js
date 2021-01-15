const fs = require("fs");
const Discord = require("discord.js");
const confLoader = require("../util/confLoader");
const ModuleManager = require('./ModuleManager');

class RBot {

    constructor() {
        
        this.DClient = new Discord.Client();
        this.modules = [];
        this.services = [];
        this.moduleManager = new ModuleManager(this);
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
        
        console.log("found services: " + serviceFiles);

        for (const file of serviceFiles) {
            console.log("loading service: " + file);
            let serviceClass = require(`../services/${file}`);
            let service = new serviceClass();
            console.log('Done.');
            this.services.push(service);
            
        }

    }




    start() {
        this.moduleManager.start();
        this.DClient.login(this.botConfig.botToken);
    }
}

module.exports = RBot;