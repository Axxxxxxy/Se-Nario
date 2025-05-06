const { detectIntent } = require('./dialogflowClient');
const { replyMessage } = require('./line-client');
const { handleReturnsIntent } = require('../handlers/returns-flow');
const { handleShippingFlow } = require('../handlers/shipping-flow');

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

    if (intentName?.startsWith('returns_')) {
      return await handleReturnsIntent(intentName, replyToken);
    }

    if (intentName?.startsWith('shipping_')) {
      return await handleShippingFlow(event, intentName);
    }

    // 該当Intentなし
    await replyMessage(replyToken, {
      type: 'text',
      text: '申し訳ありません、もう一度具体的に教えていただけますか？'
    });

  } catch (err) {
    console.error('❌ Error in handleMessage:', err);
    await replyMessage(replyToken, {
      type: 'text',
      text: 'エラーが発生しました。時間をおいて再度お試しください。'
    });
  }
}

module.exports = { handleMessage };
