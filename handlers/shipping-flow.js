const { shippingFee } = require('../templates/shipping_fee');
const { replyFlexMessage } = require('../services/line');

/**
 * intentごとの個別ハンドラー
 */
const intentHandlers = {
  shipping_fee: async (event) => {
    await replyFlexMessage(event.replyToken, shippingFee);
  },

  // 例: delivery_time, tracking_info など将来追加可能
};

/**
 * 配送カテゴリのIntentを処理
 * @param {object} event - LINE webhook event
 * @param {string} intent - DialogflowからのIntent名
 */
const handleShippingFlow = async (event, intent) => {
  try {
    if (intentHandlers[intent]) {
      await intentHandlers[intent](event);
    } else {
      console.warn(`[ShippingFlow] 未対応のIntentが渡されました: ${intent}`);
    }
  } catch (error) {
    console.error(`[ShippingFlow] 処理中にエラーが発生しました: ${error.message}`);
  }
};

module.exports = { handleShippingFlow };
