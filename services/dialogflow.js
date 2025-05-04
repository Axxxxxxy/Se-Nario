// handlers/dialogflowHandler.js

const express = require('express');
const router = express.Router(); // ← 必ず必要！

const { handleTagBasedRouting } = require('../services/dialogflowService');

// Dialogflow ES/CX からの Webhook リクエストを受け取り、タグに応じて分岐
router.post('/webhook', async (req, res) => {
  try {
    const response = await handleTagBasedRouting(req.body);
    res.json(response);
  } catch (error) {
    console.error('❌ Dialogflow webhook error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
