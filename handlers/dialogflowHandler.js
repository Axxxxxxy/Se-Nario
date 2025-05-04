// handlers/dialogflowHandler.js

const express = require('express');
const router = express.Router();
const { detectIntent } = require('../services/dialogflowClient');

// Dialogflow からの Webhook リクエストを処理
router.post('/webhook', async (req, res) => {
  console.log('🧠 Dialogflow Webhook accessed!');
  const body = req.body;

  // 安全に queryText を取得
  const userMessage = body?.queryResult?.queryText;
  const sessionId = body?.session || 'default-session';

  // 構造が不正な場合はログに出す
  if (!userMessage) {
    console.error('❌ Invalid Dialogflow Webhook Format:', JSON.stringify(body, null, 2));
    return res.status(400).send('Invalid Dialogflow Webhook Payload');
  }

  try {
    const result = await detectIntent(userMessage, sessionId);
    const replyText = result.responseText || 'すみません、うまく理解できませんでした。';

    res.json({
      fulfillmentText: replyText,
    });
  } catch (error) {
    console.error('❌ Dialogflow webhook error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
