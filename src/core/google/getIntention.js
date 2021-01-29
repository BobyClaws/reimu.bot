// Imports the Dialogflow library
const dialogflow = require("@google-cloud/dialogflow");
const log = require("../../util/log");

// Instantiates a session client
const sessionClient = new dialogflow.SessionsClient();

module.exports = async function getIntention(message) {
    return executeQueries(message);
};

async function executeQueries(query) {
    
    // Keeping the context across queries let's us simulate an ongoing conversation with the bot
    let intentResponse;
    try {
        log(`Sending Query: ${query}`);
        intentResponse = await detectIntent(query);

        log("Detected intent");
        return intentResponse;
        // Use the context from this response for next queries
        //context = intentResponse.queryResult.outputContexts;
    } catch (error) {
        log(error);
    }
}

async function detectIntent(query) {
      
    let contexts = null;
    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.projectAgentSessionPath(
        "hakerui-reimu", // projectId
        "123456789", // sessionId
    );


    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: "en"
            },
        },
    };

    // append contexts if available
    if (contexts && contexts.length > 0) {
        request.queryParams = {
            contexts: contexts,
        };
    }

    const responses = await sessionClient.detectIntent(request);
    return responses[0];

}