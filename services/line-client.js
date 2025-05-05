// services/line-client.js

/**
 * LINE Messaging API を利用してメッセージを送信するラッパー関数群
 * replyMessage: ユーザーの発言に対する応答
 * pushMessage: プッシュ通知など任意のタイミングでの送信
 */

const axios = require('axios');
const config = require('../config');

const LINE_API_URL = 'https://api.line.me/v2/bot/message';

/**
 * LINEのReply APIを使ってメッセージを返信
 * @param {string} replyToken - イベントから取得したReply Token
 * @param {object|array} messages - 返信するメッセージ（単体 or 配列）
 */
async function replyMessage(replyToken, messages) {
  return axios.post(`${LINE_API_URL}/reply`, {
    replyToken,
    messages: Array.isArray(messages) ? messages : [messages],
  }, {
    headers: {
      Authorization: `Bearer ${config.LINE_CHANNEL_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

/**
 * 任意のユーザーへPush APIでメッセージを送信
 * @param {string} to - ユーザーID
 * @param {object|array} messages - 送信するメッセージ
 */
async function pushMessage(to, messages) {
  return axios.post(`${LINE_API_URL}/push`, {
    to,
    messages: Array.isArray(messages) ? messages : [messages],
  }, {
    headers: {
      Authorization: `Bearer ${config.LINE_CHANNEL_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

module.exports = { replyMessage, pushMessage };
