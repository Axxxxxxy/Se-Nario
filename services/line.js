// services/line.js

const { v4: uuidv4 } = require('uuid');
const { Client } = require('@line/bot-sdk');
const config = require('../config');
const { detectIntent } = require('./dialogflowClient');

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

    // ✅ 先に「返品」を即時返信
    if (userMessage.includes('返品')) {
      await lineClient.replyMessage(event.replyToken, {
        type: 'text',
        text: '返品方法を選択してください：',
        quickReply: {
          items: [
            {
              type: 'action',
              action: {
                type: 'message',
                label: 'オンラインストア',
                text: 'オンラインストア',
              },
            },
            {
              type: 'action',
              action: {
                type: 'message',
                label: '店舗',
                text: '店舗',
              },
            },
          ],
        },
      });
      console.log('✅ クイックリプライ送信完了');
      return; // ← これでDialogflow呼び出しをスキップ
    }

    // 通常のDialogflow処理
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
