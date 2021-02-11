const Module = require("../core/Module");
const RBot = require("../core/RBot");
const Discord = require("discord.js");

const confLoader = require("../util/confLoader");

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

        // log subcommand
        if(args[0] == "log") {
            let logs = confLoader.load("../data/Say/log.yml");
            logs = logs.slice(0,5);
            let message = "";
            for(let log of logs)
                message += "<@" + log.requested_by + ">  *" + log.message.trim() + "*\n\n";
            let embed = new Discord.MessageEmbed();
            embed.setColor("#dd2e44");
            embed.setDescription(message);
            
            msg.channel.send(embed);
            return;
            // TODO: return should indicate success.
        } 

        // default behaviour
        msg.delete({ timeout: 0 });
        let message = "";
        for(let arg of args) message += arg + " ";
        msg.channel.send(message);
        this.recordLog(msg.author.id, message);
    
      
    }

    processInteraction(interaction) {

        let channel = this.rbot.dClient.channels.cache.get(interaction.channel_id);
        let msg = interaction.data.options[0].value;
        channel.send(msg);
        this.recordLog(interaction.member.user.id, msg);
    }

    recordLog(username, message) {
        let logs = confLoader.load("../data/Say/log.yml");
        logs.unshift({"requested_by": username, "message": message});
        confLoader.save("../data/Say/log.yml", logs.slice(0,5));
    }


    processMessage() {}
}

module.exports = Say;