const fs = require("fs");
const Discord = require("discord.js");
const confLoader = require("../util/confLoader");
const ModuleManager = require("./ModuleManager");
const ServiceManager = require("./ServiceManager");
const log = require("../util/log");

class RBot {

    constructor() {

        this.botConfig = {};
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


    start() {
        this.dClient.on("ready", () => {
            
            // Set the client user's activity
            this.dClient.user.setActivity("*help", { type: "LISTENING" })
                .then(presence => log(`Activity set to ${presence.activities[0].name}`))
                .catch(console.error);

            this.moduleManager.start();
            this.serviceManager.start();
        });
        
        this.dClient.login(this.botConfig.botToken);
    }
}

module.exports = RBot;