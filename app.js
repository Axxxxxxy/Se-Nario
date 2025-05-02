const express = require('express');
const bodyParser = require('body-parser');
const { handleMessage } = require('./services/line');
const config = require('./config');

const app = express();
app.use(bodyParser.json());

// Webhookエンドポイント（LINE Messaging APIからPOSTされるURL）
app.post('/webhook', async (req, res) => {
  // 🔥 Webhookが届いたか確認用ログ
  console.log('🔥 Webhook accessed!');
  console.log('📨 受信データ:', JSON.stringify(req.body, null, 2));

  const events = req.body.events;

  if (!events || events.length === 0) {
    console.log('⚠️ イベントが空です');
    return res.status(200).send('No events');
  }

  // 複数イベントに対応（基本は1つ）
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

// ポートを環境変数またはデフォルト3000で起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
