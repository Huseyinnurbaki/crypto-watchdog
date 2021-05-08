import { ListingRules, MessageColors } from "src/utils/constants";
import { assignColor, ninEqualRange } from "src/utils/js-utils";
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

function generateRow(row: NotifyModel) {
  if (row.errorMessage){
    return exceptionRow(row)
  } else if (row.warnMessage) {
    return warningRow(row)
  }
  return successfulRow(row)

}

function successfulRow(row: NotifyModel) {

  const hourlyColor = assignColor(row.priceChangePercentage1h, ListingRules.hourly_percentage)
  const dailyColor = assignColor(row.priceChangePercentage24h, ListingRules.daily_percentage)
  const price = `price: ${row.price.toFixed(8).toString()}`
  const percentChangeHourly = `1h  %: ${row.priceChangePercentage1h.toFixed(2).toString()}`
  const percentChangeDaily = `24h %: ${row.priceChangePercentage24h.toFixed(2).toString()}`
  const content = `<b>[${row.symbol}] ${row.name}</b> \n ${price} \n <font color=\"#${hourlyColor}\">${percentChangeHourly} \n </font> <font color=\"#${dailyColor}\">${percentChangeDaily} \n </font>  `
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