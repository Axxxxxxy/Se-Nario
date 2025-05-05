const { detectIntent } = require('./dialogflowClient');
const { replyMessage } = require('./line');
const flexMessages = require('../templates/flex-messages');

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
          contents: flexTemplates.returnMenu
        });
      },
      'returns_online': async () => {
        await replyMessage(replyToken, [
          { type: 'text', text: 'オンライン返品にはログインが必要です。' },
          flexTemplates.onlineStorePrompt
        ]);
      },
      'returns_store': async () => {
        await replyMessage(replyToken, {
          type: 'text',
          text: '店舗での返品については、最寄りの店舗情報をご確認ください。'
        });
      }
    };

    if (intentHandlers[intentName]) {
      await intentHandlers[intentName]();
    } else {
      // fallback
      await replyMessage(replyToken, {
        type: 'text',
        text: '申し訳ありません、もう一度具体的に教えていただけますか？'
      });
    }
  } catch (err) {
    console.error('Error handling message:', err);
    await replyMessage(replyToken, {
      type: 'text',
      text: 'エラーが発生しました。時間をおいて再度お試しください。'
    });
  }
}

module.exports = { handleMessage };
