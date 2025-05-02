const dialogflow = require('@google-cloud/dialogflow');
const config = require('../config');

let sessionClient;
let credentials;

// 環境変数からJSON文字列を安全に読み込み、セッションクライアントを初期化
function initializeDialogflowClient() {
  if (!config.dialogflow.credentialsJson) {
    throw new Error('❌ Dialogflowの認証情報が設定されていません（GOOGLE_APPLICATION_CREDENTIALS_JSON）');
  }

  try {
    credentials = JSON.parse(config.dialogflow.credentialsJson);
    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

    sessionClient = new dialogflow.SessionsClient({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
      projectId: credentials.project_id,
    });

    console.log('✅ Dialogflow セッションクライアント初期化完了');
  } catch (error) {
    console.error('❌ 認証情報の読み込みに失敗しました:', error);
    throw error;
  }
}

// ユーザーの入力をDialogflowに渡してIntent結果を取得
async function detectIntent(text, sessionId) {
  if (!sessionClient) {
    initializeDialogflowClient();
  }

  const sessionPath = sessionClient.projectAgentSessionPath(
    credentials.project_id,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text,
        languageCode: config.dialogflow.languageCode,
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
    console.error('❌ Dialogflow detectIntent エラー:', error);
    throw error;
  }
}

module.exports = {
  detectIntent,
};
