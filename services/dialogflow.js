// services/dialogflowClient.js

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const config = require('../config');

// Detect Intent を呼び出す処理
async function detectIntent(text, sessionId) {
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
      text: {
        text,
        languageCode: 'ja',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  return {
    responseText: result.fulfillmentText,
  };
}

module.exports = { detectIntent };
