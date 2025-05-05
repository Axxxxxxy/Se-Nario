const returnMenu = {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      spacing: 'md',
      contents: [
        {
          type: 'text',
          text: '返品メニュー',
          size: 'xl',
          weight: 'bold',
          color: '#1DB446',
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
                label: '店舗で返品',
                text: '店舗'
              }
            },
            {
              type: 'button',
              style: 'primary',
              color: '#00C851',
              action: {
                type: 'message',
                label: 'オンラインストアで返品',
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
          text: 'オンライン返品ログイン',
          size: 'xl',
          weight: 'bold',
          color: '#1DB446',
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
                label: 'ログインする',
                uri: 'https://example.com/login'
              }
            }
          ]
        }
      ]
    }
  };
  
  const storeReturnGuide = {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '店舗での返品について',
          weight: 'bold',
          size: 'lg',
          wrap: true
        },
        {
          type: 'text',
          text: '購入店舗へ商品とレシートをお持ちください。詳細は公式サイトをご確認ください。',
          size: 'sm',
          wrap: true,
          margin: 'md'
        }
      ]
    }
  };
  
  module.exports = {
    returnMenu,
    onlineStorePrompt,
    storeReturnGuide
  };
  