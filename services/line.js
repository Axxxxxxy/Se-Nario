// services/line.js

const { v4: uuidv4 } = require('uuid');
const { Client } = require('@line/bot-sdk');
const config = require('../config');
const { detectIntent } = require('./dialogflowClient');

const lineClient = new Client({
  channelAccessToken: config.line.channelAccessToken,
  channelSecret: config.line.channelSecret,
});

// line.js内のhandleMessage関数を修正
async function handleMessage(event) {
    const userMessage = event.message.text;
    // ユーザーIDをセッションIDとして使用
    const sessionId = event.source.userId || uuidv4();
    
    try {
      console.log('🔍 メッセージを受信:', userMessage);
      console.log('👤 ユーザーID:', sessionId);
      
      const result = await detectIntent(userMessage, sessionId);
      console.log('🧠 Dialogflow応答:', result.responseText);

    if (userMessage.includes('返品')) {
      // 「返品」というワードがあった場合はクイックリプライを返す
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
