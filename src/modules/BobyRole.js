const Module = require("../core/Module");
const Discord = require("discord.js");

class BobyRole extends Module {

    constructor(rbot) {
        super(rbot);
        this.commandName = "role"; 
    }

    /**
     * 
     * @param {Discord.Message} msg 
     * @param {string[]} args 
     */
    processCommand(msg, args) {
        let boby_role = msg.guild.roles.cache.find(r => r.id == "772344547925688333");

        if(args[0] == "dequip") {
            msg.guild.members.fetch("657243574995517450")
                .then(boby => {
                    boby.roles.remove(boby_role);
                });
            return;
        }

        if(args[0] == "equip") {
            msg.guild.members.fetch("657243574995517450")
                .then(boby => {
                    boby.roles.add(boby_role);
                });
            return;
        }

        if(args[0].startsWith("#")) {
            let color = args[0];
            boby_role.setColor(color);
            this.log("painted boby role with: ", color);
            
        } else {
            let name = "";
            for(let arg of args) name += arg + " ";
            
            this.log("changed boby role to name:", name);
            boby_role.setName(name.trim());
            return;
        }

            

    }
}

module.exports = BobyRole;