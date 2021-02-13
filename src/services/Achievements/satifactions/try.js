const Discord = require("discord.js");


function user(rbot, ach, queues, params) {
    // needs user info
    // fetch one user
    // yada yada resolution tuple

    // generate a user list from all queues (populated by user generated event items)
    let userIds = [];

    for(let message of queues.messages) {
        // TODO: remove duplicates
        userIds.push(message.msg.author);
    }

    for(let userId of userIds) {

        let satisfaction = true;

        if(params.sends_message)
            satisfaction = satisfaction && user7sends_message(ach, userId, queues, params.sends_message);


        if(satisfaction) {
            let shrine = rbot.dClient.channels.cache.find(c => c.id == "794137845182365716");
            shrine.send("done");
    
        }

    }
}


function user7sends_message(achvName, userId, queues, params) {

    // needs message info
    // fetch one unsolved message
    // see if message passed achievement. if so, then
    // solve that message and mark it as "solved"

    let satisfaction;

    // seach for  message not flagged as achieved (with current achievement)
    for(let message of queues.messages) {

  
        // TODO: maintain a cache maybe?
        if((!message.achievements.includes(achvName)) && message.msg.author.id == userId.id) {

            satisfaction = true;

            if(params.with_text) {
                satisfaction = satisfaction && user7sends_message7with_text(achvName, message.msg, params.with_text);
            } else satisfaction = false;


            if(params.gets_reactions) {
                satisfaction = satisfaction && user7sends_message7gets_reactions(achvName, message.msg, params.gets_reactions);
            } else satisfaction = false;

            // mark 
            if(satisfaction) {
                message.achievements.push(achvName);
            }
            

        } else satisfaction = false;

        
    }

    
    return satisfaction;
 

}

function user7sends_message7with_text(ach, msg, param) {

    let satisfaction = true;

    if(msg.content.includes(param)) {
        satisfaction == true;
    } else satisfaction =  false;

    return satisfaction;
}


/**
 * 
 * @param {string} ach 
 * @param {Discord.Message} msg 
 * @param {*} param 
 */
function user7sends_message7gets_reactions(ach, msg, param) {

    let satisfaction = false;

    if(msg.reactions.cache.find( r => r.emoji.name == param))
        satisfaction = true;
   
    return satisfaction;


}


module.exports = user;