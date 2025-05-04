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
  const sessionId = uuidv4();

  try {
    const result = await detectIntent(userMessage, sessionId);
    console.log('🧠 Dialogflow応答:', result.responseText);

    // 「返品」が含まれる場合、クイックリプライ表示
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
    } else {
      await lineClient.replyMessage(event.replyToken, {
        type: 'text',
        text: result.responseText || 'すみません、うまく理解できませんでした。',
      });
    }

    console.log('✅ メッセージ送信完了');
  } catch (error) {
    console.error('❌ LINE返信中にエラー:', error);

    await lineClient.replyMessage(event.replyToken, {
      type: 'text',
      text: 'エラーが発生しました。しばらくしてから再度お試しください。',
    });
  }
}

module.exports = {
  lineClient,
  handleMessage,
};
