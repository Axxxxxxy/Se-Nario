// handlers/dialogflowHandler.js

const express = require('express');
const router = express.Router();

const { detectIntent } = require('../services/dialogflowClient'); // ✅ 正しいパスと関数

router.post('/webhook', async (req, res) => {
  try {
    console.log('🧠 Dialogflow Webhook accessed!');
    const body = req.body;
    const userMessage = body.queryResult.queryText;
    const sessionId = body.session;

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
