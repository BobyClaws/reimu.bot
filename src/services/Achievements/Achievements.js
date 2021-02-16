const Service = require("../../core/Service");
const fs = require("fs");
const confLoader = require("../../util/confLoader");
const user = require("./fulfillments/try");

class Achievements extends Service {

    constructor(rbot) {
        super(rbot);
        this.serviceName = "Achievements";
        this.serviceInterval = 1000;
        this.achievements = [];
        this.queues = {
            messages: []
        };

        // load from the file 
        // if newly created achievement doesnt exists create an entry for it
        this.records = {};

        
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

        // load achievement records. TODO: implement database asap to possibly replace this
        let recordFile = "../data/Achievements/records/records.yml";
        this.records = confLoader.load(recordFile);

        // start service loop
        this.loop();

    }

    loadAchievements() {
        const achievementFiles = fs.readdirSync("../data/Achievements/achievements")
            .filter((file) => file.endsWith(".yml"));
        
        // this.log("found achievements: ", achievementFiles);
        this.log("found achievements:", `[${achievementFiles}]`);

        for (const file of achievementFiles) {
            let achievement = confLoader.load(`../data/Achievements/achievements/${file}`);
            this.achievements.push(achievement);
        }
    }

    loop() {


        this.log("current messages in queue:", this.queues.messages.length);
        if(this.queues.messages.length == 0) return;
        

        for(let achievement of this.achievements) {
            this.log("... ");
            user(this, achievement, this.queues, achievement.user);
        }

        // flush message queue after expiry (1hr for now)
        while(this.queues.messages[0] && this.queues.messages[0].expiry < new Date()) {
            this.log("flushing message due to expiry:", this.queues.messages[0].id);
            this.queues.messages.shift();
            this.log("done, reamaining messages left:", this.queues.messages.length);
            
        }

        // persist records
        let recordFile = "../data/Achievements/records/records.yml";
        confLoader.save(recordFile, this.records);


    }


}

module.exports = Achievements;