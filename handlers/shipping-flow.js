// handlers/shipping-flow.js
const shippingMessages = require('../templates/shipping_fee');
const { replyMessage } = require('../services/line-client');

async function handleShippingFlow(intentName, replyToken) {
  const replies = {
    'shipping_fee': shippingMessages,
    // 将来的には以下のように拡張可能
    // 'shipping_time': shippingTimeMessage,
    // 'shipping_tracking': shippingTrackingMessage
  };

  if (replies[intentName]) {
    await replyMessage(replyToken, {
      type: 'flex',
      altText: '送料・配送に関するご案内',
      contents: replies[intentName],
    });
  } else {
    await replyMessage(replyToken, {
      type: 'text',
      text: '送料や配送に関するご案内が見つかりませんでした。'
    });
  }
}

module.exports = { handleShippingFlow };
