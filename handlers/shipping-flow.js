// handlers/shipping-flow.js
const flexMessages = require('../templates/shipping_fee');
const { replyMessage } = require('../services/line-client');

async function handleShippingFlow(intentName, replyToken) {
  const replies = {
    'shipping_fee': flexMessages,
    // 今後は 'shipping_time': flexMessages.deliveryTime のように追加可能
  };

  if (replies[intentName]) {
    await replyMessage(replyToken, {
      type: 'flex',
      altText: '送料に関するご案内',
      contents: replies[intentName],
    });
  } else {
    await replyMessage(replyToken, {
      type: 'text',
      text: '送料に関するご案内が見つかりませんでした。'
    });
  }
}

module.exports = { handleShippingFlow };
