// services/dialogflowClient.js

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const path = require('path');
const config = require('../config');

// 認証情報のパス
const CREDENTIALS_PATH = path.join(__dirname, '..', config.dialogflow.credentialFile);

const projectId = config.dialogflow.projectId;

const credentials = require(CREDENTIALS_PATH);

const sessionClient = new dialogflow.SessionsClient({
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  },
});

async function detectIntent(text, sessionId = uuid.v4()) {
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

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

module.exports = {
  detectIntent,
};
