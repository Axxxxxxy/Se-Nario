// templates/flex-messages.js

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
            text: 'メニューをお選びください',
            size: 'sm',
            color: '#888888',
            wrap: true,
            margin: 'none'
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
    }
  };
  