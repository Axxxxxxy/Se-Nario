require('dotenv').config(); // .envからも読み込み可（Render環境でもOK）
const dialogflow = require('@google-cloud/dialogflow');
const { v4: uuidv4 } = require('uuid');

// 認証JSONの読み取り（Render環境では環境変数から）
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

// 🔑 東京リージョン用のAPIエンドポイントを指定
const sessionClient = new dialogflow.SessionsClient({
  credentials,
  apiEndpoint: 'asia-northeast1-dialogflow.googleapis.com', // ここが重要
});

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
