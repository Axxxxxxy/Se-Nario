// templates/shipping_fee.js

const shippingFee = {
  type: "bubble",
  size: "mega",
  body: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "text",
        text: "送料・配送費について",
        weight: "bold",
        size: "lg",
        align: "center",
        margin: "xs"
      },
      {
        type: "text",
        text: "送料は、全国一律550円（税込）です。\n5,000円（税込）以上のご注文で送料無料となります。",
        wrap: true,
        size: "xs",
        margin: "lg"
      },
      {
        type: "separator",
        margin: "xl",
        color: "#DDDDDD"
      },
      {
        type: "text",
        text: "※ご注意ください",
        weight: "bold",
        size: "xs",
        margin: "lg"
      },
      {
        type: "box",
        layout: "baseline",
        contents: [
          {
            type: "text",
            text: "・",
            size: "xs"
          },
          {
            type: "text",
            text: "送料は「1回のご注文ごと」に発生します。",
            size: "xs",
            wrap: true,
            flex: 18
          }
        ],
        spacing: "none",
        margin: "sm"
      },
      {
        type: "box",
        layout: "baseline",
        contents: [
          {
            type: "text",
            text: "・",
            size: "xs"
          },
          {
            type: "text",
            text: "クーポン適用後の金額が5,000円未満の場合、送料無料は適用されません。",
            size: "xs",
            wrap: true,
            flex: 18
          }
        ],
        spacing: "none",
        margin: "sm"
      },
      {
        type: "box",
        layout: "baseline",
        contents: [
          {
            type: "text",
            text: "・",
            size: "xs"
          },
          {
            type: "text",
            text: "複数商品をお荷物にした場合も「1注文あたりの合計金額」で判定されます。",
            size: "xs",
            wrap: true,
            flex: 18
          }
        ],
        spacing: "none",
        margin: "sm"
      },
      {
        type: "box",
        layout: "baseline",
        contents: [
          {
            type: "text",
            text: "・",
            size: "xs"
          },
          {
            type: "text",
            text: "沖縄・離島など一部地域は追加送料がかかる場合があります。",
            size: "xs",
            wrap: true,
            flex: 18
          }
        ],
        spacing: "none",
        margin: "sm"
      },
      {
        type: "box",
        layout: "baseline",
        contents: [
          {
            type: "text",
            text: "・",
            size: "xs"
          },
          {
            type: "text",
            text: "代金引換をご利用の場合は、代引き手数料330円（税込）がかかります。",
            size: "xs",
            wrap: true,
            flex: 18
          }
        ],
        spacing: "none",
        margin: "sm"
      },
      {
        type: "separator",
        margin: "xxl",
        color: "#DDDDDD"
      },
      {
        type: "button",
        action: {
          type: "uri",
          label: "詳しくはこちら",
          uri: "https://example.com/shipping-policy"
        },
        style: "primary",
        color: "#1AC94F",
        height: "md",
        margin: "xxl"
      },
      {
        type: "button",
        action: {
          type: "uri",
          label: "よくある質問はこちら",
          uri: "https://example.com/faq"
        },
        style: "link",
        height: "sm",
        margin: "md",
        color: "#1AC94F"
      }
    ],
    paddingAll: "xl",
    backgroundColor: "#FFFFFF",
    spacing: "sm"
  },
  styles: {
    body: {
      backgroundColor: "#FFFFFF"
    }
  }
};

module.exports = shippingFee; // ← ✅ 正しい変数名をエクスポート
