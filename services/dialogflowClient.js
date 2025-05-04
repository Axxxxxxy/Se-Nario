const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const config = require('../config');

async function detectIntent(userMessage, sessionId) {
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: config.dialogflow.keyFilename,
  });

  const sessionPath = sessionClient.projectAgentSessionPath(
    config.dialogflow.projectId,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: { text: userMessage, languageCode: 'ja' },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  return {
    responseText: result.fulfillmentText,
  };
}

module.exports = { detectIntent };
