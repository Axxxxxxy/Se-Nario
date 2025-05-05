const { v4: uuidv4 } = require('uuid');
const { Client } = require('@line/bot-sdk');
const config = require('../config');
const { detectIntent } = require('./dialogflowClient');
const { handleReturnFlow } = require('../handlers/return-flow');

const lineClient = new Client({
  channelAccessToken: config.line.channelAccessToken,
  channelSecret: config.line.channelSecret,
});

async function handleMessage(event) {
  const userMessage = event.message.text;
  const sessionId = event.source.userId || uuidv4();

  try {
    console.log('🔍 メッセージを受信:', userMessage);
    console.log('👤 ユーザーID:', sessionId);

    // ✅ 「返品」専用フロー（Flexメッセージ表示）
    const isHandled = await handleReturnFlow(event);
    if (isHandled) return;

    // 🧠 通常のDialogflow応答
    const result = await detectIntent(userMessage, sessionId);
    console.log('🧠 Dialogflow応答:', result.responseText);

    await lineClient.replyMessage(event.replyToken, {
      type: 'text',
      text: result.responseText || 'すみません、うまく理解できませんでした。',
    });

    console.log('✅ 通常メッセージ送信完了');
  } catch (error) {
    console.error('❌ LINE返信中にエラー:', JSON.stringify(error.originalError?.response?.data || error, null, 2));

    try {
      await lineClient.replyMessage(event.replyToken, {
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
};
