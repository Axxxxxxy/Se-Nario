// app.js

const express = require('express');
const bodyParser = require('body-parser');
const { handleMessage } = require('./services/line'); // ✅ dialogflowHandler削除、line.jsに統合

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const events = req.body.events;
  if (!events || !Array.isArray(events)) {
    return res.status(400).send('Invalid request');
  }

  for (const event of events) {
    if (event.type === 'message' && event.message.type === 'text') {
      await handleMessage(event);
    }
  }

  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
