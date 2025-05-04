// services/dialogflowClient.js

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

// Render Secret Files対応: JSONファイルは /etc/secrets/ にマウントされる
const CREDENTIALS_PATH = '/etc/secrets/test-linebot-20250503-0637f062f57f.json';
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

// プロジェクトIDもJSONファイルから取得
const projectId = credentials.project_id;

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
