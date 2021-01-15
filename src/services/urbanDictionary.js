const getIntention = require('../core/google/getIntention');
const got = require('got');

/**
 * 
 * @param {require('discord.js').Message} msg 
 */
module.exports = async (msg) =>  {

    message = msg.content;
    if(!message.includes("reimu")) return;

    let res = await getIntention(message);
    let resolvedIntent = res.queryResult.intent.displayName;

    if(resolvedIntent == "Ask Meaning") {
        
        let targetWord = null;

        try {
            targetWord = (res.queryResult.parameters.fields["target-word"].stringValue);
        } catch(e) {
            msg.channel.send('I failed to understand you');
            return;
        }

        let definition = null;

        try {
            let {res_json} = await got.get("http://api.urbandictionary.com/v0/define?term=" + targetWord);
            res_json = JSON.parse(res_json);
            definition = res_json.list[0].definition;

        } catch(e) {
            definition = "couldn't find a definition";

        } finally {
            msg.channel.send(definition);

        }

    }


}