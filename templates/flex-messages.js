module.exports = {
    returnMenu: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        contents: [
          {
            type: 'text',
            text: 'MENU',
            size: 'sm',
            weight: 'bold',
            color: '#1DB446'
          },
          {
            type: 'text',
            text: 'Brand Name',
            size: 'xxl',
            weight: 'bold'
          },
          {
            type: 'text',
            text: '返品方法をお選びください',
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
    },
  
    onlineStorePrompt: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        contents: [
          {
            type: 'text',
            text: 'MENU',
            size: 'sm',
            weight: 'bold',
            color: '#1DB446'
          },
          {
            type: 'text',
            text: 'Brand Name',
            size: 'xxl',
            weight: 'bold'
          },
          {
            type: 'text',
            text: 'ご注文を特定するため、以下のボタンからログインください',
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
                  label: 'オンラインストアにログイン',
                  text: 'オンラインストアにログイン'
                }
              }
            ]
          }
        ]
      }
    }
  };
  