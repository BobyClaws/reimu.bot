const Service = require("../../core/Service");
const fs = require("fs");
const confLoader = require("../../util/confLoader");
const user = require("./satifactions/try");

class Achievements extends Service {

    constructor(rbot) {
        super(rbot);
        this.serviceName = "Achievements";
        this.serviceInterval = 1000;
        this.achievements = [];
        this.queues = {
            messages: []
        };
    }

    init() {

        this.loadAchievements();

        // load modules (user.message etc.,)

        // setup message event processing
        this.rbot.dClient.on("message", (msg) => {
            /* throw message in processing queue */
            
            this.log(msg.channel.name);

            if(msg.channel.name == "hakerui-shrine") {
                // generate expiry date
                let expiry = new Date();
                expiry.setMinutes(expiry.getMinutes() + 1);
                
                this.queues.messages.push({
                    "id": msg.id,
                    "msg": msg,
                    "expiry": expiry,
                    "achievements": []
                });
            }



        });


        // setup other event processing here

        // start service loop
        this.loop();

    }

    loadAchievements() {
        const achievementFiles = fs.readdirSync("services/Achievements/achievements")
            .filter((file) => file.endsWith(".yml"));
        
        // this.log("found achievements: ", achievementFiles);
        this.log("found achievements:", `[${achievementFiles}]`);

        for (const file of achievementFiles) {
            let achievement = confLoader.load(`services/Achievements/achievements/${file}`);
            this.achievements.push(achievement);
        }
    }

    loop() {

        this.log("queue length:", this.queues.messages.length);
        if(this.queues.messages.length == 0) return;
        

        for(let achievement of this.achievements) {
            this.log("processing achievement: ", achievement.name);
            user(this.rbot, achievement.name, this.queues, achievement.user);
            
               
            
        }

        /*/ flush message queue after expiry (1hr for now)
        while(this.queues.messages[0] && this.queues.messages[0].expiry < new Date()) {
            this.log("flushing message due to expiry:", this.queues.messages[0].id);
            this.queues.messages.shift();
            this.log("done, reamaining messages left:", this.queues.messages.length);
            
        } */


    }


}

module.exports = Achievements;