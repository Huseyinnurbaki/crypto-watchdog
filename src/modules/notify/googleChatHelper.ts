export function generateChatRoomCard(data) {
  const infoUrl =
    'https://cdn3.iconfinder.com/data/icons/vol-4/128/megaphone-512.png';
  const widgets = [];
  data.map(cur => { widgets.push(generateRow(cur)) })
  const body = {
    cards: [
      {
        header: {
          title: 'Cryptocurrencies',
          subtitle: 'Increase Over 10% in an Hour',
          imageUrl: infoUrl,
        },
        sections: [
          {
            widgets: widgets,
          },
        ],
      },
    ],
  };
  return body;
}

function getDarkColor() {
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  return color;
}

function generateRow(row) {
  const randomColor = getDarkColor();

  const price = `price: ${row.price.toFixed(8).toString()}`
  const percent_change_1h = `1h  %: ${row.priceChangePercentage1h.toFixed(2).toString()}`
  const percent_change_24h = `24h %: ${row.priceChangePercentage24h.toFixed(2).toString()}`
  const content = `<b>[${row.symbol}] ${row.name}</b> \n  <font color=\"#${randomColor}\">${price} \n ${percent_change_1h} \n ${percent_change_24h} \n </font>  `

  return {
    keyValue: {
      topLabel: `Currency | ${row.source}`,
      content: content || '-',
    },
  }
}