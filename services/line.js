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
            '【店舗での返品についてのご案内】\n\n' +
            '以下の内容をご確認の上、お近くの店舗までお越しください。\n\n' +
            '■ 返品方法\n' +
            '・ご購入いただいた商品とレシートをお持ちのうえ、店舗スタッフにお声がけください。\n' +
            '・返品対応は、ご購入から14日以内が対象となります。\n\n' +
            '■ 返品の条件\n' +
            '・未使用・未着用の商品に限ります。\n' +
            '・タグや付属品がある場合は、すべて揃っている必要があります。\n' +
            '・以下の商品は返品をお受けできません：\n' +
            '　- セール品\n' +
            '　- アクセサリー類\n' +
            '　- 福袋やセット商品\n' +
            '　- 衛生用品（インナー・マスク等）\n\n' +
            '■ ご確認事項\n' +
            '・返金方法は、購入時の決済方法により異なります。\n' +
            '・商品に不備があった場合は、その旨をスタッフにお伝えください。\n\n' +
            '■ ご持参いただくもの\n' +
            '・購入商品\n' +
            '・購入時のレシートまたは購入証明\n' +
            '・商品に同梱されていた付属品（タグ、箱など）\n\n' +
            'ご不明な点がございましたら、店舗スタッフまたはお問い合わせ窓口までご連絡ください。'
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
