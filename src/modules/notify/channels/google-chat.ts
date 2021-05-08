import { MessageColors } from "src/utils/constants";
import { NotifyModel } from "../dto/notify.model";


export function googleChatRoomMessage(data) {
  const infoUrl =
    'https://cdn3.iconfinder.com/data/icons/vol-4/128/megaphone-512.png';
  const widgets = [];
  data.map(cur => { widgets.push(generateRow(cur)) })
  const body = {
    cards: [
      {
        header: {
          title: 'List of Cryptocurrencies',
          subtitle: 'On the way to the moon',
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

function generateRow(row: NotifyModel) {
  if (row.errorMessage){
    return exceptionRow(row)
  } else if (row.warnMessage) {
    return warningRow(row)
  }
  return successfulRow(row)

}

function successfulRow(row: NotifyModel) {

  const randomColor = getDarkColor();

  const price = `price: ${row.price.toFixed(8).toString()}`
  const percent_change_1h = `1h  %: ${row.priceChangePercentage1h.toFixed(2).toString()}`
  const percent_change_24h = `24h %: ${row.priceChangePercentage24h.toFixed(2).toString()}`
  const content = `<b>[${row.symbol}] ${row.name}</b> \n  <font color=\"#${randomColor}\">${price} \n ${percent_change_1h} \n ${percent_change_24h} \n </font>  `
  const topLabel = `Currency | ${row.source}`;
  return generateWidget(topLabel, content)

}
function exceptionRow(row: NotifyModel) {
  const alertColor = MessageColors.error;
  const content = `<i><font color=\"#${alertColor}\">${row.errorMessage} \n </font> </i> `
  const topLabel = `Attention | ${row.source}`;
  return generateWidget(topLabel, content)

}
function warningRow(row: NotifyModel) {
  const warnColor = MessageColors.info;
  const content = `<i><font color=\"#${warnColor}\">${row.warnMessage} \n </font> </i> `
  const topLabel = `Info | ${row.source}`;

  return generateWidget(topLabel, content)
}

function generateWidget(topLabel, content) {
  return {
    keyValue: {
      topLabel: topLabel,
      content: content || '-',
    },
  }
}