const { Client } = require('@line/bot-sdk');
const config = require('../config');
const { detectIntent } = require('./dialogflow');

const lineClient = new Client({
  channelAccessToken: config.line.channelAccessToken,
  channelSecret: config.line.channelSecret,
});

// ユーザーからのテキストメッセージを処理
async function handleMessage(event) {
  const userMessage = event.message.text;
  const userId = event.source.userId;

  console.log('📩 受信メッセージ:', userMessage);

  try {
    const result = await detectIntent(userMessage, userId);

    const replyText = result.responseText || 'すみません、うまく理解できませんでした。';

    await lineClient.replyMessage(event.replyToken, {
      type: 'text',
      text: replyText,
    });

    console.log('📤 返信メッセージ:', replyText);
  } catch (error) {
    console.error('❌ LINEへの返信中にエラー:', error);

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
