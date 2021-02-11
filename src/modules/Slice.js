const Module = require("../core/Module");
const RBot = require("../core/RBot");
const Discord = require("discord.js");
const fs = require("fs");
const { exec } = require("child_process");

class Slice extends Module {

    /**
     * @param {RBot} rbot
     */
    constructor(rbot) {
        super(rbot);
        this.commandName = "slice";
    }


    /**
     * 
     * @param {Discord.Message} msg
     * @param {string[]} args
     */
    processCommand(msg, args) {
        
        let member = msg.mentions.members.first();
        let url = member.user.displayAvatarURL();
        
        if(url.endsWith(".webp")) {
            url = url.slice(0,-5) + ".png";
        }

        this.log("got url:", url);
        fs.writeFileSync("all/source/source_url.txt", url);

        exec("./all/process.sh",
            {shell: "/bin/bash"},
            (err, stdout, stderr) => {
                if (err) console.error(err);
                if (stderr) console.log(stderr);
                if (stdout) console.log(stdout);

                msg.channel.send("here", {files: ["all/out/final.gif"]});
                

            }
        );
    }


}

module.exports = Slice;