// TODO: command processor would be good?
const log = require("../util/log");
const fs = require("fs");
const RBot = require("./RBot");

class ServiceManager {

    /**
     * 
     * @param {RBot} rbot 
     */
    constructor(rbot) {
       this.rbot = rbot; 
    
    }


    loadServices() {
        /* service can be defined as a file or folder, for example:
         * services/ExampleService.js (or)
         * services/ExmapleService/ExampleService.js
         */

        // look for services as files
        let serviceFiles = fs.readdirSync("services")
            .filter((file) => file.endsWith(".js"));
        // look for services as folders
        let moreServiceFiles = fs.readdirSync("services", { withFileTypes: true })
            .filter(dir => dir.isDirectory())
            .map(dir => dir.name + "/" + dir.name + ".js");

        serviceFiles = serviceFiles.concat(moreServiceFiles);

        log("found services: ", serviceFiles);

        for (const file of serviceFiles) {
            log("loading service: " + file);
            let serviceClass = require(`../services/${file}`);
            let service = new serviceClass(this.rbot);
            log("Done.");
            this.rbot.services.push(service);
        }

    }


    setupServices() {
        log("setting up services");
        for(let service of this.rbot.services) {
            service.init();
            setInterval(service.loop.bind(service), service.serviceInterval);
            
        }
    }




    start() {
        this.loadServices();
        this.setupServices();
    }
}

module.exports = ServiceManager;