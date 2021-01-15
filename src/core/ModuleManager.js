// TODO: command processor would be good?

const fs = require('fs');
const RBot = require('./RBot');

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
        
        console.log("found modules: " + moduleFiles);

        for (const file of moduleFiles) {
            console.log("loading module: " + file);
            let moduleClass = require(`../modules/${file}`);
            let module = new moduleClass(this.rbot);
            console.log('Done.');
            this.rbot.modules.push(module);
        }

    }


    setupModules() {

        // pass command requests from raw messages
        this.rbot.DClient.on("message", (msg)  => {

            // look for commands in message
            if(msg.author.bot == true) return;
            if(msg.content.startsWith("r.")) {
                
                let args = msg.content.trim().slice(2).split(/ +/);
            
                let commandName = args.shift();
                // give message to all modules with function processCommand
                for(let module of this.rbot.modules) {
                    if(module.commandName == commandName) {
                        if(module.processCommand == undefined) {
                            continue;
                        }
                        module.processCommand(msg, args);
                    }
                }
            }
        });

        // TODO: pass commands requests from slash commands
        this.rbot.DClient.ws.on('INTERACTION_CREATE', async interaction => {
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