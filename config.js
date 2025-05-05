require('dotenv').config();

module.exports = {
  line: {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
  },
  dialogflow: {
    projectId: 'test-linebot-20250503', // ✅ あなたの Dialogflow ES プロジェクトID
    credentialFile: '/etc/secrets/test-linebot-20250503-0637f062f57f.json', // ✅ ファイル名を追加
    languageCode: 'ja',
  },
  app: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
  },
};
