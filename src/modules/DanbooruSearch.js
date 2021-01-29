const got = require("got");
const FormData = require("form-data");
const cheerio = require("cheerio");
const log = require("../util/log");


class DanboourSearch {

    constructor(rbot) {
        this.rbot = rbot
        this.commandName = "source";
    }

    async processCommand(msg, args) {

        try {

            let url = null;

            if(args.length == 0) {
                let referencedMessage = msg.reference.messageID;
                let message = await msg.channel.messages.fetch(referencedMessage);

                let arr = message.content.trim().split(/ +/);

                for(let maybeURL of arr) {
                    if(maybeURL.startsWith("http")) {
                        log("found: " + maybeURL);
                        url = maybeURL;
                        break;
                    
                    }
                }

                try {

                    if(url == null) {
                        url = message.attachments.first().attachment;
                    }
                } catch(e) {
                    log(e);
                } finally {
                    let x = 0;
                }


            
                log("here url is: " + url);
            } else {
                url = args[0];
            }

            if(url == null) msg.channel.send("[x] no images mentioned, hence:");
            
            (async () => {

                try {

                    let form = new FormData();
                    form.append("url", url);
                    let res = await got.post("https://danbooru.iqdb.org", {
                        body: form
                    });
                    
                    let $ = cheerio.load(res.body);
                    let resultsPage = "https:" + $("a", "#pages")[0].attribs.href;
                    log(resultsPage);

                
                    res = await got.get(resultsPage);

                    $ = cheerio.load(res.body);
                    let result = $("a", "#post-info-source")[0].attribs.href;

                    msg.channel.send("source: " + result);
                
                } catch(e) {
                    log(e);
                    msg.channel.send("[x] possibly couldn't find image");
                } finally {
                    let x = 1;
                }

            })();

        } catch(e) {
            log(e);
            log("[!] unknown error occured");
        } finally {
            let x = 1;
        }

    }

    processInteraction() {}

    processMessage() {}
}

module.exports = DanboourSearch;