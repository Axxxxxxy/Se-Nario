// services/line.js

/**
 * DialogflowのIntentに応じてLINEへFlexメッセージまたはテキストを返信
 * handleMessage: webhookイベントの処理を行うエントリポイント
 */

const { detectIntent } = require('./dialogflowClient');
const { replyMessage } = require('./line-client'); // ← 分離された送信モジュール
const flexMessages = require('../templates/flex-messages');

async function handleMessage(event) {
  // 受信イベントがテキストメッセージ以外ならスキップ
  if (event.type !== 'message' || event.message.type !== 'text') return;

  const userMessage = event.message.text;
  const replyToken = event.replyToken;
  const sessionId = event.source.userId;

  try {
    // DialogflowからIntent判定結果を取得
    const result = await detectIntent(userMessage, sessionId);
    const intentName = result.intentName;

    // Intent名に応じた応答処理の定義
    const intentHandlers = {
      'returns_request': async () => {
        await replyMessage(replyToken, {
          type: 'flex',
          altText: '返品メニュー',
          contents: flexMessages.returnMenu
        });
      },
      'returns_online': async () => {
        await replyMessage(replyToken, [
          { type: 'text', text: 'オンライン返品にはログインが必要です。' },
          flexMessages.onlineStorePrompt
        ]);
      },
      'returns_store': async () => {
        await replyMessage(replyToken, {
          type: 'text',
          text: '店舗での返品については、最寄りの店舗情報をご確認ください。'
        });
      }
    };

    // Intentが定義されていれば実行、それ以外はフォールバック
    if (intentHandlers[intentName]) {
      await intentHandlers[intentName]();
    } else {
      await replyMessage(replyToken, {
        type: 'text',
        text: '申し訳ありません、もう一度具体的に教えていただけますか？'
      });
    }

  } catch (err) {
    // エラー時の共通応答処理
    console.error('Error handling message:', err);
    await replyMessage(replyToken, {
      type: 'text',
      text: 'エラーが発生しました。時間をおいて再度お試しください。'
    });
  }
}

module.exports = { handleMessage };
