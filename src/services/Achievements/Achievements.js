const Service = require("../../core/Service");
const log = require("../../util/log");
const fs = require("fs");
const confLoader = require("../../util/confLoader");

class Achievements extends Service {

    constructor(rbot) {
        super(rbot);
        this.serviceName = "Achievements";
        this.serviceInterval = 10000;
        this.achievements = [];
    }

    init() {

        this.loadAchievements();

        // setup message processing
        this.rbot.dClient.on("message", () => {

        });
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
        
    }


}

module.exports = Achievements;