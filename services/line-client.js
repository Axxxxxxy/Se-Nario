// services/line-client.js

const axios = require('axios');
const config = require('../config');

const LINE_API_URL = 'https://api.line.me/v2/bot/message';

/**
 * LINEのReply APIを使ってメッセージを返信
 */
async function replyMessage(replyToken, messages) {
  return axios.post(`${LINE_API_URL}/reply`, {
    replyToken,
    messages: Array.isArray(messages) ? messages : [messages],
  }, {
    headers: {
      Authorization: `Bearer ${config.line.channelAccessToken}`,
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Push APIで任意のユーザーにメッセージ送信
 */
async function pushMessage(to, messages) {
  return axios.post(`${LINE_API_URL}/push`, {
    to,
    messages: Array.isArray(messages) ? messages : [messages],
  }, {
    headers: {
      Authorization: `Bearer ${config.line.channelAccessToken}`,
      'Content-Type': 'application/json',
    },
  });
}

module.exports = { replyMessage, pushMessage };
