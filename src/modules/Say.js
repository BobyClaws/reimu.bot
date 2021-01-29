const Module = require("../core/Module");
const RBot = require('../core/RBot');

class Say extends Module {

    /**
     * @param {RBot} rbot
     */
    constructor(rbot) {
        super(rbot);
        this.commandName = "say";
    }


    /**
     * 
     * @param {Discord.Message} msg
     * @param {string[]} args
     */
    processCommand(msg, args) {
        msg.delete({ timeout: 0 });
        let s = "";
        for(let arg of args) s += arg + " ";

        msg.channel.send(s);

    
            
    }

    processInteraction(interaction) {

        let channel = this.rbot.dClient.channels.cache.get(interaction.channel_id);
        console.log(interaction);
        channel.send(interaction.data.options[0].value);
    }


    processMessage() {}
}

module.exports = Say;