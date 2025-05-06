// handlers/returns.js
const flexMessages = require('../templates/returns');
const { replyMessage } = require('../services/line-client');

async function handleReturnsIntent(intentName, replyToken) {
  const replies = {
    'returns_request': flexMessages.returnMenu,
    'returns_online': flexMessages.onlineStorePrompt,
    'returns_store': flexMessages.returnStorePolicy,
    'returns_possibility': flexMessages.returnMenu,
  };

  if (replies[intentName]) {
    await replyMessage(replyToken, {
      type: 'flex',
      altText: '返品に関するご案内',
      contents: replies[intentName],
    });
  } else {
    await replyMessage(replyToken, {
      type: 'text',
      text: '返品に関するご案内が見つかりませんでした。'
    });
  }
}

module.exports = { handleReturnsIntent };
