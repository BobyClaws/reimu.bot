// Imports the Dialogflow library
const dialogflow = require('@google-cloud/dialogflow');


module.exports = async function getIntention(message) {

    // Instantiates a session client
    const sessionClient = new dialogflow.SessionsClient();
    return executeQueries("hakerui-reimu", "123456789", message, "en");

}

async function executeQueries(projectId, sessionId, query, languageCode) {
    // Keeping the context across queries let's us simulate an ongoing conversation with the bot
    let context;
    let intentResponse;
    try {
        console.log(`Sending Query: ${query}`);
        intentResponse = await detectIntent(
        projectId,
        sessionId,
        query,
        context,
        languageCode
        );
        console.log('Detected intent');
        return intentResponse;
        // Use the context from this response for next queries
        context = intentResponse.queryResult.outputContexts;
    } catch (error) {
        console.log(error);
    }
}

async function detectIntent(
        projectId,
        sessionId,
        query,
        contexts,
        languageCode) {
            
    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
    );

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            },
        },
    };

    if (contexts && contexts.length > 0) {
        request.queryParams = {
        contexts: contexts,
        };
    }

    const responses = await sessionClient.detectIntent(request);
    return responses[0];
}