/*

 * overview: module that manages user commands
 * description: a user command gives a text response to a command triggered by user
 * ex: when user types n.hello, nano says "hello"
 */

const confLoader = require("../util/confLoader");
const Module = require("../core/Module");



class UserCommands extends Module {


    constructor(rbot) {
        super(rbot);
        this.commandName = "command";
    }
    
    processCommand(msg, args) {
        this.msg = msg;
        if(args > 2) return;
        if(args[0] == "add") this.addUserCommand(args);
        if(args[0] == "remove") this.removeUserCommand(args);
        if(args[0] == "list") this.listUserCommands();
    }

    processMessage(msg) {
        this.msg = msg;
   
        if(msg.content.endsWith("!")) {
            this.respond(msg.content);
        }
        
    }

    addUserCommand(args) {
        // add command here
        // TODO: create a database service under core
        // IDEA: each service has its own table in sqlite
        console.log("user command added");
        let commands = confLoader.load("../data/commands.yml");

        commands[args[1]] = args[2];
        console.log(args[1] + " " + args[2]);
        confLoader.save("../data/commands.yml", commands);
    }

    removeUserCommand() {
        // remove command here 
    }

    listUserCommands() {
        // list all commands if no user specified

        // list commands of a specified user

    }

    respond(commandName) {
        let commands = confLoader.load("../data/commands.yml");

        let commandValue = commands[commandName];
        if(commandValue) this.msg.channel.send(commandValue);

    }
}



module.exports = UserCommands;