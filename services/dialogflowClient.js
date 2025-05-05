// services/dialogflowClient.js

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const fs = require('fs');
const config = require('../config');

const credentialPath = config.dialogflow.credentialFile;
const credentials = JSON.parse(fs.readFileSync(credentialPath, 'utf8'));

const sessionClient = new dialogflow.SessionsClient({
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  },
  apiEndpoint: 'asia-northeast1-dialogflow.googleapis.com',
});

const projectId = config.dialogflow.projectId;

async function detectIntent(text, sessionId = uuid.v4()) {
  const sessionPath = `projects/${projectId}/locations/asia-northeast1/agent/sessions/${sessionId}`;

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
    intentName: result.intent?.displayName || null,
  };
}

module.exports = {
  detectIntent,
};
