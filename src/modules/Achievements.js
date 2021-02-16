const Module = require("../core/Module");
const Discord = require("discord.js");
const RBot = require("../core/RBot");

const confLoader = require("../util/confLoader");

class Achievements extends Module {

    /**
     * @param {RBot} rbot
     */
    constructor(rbot) {
        super(rbot);
        this.commandName = "achievements";
    }


    /**
     * 
     * @param {Discord.Message} msg
     * @param {string[]} args
     */
    processCommand(msg, args) {

        let recordFile = "../data/Achievements/records/records.yml";
        let records = confLoader.load(recordFile);

        let username = msg.author.username;

        let embed = new Discord.MessageEmbed();



        for(let record in records) {
            for(let user in records[record]["achievers"]) {
                if(user == username) {
                    embed.addField(`${record} [${records[record]["achievers"][user]}/${records[record]["count"]}]`, records[record]["description"]);
                    break;
                }
            }
        }

        msg.channel.send(embed);




    
      
    }




}

module.exports = Achievements;