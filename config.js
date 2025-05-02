require('dotenv').config();

module.exports = {
  line: {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
  },
  dialogflow: {
    credentialsJson: process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON, // 環境変数で渡す（JSON形式）
    languageCode: 'ja', // 日本語対応
  },
  app: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
  },
};
