const express = require('express');
const router = express.Router();

require('dotenv').config(); // .envからも読み込み可
const dialogflow = require('@google-cloud/dialogflow');
const { v4: uuidv4 } = require('uuid');

// 認証JSONを環境変数から取得
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

// プロジェクトIDとリージョン（デフォルトは東京）
const projectId = credentials.project_id;
const location = process.env.DIALOGFLOW_LOCATION || 'asia-northeast1';

// セッションクライアント（東京リージョンのAPIエンドポイントを明示）
const sessionClient = new dialogflow.SessionsClient({
  credentials,
  projectId,
  apiEndpoint: `${location}-dialogflow.googleapis.com`,
});

async function detectIntent(userText, sessionId = uuidv4()) {
  // ✅ 明示的にリージョン入りのセッションパスを指定
  const sessionPath = `projects/${projectId}/locations/${location}/agent/sessions/${sessionId}`;

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
