// services/line.js

const { Client } = require('@line/bot-sdk');
const config = require('../config');

const lineClient = new Client({
  channelAccessToken: config.line.channelAccessToken,
  channelSecret: config.line.channelSecret,
});

// 現状では Dialogflow detectIntent を使わず、直接メッセージを返す最小構成
async function handleMessage(event) {
  const replyText = 'メッセージを受け取りました：' + event.message.text;

  try {
    await lineClient.replyMessage(event.replyToken, {
      type: 'text',
      text: replyText,
    });
    console.log('✅ メッセージ送信成功:', replyText);
  } catch (error) {
    console.error('❌ LINE返信中にエラー:', error);
  }
}

module.exports = {
  lineClient,
  handleMessage,
};
