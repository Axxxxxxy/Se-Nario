// services/line.js

const { v4: uuidv4 } = require('uuid');
const { Client } = require('@line/bot-sdk');
const config = require('../config');
const { detectIntent } = require('./dialogflowClient');

const lineClient = new Client({
  channelAccessToken: config.line.channelAccessToken,
  channelSecret: config.line.channelSecret,
});

// 🔁 replyMessage を個別関数として定義・エクスポート
const replyMessage = async (token, messages) => {
  return lineClient.replyMessage(token, Array.isArray(messages) ? messages : [messages]);
};

// 📩 LINEからのメッセージ受信処理
async function handleMessage(event) {
  const userMessage = event.message.text;
  const sessionId = event.source.userId || uuidv4();

  try {
    console.log('🔍 メッセージを受信:', userMessage);
    console.log('👤 ユーザーID:', sessionId);

    // ✅ return-flow に処理を委譲
    const { handleReturnFlow } = require('../handlers/return-flow');
    const isHandled = await handleReturnFlow(event);
    if (isHandled) return;

    // 🧠 Dialogflow処理
    const result = await detectIntent(userMessage, sessionId);
    console.log('🧠 Dialogflow応答:', result.responseText);

    await replyMessage(event.replyToken, {
      type: 'text',
      text: result.responseText || 'すみません、うまく理解できませんでした。',
    });

    console.log('✅ 通常メッセージ送信完了');
  } catch (error) {
    console.error('❌ LINE返信中にエラー:', JSON.stringify(error.originalError?.response?.data || error, null, 2));

    try {
      await replyMessage(event.replyToken, {
        type: 'text',
        text: 'エラーが発生しました。しばらくしてから再度お試しください。',
      });
    } catch (fallbackError) {
      console.error('❌ フォールバックメッセージ送信失敗:', JSON.stringify(fallbackError, null, 2));
    }
  }
}

module.exports = {
  lineClient,
  handleMessage,
  replyMessage // ✅ ここを忘れずにエクスポート
};
