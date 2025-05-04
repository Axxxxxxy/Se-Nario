const express = require('express');
const bodyParser = require('body-parser');
const { handleMessage } = require('./services/line');
const config = require('./config');
const dialogflowHandler = require('./handlers/dialogflowHandler');

const app = express();
app.use(bodyParser.json());

// LINE Webhook受信
app.post('/webhook', async (req, res) => {
  console.log('🔥 LINE Webhook accessed!');
  console.log('📨 受信データ:', JSON.stringify(req.body, null, 2));

  const events = req.body.events;

  if (!events || events.length === 0) {
    console.log('⚠️ イベントが空です');
    return res.status(200).send('No events');
  }

  await Promise.all(
    events.map(async (event) => {
      if (event.type === 'message' && event.message.type === 'text') {
        console.log('📝 テキストメッセージイベントを検出');
        await handleMessage(event);
      } else {
        console.log('🔍 非対応イベント:', event.type);
      }
    })
  );

  res.status(200).send('OK');
});

// Dialogflow Webhook受信用
app.use('/dialogflow', dialogflowHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
