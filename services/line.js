const { v4: uuidv4 } = require('uuid');
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

  // 公式仕様に従い、毎回ランダムなセッションIDを生成
  const sessionId = uuidv4();

  console.log('📩 受信メッセージ:', userMessage);
  console.log('🆔 セッションID:', sessionId);

  try {
    const result = await detectIntent(userMessage, sessionId);

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
