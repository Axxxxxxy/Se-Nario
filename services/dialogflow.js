// services/dialogflow.js

const { makeQuickReply, makeFlexMessage } = require('./line');

// tag に応じて適切なLINEメッセージ形式を返す
async function handleTagBasedRouting(body) {
  const tag = body.fulfillmentInfo?.tag || ''; // Dialogflowから渡されたタグ

  switch (tag) {
    case 'show_return_options':
      return makeQuickReply('返品方法を選択してください', [
        { label: 'オンラインストア', text: 'オンラインストア' },
        { label: '店舗', text: '店舗' },
      ]);

    case 'recommend_products':
      return makeFlexMessage('おすすめ商品', [
        { title: 'TシャツA', imageUrl: 'https://example.com/a.jpg', url: 'https://store.com/a' },
        { title: 'TシャツB', imageUrl: 'https://example.com/b.jpg', url: 'https://store.com/b' }
      ]);

    default:
      return {
        fulfillment_response: {
          messages: [
            {
              text: {
                text: ['申し訳ありません、対応できませんでした。']
              }
            }
          ]
        }
      };
  }
}

module.exports = { handleTagBasedRouting };
