// handlers/dialogflowHandler.js

const express = require('express');
const router = express.Router(); // ← これがなかった！

const { handleTagBasedRouting } = require('../services/dialogflowService');

router.post('/webhook', async (req, res) => {
  try {
    const response = await handleTagBasedRouting(req.body);
    res.json(response);
  } catch (error) {
    console.error('✖ Dialogflow webhook error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
