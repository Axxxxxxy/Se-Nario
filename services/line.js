// services/line.js

const { detectIntent } = require('./dialogflowClient');
const { replyMessage } = require('./line-client');
const flexMessages = require('../templates/flex-messages');

async function handleMessage(event) {
  if (event.type !== 'message' || event.message.type !== 'text') return;

  const userMessage = event.message.text;
  const replyToken = event.replyToken;
  const sessionId = event.source.userId;

  try {
    const result = await detectIntent(userMessage, sessionId);
    const intentName = result.intentName;

    console.log('📝 ユーザー入力:', userMessage);
    console.log('🎯 Dialogflow Intent名:', intentName);

    const intentHandlers = {
      'returns_request': async () => {
        await replyMessage(replyToken, {
          type: 'flex',
          altText: '返品メニュー',
          contents: flexMessages.returnMenu
        });
      },
      'returns_online': async () => {
        await replyMessage(replyToken, {
          type: 'flex',
          altText: 'オンライン返品のご案内',
          contents: flexMessages.onlineStorePrompt
        });
      },
'returns_store': async () => {
  await replyMessage(replyToken, {
    type: 'text',
    text:
      '【店舗での返品について】\n\n' +
      '以下をご確認の上、14日以内に商品とレシートをご持参ください。\n\n' +
      '🔸返品条件\n' +
      '・未使用・未着用\n' +
      '・タグ・付属品あり\n' +
      '・対象外：セール品、アクセ類、福袋、衛生用品\n\n' +
      '🔸返金について\n' +
      '・決済方法により異なります\n' +
      '・不備がある場合はスタッフへ\n\n' +
      '🔸持ち物チェック\n' +
      '・商品\n' +
      '・レシート or 購入証明\n' +
      '・タグ・箱など付属品\n\n' +
      'ご不明点は店舗スタッフまでお気軽にご相談ください。'
  });
},
      'returns_possibility': async () => {
        await replyMessage(replyToken, {
          type: 'flex',
          altText: '返品メニュー',
          contents: flexMessages.returnMenu
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
