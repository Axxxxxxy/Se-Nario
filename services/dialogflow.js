const dialogflow = require('@google-cloud/dialogflow');
require('dotenv').config();

// .envから読み込んだJSONをパースし、改行を復元
const raw = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
if (!raw) throw new Error('❌ GOOGLE_APPLICATION_CREDENTIALS_JSON が未設定です');

let credentials;
try {
  credentials = JSON.parse(raw);
  credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
} catch (err) {
  console.error('❌ 認証JSONのパースに失敗:', err);
  throw err;
}

// Dialogflowセッション初期化
const sessionClient = new dialogflow.SessionsClient({ credentials });

async function detectIntent(userText, sessionId) {
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
