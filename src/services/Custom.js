const Service = require("../core/Service");
const RBot = require("../core/RBot");


class Custom extends Service {
    
    /**
     * 
     * @param {RBot} rbot 
     */
    constructor(rbot) {
        super(rbot);
        this.serviceName = "Custom";
        this.serviceInterval = 100000;
    }


    init() {
 

        // Rex Lapis: 772344547925688333
        // boby: 657243574995517450
        // weebs: 744209392056139938
        
        
        // this.rbot.dClient.guilds.fetch("744209392056139938")
        //     .then((guild) => {
        //         let role = guild.roles.cache.find(r => r.name === "Zhongli");
        //         // guild.members.fetch("657243574995517450")
        //         //     .then(u => {
        //         //         u;
        //         //     });
        //         role.setName("Morax");
                
        //     });

        


        /*
        msg.guild.roles.create({
            data: {
                name: "Zhongli",
                color: "#eca861"
            },
            reason: "created by reimu"
        });
        */

    }

}



module.exports = Custom;