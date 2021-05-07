export function generateChatRoomCard(data) {
    const infoUrl =
    'https://cdn3.iconfinder.com/data/icons/vol-4/128/megaphone-512.png';
    const widgets = [];
    data.map((cur) => widgets.push(generateRow(cur)))
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

function generateRow(row){
    const randomColor = getDarkColor();
  // Math.floor(Math.random() * 16777215).toString(16)

    const price = `price: ${row.quote?.['USD']?.price.toFixed(2).toString()}`
    const percent_change_1h =  `1h  %: ${row.quote?.['USD']?.percent_change_1h.toFixed(2).toString()}`
    const percent_change_24h = `24h %: ${row.quote?.['USD']?.percent_change_24h.toFixed(2).toString()}`
    // const volume_24h = `24h: ${row.quote?.['USD']?.volume_24h.toFixed(2).toString()}`
    // const market_cap = `Cap: ${row.quote?.['USD']?.market_cap.toFixed(2).toString()}`
    const content = `<b>- ${row.name}</b> \n  <font color=\"#${randomColor}\">${price} \n ${percent_change_1h} \n ${percent_change_24h} \n </font>  `
    return {
        keyValue: {
            topLabel: `Currency`,
            content: content || '-',
        },
    }
}