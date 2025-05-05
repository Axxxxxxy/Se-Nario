const returnMenu = {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      spacing: 'md',
      contents: [
        {
          type: 'text',
          text: 'Brand Name',
          size: 'xl',
          weight: 'bold',
          color: '#444444',
          wrap: true
        },
        {
          type: 'text',
          text: '返品・交換の問い合わせですね。どちらで購入いただいた商品ですか？',
          size: 'sm',
          color: '#888888',
          wrap: true
        },
        {
          type: 'separator',
          margin: 'lg'
        },
        {
          type: 'box',
          layout: 'vertical',
          spacing: 'xl',
          margin: 'xl',
          contents: [
            {
              type: 'button',
              style: 'primary',
              color: '#00C851',
              action: {
                type: 'message',
                label: '店舗',
                text: '店舗'
              }
            },
            {
              type: 'button',
              style: 'primary',
              color: '#00C851',
              action: {
                type: 'message',
                label: 'オンラインストア',
                text: 'オンラインストア'
              }
            }
          ]
        }
      ]
    }
  };
  
  const onlineStorePrompt = {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      spacing: 'md',
      contents: [
        {
          type: 'text',
          text: 'Brand Name',
          size: 'xl',
          weight: 'bold',
          color: '#444444',
          wrap: true
        },
        {
          type: 'text',
          text: 'ご注文を特定するため、以下のボタンからログインください。',
          size: 'sm',
          color: '#888888',
          wrap: true
        },
        {
          type: 'separator',
          margin: 'lg'
        },
        {
          type: 'box',
          layout: 'vertical',
          spacing: 'xl',
          margin: 'xl',
          contents: [
            {
              type: 'button',
              style: 'primary',
              color: '#00C851',
              action: {
                type: 'uri',
                label: 'オンラインにログインする',
                uri: 'https://example.com/login'
              }
            }
          ]
        }
      ]
    }
  };
  
  module.exports = {
    returnMenu,
    onlineStorePrompt
  };
  