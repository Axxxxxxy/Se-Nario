// services/line.js

const { detectIntent } = require('./dialogflowClient');
const { replyMessage } = require('./line-client');
const flexMessages = require('../templates/flex-messages');

/**
 * LINEから受信したテキストメッセージをDialogflowへ渡し、Intentごとに処理
 */
async function handleMessage(event) {
  if (event.type !== 'message' || event.message.type !== 'text') return;

  const userMessage = event.message.text;
  const replyToken = event.replyToken;
  const sessionId = event.source.userId;

  try {
    const result = await detectIntent(userMessage, sessionId);
    const intentName = result.intentName;

    const intentHandlers = {
      'returns_request': async () => {
        await replyMessage(replyToken, {
          type: 'flex',
          altText: '返品メニュー',
          contents: flexMessages.returnMenu
        });
      },
      'returns_online': async () => {
        await replyMessage(replyToken, [
          { type: 'text', text: 'オンライン返品にはログインが必要です。' },
          flexMessages.onlineStorePrompt
        ]);
      },
      'returns_store': async () => {
        await replyMessage(replyToken, {
          type: 'text',
          text: '店舗での返品については、最寄りの店舗情報をご確認ください。'
        });
      }
    };

    if (intentName && intentHandlers[intentName]) {
      await intentHandlers[intentName]();
    } else {
      await replyMessage(replyToken, {
        type: 'text',
        text: '申し訳ありません、もう一度具体的に教えていただけますか？'
      });
    }

  } catch (err) {
    console.error('❌ Error in handleMessage:', err);
    await replyMessage(replyToken, {
      type: 'text',
      text: 'エラーが発生しました。時間をおいて再度お試しください。'
    });
  }
}

module.exports = { handleMessage };
