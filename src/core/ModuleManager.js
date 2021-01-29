// TODO: command processor would be good?

const fs = require('fs');
const RBot = require('./RBot');
const log = require('../util/log');

class ModuleManager {

    /**
     * 
     * @param {RBot} rbot 
     */
    constructor(rbot) {
        this.rbot = rbot; 
    
    }


    loadModules() {
        const moduleFiles = fs.readdirSync("modules")
            .filter((file) => file.endsWith(".js"));
        
        log("found modules: ", moduleFiles);

        for (const file of moduleFiles) {
            log("loading module: " + file);
            let moduleClass = require(`../modules/${file}`);
            let module = new moduleClass(this.rbot);
            log("Done.");
            this.rbot.modules.push(module);
        }

    }


    setupModules() {

        // setup raw message processing.
        this.rbot.dClient.on("message", (msg)  => {

            // look for commands in message
            if(msg.author.bot == true) return;
            if(msg.content.startsWith("r.")) {

                let args = msg.content.trim().slice(2).split(/ +/);
                let commandName = args.shift();
                // give message to all modules with function processCommand
                for(let module of this.rbot.modules) {
                    if(module.commandName == commandName) {
                        module.processCommand(msg, args);
                    }
                }
            } else {
                for(let module of this.rbot.modules) {
                    module.processMessage(msg);
                }
            }

        });

        // TODO: pass commands requests from slash commands
        this.rbot.dClient.ws.on('INTERACTION_CREATE', async interaction => {
            for(let module of this.rbot.modules) {
                if(module.commandName == interaction.data.name) {
                    module.processInteraction(interaction);
                }
            }
        });
    }




    start() {
        this.loadModules();
        this.setupModules();
    }
}

module.exports = ModuleManager;