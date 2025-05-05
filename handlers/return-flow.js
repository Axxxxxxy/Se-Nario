// handlers/return-flow.js

const line = require('../services/line');
const flexTemplates = require('../templates/flex-messages');

async function handleReturnFlow(event) {
  const { replyToken, message } = event;
  const userText = message.text.trim();

  if (userText === '返品') {
    await line.replyMessage(replyToken, {
      type: 'flex',
      altText: '返品メニュー',
      contents: flexTemplates.returnMenu
    });
    return true; // 処理済み
  }

  return false; // 他のハンドラに渡す
}

module.exports = { handleReturnFlow };
