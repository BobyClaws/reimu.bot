const Service = require("../../core/Service");
const fs = require("fs");
const confLoader = require("../../util/confLoader");

class Achievements extends Service {

    constructor(rbot) {
        super(rbot);
        this.serviceName = "Achievements";
        this.serviceInterval = 10000;
        this.achievements = [];
        this.queues = {
            messages: []
        };
    }

    init() {

        this.loadAchievements();

        // setup message event processing
        this.rbot.dClient.on("message", () => {
            // throw message in processing queue
        });
        this.loop();

        // setup other event processing
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

        // for(let achievement of this.achievements) {
        //     this.log("processing achievement: ", achievement.name);
            
        // }

    }


}

module.exports = Achievements;