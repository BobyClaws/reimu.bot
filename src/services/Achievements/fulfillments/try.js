const Discord = require("discord.js");
const Service = require("../../../core/Service");

/**
 * 
 * @param {Service} svc 
 * @param {*} achievement 
 * @param {*} queues 
 */
function user(svc, achievement, queues) {

    let achvName = achievement.name;
    let params = achievement.user;

    // needs user info
    // fetch one user
    
    // generate a user list from all queues (that are populated by user generated event items)
    let users = [];

    for(let message of queues.messages) {
        // TODO: remove duplicates
        if(!users.includes(message.msg.author))
            users.push(message.msg.author);
        
    }

    for(let user of users) {

        let satisfaction = true;

        if(params.sends_message)
            satisfaction = satisfaction && user_sendsMessage(achvName, user, queues, params.sends_message);


        if(satisfaction) {

            let shrine = svc.rbot.dClient.channels.cache.find(c => c.id == "744622961599840317");

            // add achivement to records if doesnt exist.
            if(!svc.records[achvName])
                svc.records[achvName] =  {
                    "achievers": {},
                    "description": achievement.description,
                    "count": achievement.count
                };

            // add user to achievement if doesnt exist.
            if(!svc.records[achvName]["achievers"][user.username]) {
                svc.records[achvName]["achievers"][user.username] = 0;
            }

            if(svc.records[achvName]["achievers"][user.username] < achievement.count)
                svc.records[achvName]["achievers"][user.username]++;

            if(svc.records[achvName]["achievers"][user.username] == achievement.count) {
                let embed = new Discord.MessageEmbed();
                let name = `${achvName}  [${svc.records[achvName]["achievers"][user.username]}/${achievement.count}]`;
    
                embed.setAuthor(`${user.username}`, user.avatarURL());
                embed.addField(name, achievement.description);
                embed.setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/10____px-Star_icon_stylized.svg.png");
                embed.setFooter("Achievement Unlocked!");
                embed.setColor("FF9952");
                shrine.send(`<@${user.id}>`, {embed: embed});

                // so that it doesnt trigger everytime
                // TODO: improve this so it skips all the satisfaction completely if its already done.
                svc.records[achvName]["achievers"][user.username]++;
            }


    
        }

    }
}


function user_sendsMessage(achvName, user, queues, params) {

    // needs message info
    // fetch one unsolved message
    // see if message passed achievement. if so, then
    // solve that message and mark it as "solved"

    let satisfaction;

    // seach for  message not flagged as achieved (with current achievement)
    for(let message of queues.messages) {

  
        // TODO: maintain a cache maybe?
        if((!message.achievements.includes(achvName)) && message.msg.author.id == user.id) {

            satisfaction = true;

            if(params.with_text) {
                satisfaction = satisfaction && user_sendsMessage_withText(achvName, message.msg, params.with_text);
            }


            if(params.gets_reactions) {
                satisfaction = satisfaction && user_sendsMessage_getsReactions(achvName, message.msg, params.gets_reactions);
            } 

            // mark 
            if(satisfaction) {
                message.achievements.push(achvName);
            }
            

        } else satisfaction = false;

        
    }

    
    return satisfaction;
 

}

function user_sendsMessage_withText(ach, msg, param) {

    let satisfaction = true;

    if(msg.content.includes(param)) {
        satisfaction == true;
    } else satisfaction =  false;

    return satisfaction;
}



function user_sendsMessage_getsReactions(ach, msg, params) {

    let satisfaction = true;


    for(let param in params) {
        param = params[param];

        if(msg.reactions.cache.filter(
            r => r.emoji.name == param.with_name && r.count == param.with_count
        ).size > 0) {
            console.log("test");
            continue;

        } else {
            satisfaction = false;
            break;
        }

    }

    return satisfaction;
}


module.exports = user;