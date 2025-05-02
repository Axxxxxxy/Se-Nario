const dialogflow = require('@google-cloud/dialogflow');
const { v4: uuidv4 } = require('uuid');
const credentials = require('./credentials.json'); // ← ここで直接読み込み

const sessionClient = new dialogflow.SessionsClient({ credentials });

async function detectIntent(userText, sessionId = uuidv4()) {
  const sessionPath = sessionClient.projectAgentSessionPath(
    credentials.project_id,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userText,
        languageCode: 'ja',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    return {
      intent: result.intent?.displayName || null,
      action: result.action || null,
      parameters: result.parameters?.fields || {},
      responseText: result.fulfillmentText || '',
    };
  } catch (error) {
    console.error('❌ detectIntent エラー:', error);
    throw error;
  }
}

module.exports = { detectIntent };
