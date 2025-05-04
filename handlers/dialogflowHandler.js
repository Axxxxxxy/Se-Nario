// handlers/dialogflowHandler.js

const express = require('express');
const router = express.Router();

const { handleTagBasedRouting } = require('../services/dialogflow'); // ← 正しいパス！

// Dialogflow からの Webhook リクエストを処理
router.post('/webhook', async (req, res) => {
  try {
    console.log('🧠 Dialogflow Webhook accessed!');
    const response = await handleTagBasedRouting(req.body);
    res.json(response);
  } catch (error) {
    console.error('❌ Dialogflow webhook error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
