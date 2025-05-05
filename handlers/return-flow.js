// handlers/return-flow.js

const { replyMessage } = require('../services/line');
const flexTemplates = require('../templates/flex-messages');

async function handleReturnFlow(event) {
  const { replyToken, message } = event;
  const userText = message.text.trim();

  if (userText === '返品') {
    await replyMessage(replyToken, {
      type: 'flex',
      altText: '返品メニュー',
      contents: flexTemplates.returnMenu
    });
    return true;
  }

  return false;
}

module.exports = { handleReturnFlow };
