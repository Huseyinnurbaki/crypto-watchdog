/*
#############
Styling Ref:
https://developers.google.com/hangouts/chat/how-tos/webhooks
TODO: Add Array Size Limit
#############
*/

import { ListingRules, MessageColors, NotificationTypes } from 'src/utils/constants';
import { assignColor } from 'src/utils/js-utils';
import { NotifyModel } from '../dto/notify.model';

export function googleChatRoomMessage(data: [NotifyModel]) {
  const infoUrl = 'https://cdn3.iconfinder.com/data/icons/vol-4/128/megaphone-512.png';
  const widgets = [];
  data.map(cur => {
    widgets.push(generateRow(cur));
  });
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
  switch (row.notificationType) {
    case NotificationTypes.ERROR:
      return errorRow(row);
    case NotificationTypes.WARN:
      return warningRow(row);
    case NotificationTypes.SUDDEN_CHANGES:
      return suddenChangesRow(row);
    case NotificationTypes.NEW_LISTED:
      return newListedRow(row);
    default:
      return suddenChangesRow(row);
  }
}

function newListedRow(row: NotifyModel) {
  const displayData = {
    holders: `Holders: ${row.holders}`,
    address: `${row.address}`,
    decimals: `Decimals: ${row.decimals}`,
    timestamp: `Timestamp: ${row.timestamp}`,
    network: `Network: ${row.network}`,
  };
  const topLabel = `Source | ${row.source}`;
  const content = `<b>[${row.symbol}] \n ${row.name}</b> \n ${displayData.decimals} \n ${displayData.network} \n ${displayData.holders} \n ${displayData.timestamp} \n ${row.address} \n`;
  return generateWidget(topLabel, content);
}

function suddenChangesRow(row: NotifyModel) {
  const displayData = {
    hourlyColor: assignColor(row.priceChangePercentage1h, ListingRules.hourly_percentage),
    dailyColor: assignColor(row.priceChangePercentage24h, ListingRules.daily_percentage),
    price: `price: ${row.price}`,
    percentChangeHourly: `1h  %: ${row.priceChangePercentage1h}`,
    percentChangeDaily: `24h %: ${row.priceChangePercentage24h}`,
  };
  const topLabel = `Provider | ${row.source}`;
  const content = `<b>[${row.symbol}] ${row.name}</b> \n ${displayData.price} \n <font color=\"#${displayData.hourlyColor}\">${displayData.percentChangeHourly} \n </font> <font color=\"#${displayData.dailyColor}\">${displayData.percentChangeDaily} \n </font>  `;

  return generateWidget(topLabel, content);
}

function errorRow(row: NotifyModel) {
  const alertColor = MessageColors.error;
  const content = `<i><font color=\"#${alertColor}\">${row.message} \n </font> </i> `;
  const topLabel = `Attention | ${row.source}`;
  return generateWidget(topLabel, content);
}
function warningRow(row: NotifyModel) {
  const warnColor = MessageColors.info;
  const content = `<i><font color=\"#${warnColor}\">${row.message} \n </font> </i> `;
  const topLabel = `Info | ${row.source}`;

  return generateWidget(topLabel, content);
}

function generateWidget(topLabel, content) {
  return {
    keyValue: {
      topLabel: topLabel,
      content: content || '-',
    },
  };
}

