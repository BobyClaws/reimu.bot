const Module = require('../core/Module');
const Discord = require('discord.js');
const RBot = require('../core/RBot');

class Help extends Module {

    /**
     * 
     * @param {RBot} rbot 
     */
    constructor(rbot) {
        super(rbot);
        this.commandName = "help"
    }

    /**
     * 
     * @param {Discord.Message} msg 
     * @param {string[]} args 
     */
    processCommand(msg, args) {
        const embed = new Discord.MessageEmbed();
        embed.setColor('#ff9959');
        embed.setTitle('list of available modules');
        embed.addField('source', 'finds original source for art, works best with full, uncropped images')
        embed.addField('say', 'make me speak stuff');
        msg.channel.send(embed);
    }

    processInteraction() {}

    processMessage() {}
}

module.exports = Help;