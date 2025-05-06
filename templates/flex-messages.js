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
  
  const returnStorePolicy = {
    "type": "bubble",
    "size": "mega",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "店舗の返品・交換について",
          "weight": "bold",
          "size": "lg",
          "align": "center",
          "margin": "xs"
        },
        {
          "type": "text",
          "text": "商品ご購入日から14日以内に、商品と購入証明をご持参ください。",
          "wrap": true,
          "size": "xs",
          "margin": "lg"
        },
        {
          "type": "separator",
          "margin": "xl",
          "color": "#DDDDDD"
        },
        {
          "type": "text",
          "text": "【返金について】",
          "weight": "bold",
          "size": "xs",
          "margin": "lg"
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [
            { "type": "text", "text": "・", "size": "xs" },
            {
              "type": "text",
              "text": "決済方法により返金方法が異なります",
              "size": "xs",
              "wrap": true,
              "flex": 18
            }
          ],
          "spacing": "none",
          "margin": "sm"
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [
            { "type": "text", "text": "・", "size": "xs" },
            {
              "type": "text",
              "text": "商品状態や不良の有無により対応方法が変わる場合があります",
              "size": "xs",
              "wrap": true,
              "flex": 18
            }
          ],
          "spacing": "none",
          "margin": "sm"
        },
        {
          "type": "text",
          "text": "【お持ちいただくもの】",
          "weight": "bold",
          "size": "xs",
          "margin": "lg"
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [
            { "type": "text", "text": "・", "size": "xs" },
            {
              "type": "text",
              "text": "返品、交換する対象商品",
              "size": "xs",
              "wrap": true,
              "flex": 18
            }
          ],
          "spacing": "none",
          "margin": "sm"
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [
            { "type": "text", "text": "・", "size": "xs" },
            {
              "type": "text",
              "text": "購入時のレシート（紙または電子レシート）",
              "size": "xs",
              "wrap": true,
              "flex": 18
            }
          ],
          "spacing": "none",
          "margin": "sm"
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [
            { "type": "text", "text": "・", "size": "xs" },
            {
              "type": "text",
              "text": "タグ、箱などの付属品",
              "size": "xs",
              "wrap": true,
              "flex": 18
            }
          ],
          "spacing": "none",
          "margin": "sm"
        },
        {
          "type": "text",
          "text": "※注意事項",
          "weight": "bold",
          "size": "xs",
          "margin": "lg"
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [
            { "type": "text", "text": "・", "size": "xs" },
            {
              "type": "text",
              "text": "一部商品は対象外になります",
              "size": "xs",
              "wrap": true,
              "flex": 18
            }
          ],
          "spacing": "none",
          "margin": "sm"
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [
            { "type": "text", "text": "・", "size": "xs" },
            {
              "type": "text",
              "text": "返品前に以下のボタンより「返品・交換の条件」を必ずご確認ください",
              "size": "xs",
              "wrap": true,
              "flex": 18,
              "margin": "none"
            }
          ],
          "spacing": "none",
          "margin": "sm"
        },
        {
          "type": "separator",
          "margin": "xxl",
          "color": "#DDDDDD"
        },
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "返品・交換の条件はこちら",
            "uri": "https://example.com/return-policy"
          },
          "style": "primary",
          "color": "#1AC94F",
          "height": "md",
          "margin": "xxl"
        },
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "お問い合わせはこちら",
            "uri": "https://example.com/contact"
          },
          "style": "link",
          "height": "sm",
          "margin": "md",
          "color": "#1AC94F"
        }
      ],
      "paddingAll": "xl",
      "backgroundColor": "#FFFFFF",
      "spacing": "sm"
    },
    "styles": {
      "body": {
        "backgroundColor": "#FFFFFF"
      }
    }
  };
  
  module.exports = {
    returnMenu,
    onlineStorePrompt,
    returnStorePolicy
  };
  