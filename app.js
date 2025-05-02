const express = require('express');
const bodyParser = require('body-parser');
const { handleMessage } = require('./services/line');
const config = require('./config');

const app = express();
app.use(bodyParser.json());

// Webhookエンドポイント（LINE Messaging APIからPOSTされるURL）
app.post('/webhook', async (req, res) => {
  const events = req.body.events;

  if (!events || events.length === 0) {
    return res.status(200).send('No events');
  }

  // 複数イベントに対応（基本は1つ）
  await Promise.all(
    events.map(async (event) => {
      if (event.type === 'message' && event.message.type === 'text') {
        await handleMessage(event);
      }
    })
  );

  res.status(200).send('OK');
});

// ポートを環境変数またはデフォルト3000で起動
const PORT = config.app.port;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
