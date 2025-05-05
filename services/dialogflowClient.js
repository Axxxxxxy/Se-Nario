// services/dialogflowClient.js

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const fs = require('fs');
const config = require('../config');

// Render の Secret ファイルパスを読み込み
const credentialPath = config.dialogflow.credentialFile;
const credentials = JSON.parse(fs.readFileSync(credentialPath, 'utf8'));

const sessionClient = new dialogflow.SessionsClient({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    },
    apiEndpoint: 'asia-northeast1-dialogflow.googleapis.com', // 👈 これが重要！
  });

const projectId = config.dialogflow.projectId;

async function detectIntent(text, sessionId = uuid.v4()) {
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text,
        languageCode: config.dialogflow.languageCode || 'ja',
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
