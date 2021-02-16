const getIntention = require("../core/google/getIntention");
const Module = require("../core/Module");

const got = require("got");


class UrbanDictionary extends Module {


    constructor(rbot) {
        super(rbot);
        this.commandName = null;
        this.disabled = true;
    }


    processMessage(msg) {
    
        (async () => {

            let query = msg.content;
            
            if(!query.includes("reimu")) return;
            if(query.startsWith("reimu")) {


                let res = await getIntention(query.slice(6));
                let resolvedIntent = res.queryResult.intent.displayName;
                console.log(resolvedIntent);

                if(res.queryResult.action.startsWith("smalltalk")) {
                    msg.channel.send(res.queryResult.fulfillmentMessages[0].text.text[0]);
                    return;
                }
            }



            let res = await getIntention(query);
            let resolvedIntent = res.queryResult.intent.displayName;
            console.log(resolvedIntent);

            if(resolvedIntent == "asks meaning") {
                
                let targetWord = null;

                try {
                    targetWord = (res.queryResult.parameters.fields["target-word"].stringValue);
                } catch(e) {
                    msg.channel.send("I failed to understand you");
                    return;
                }

                let definition = null;

                try {
                    let {body} = await got.get("http://api.urbandictionary.com/v0/define?term=" + targetWord);
                    let res = JSON.parse(body);
                    definition = res.list[0].definition;

                } catch(e) {
                    definition = "couldn't find a definition for: " + targetWord;

                } finally {
                    msg.channel.send(definition);

                }

            } else if(resolvedIntent == "asks a joke") {
                msg.channel.send("you, you are a joke");
            }

        })();
    
            
    }



}

module.exports = UrbanDictionary;