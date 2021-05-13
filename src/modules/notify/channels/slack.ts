/*
#############
Styling Ref:
https://app.slack.com/block-kit-builder/
https://api.slack.com/messaging/composing/layouts

#############
*/

import { NotificationTypes } from 'src/utils/constants';
import { NotifyModel } from '../dto/notify.model';

export function slackChannelMessage(data: [NotifyModel]) {
  const body = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Crypto Watchdog',
          emoji: true,
        },
      },
    ],
  };
  data.map(cur => {
    const block = generateSection(cur);
    block.forEach(element => body.blocks.push(element));
  });

  return body;
}

function generateSection(Section: NotifyModel) {
  switch (Section.notificationType) {
    case NotificationTypes.ERROR:
      return errorSection(Section);
    case NotificationTypes.WARN:
      return warningSection(Section);
    case NotificationTypes.SUDDEN_CHANGES:
      return suddenChangesSection(Section);
    case NotificationTypes.NEW_LISTED:
      return newListedSection(Section);
    default:
      return suddenChangesSection(Section);
  }
}

function newListedSection(section: NotifyModel) {
  const displayData = {
    holders: `Holders: ${section.holders}`,
    address: `Address: ${section.address}`,
    decimals: `Decimals: ${section.decimals}`,
    timestamp: `Timestamp: ${section.timestamp}`,
    network: `Network: ${section.network}`,
    source: `Currency | ${section.source}`,
    title: `[${section.symbol}] ${section.name}`,
  };
  const content = `*<fakeLink.toHotelPage.com|${displayData.title}>* \n ${displayData.holders}\n ${displayData.network}\n ${displayData.decimals}\n ${displayData.timestamp}\n ${displayData.address}`;
  return singleRegularSection(content, displayData);
}

function warningSection(row: NotifyModel) {
  const message = `Info | ${row.source} | ${row.message}`;
  return plainText(message);
}
function errorSection(row: NotifyModel) {
  const message = `Attention | ${row.source} | ${row.message}`;
  return plainText(message);
}

function suddenChangesSection(section: NotifyModel) {
  const displayData = {
    price: `price: ${section.price}`,
    percentChangeHourly: `1h  %: ${section.priceChangePercentage1h}`,
    percentChangeDaily: `24h %: ${section.priceChangePercentage24h}`,
    title: `[${section.symbol}] ${section.name}`,
    source: `Currency | ${section.source}`,
  };
  const content = `*<fakeLink.toHotelPage.com|${displayData.title}>*\n${displayData.price}\n${displayData.percentChangeHourly}\n${displayData.percentChangeDaily}`;
  return singleRegularSection(content, displayData);
}

function plainText(message: string) {
  const plainTextSection = [
    {
      type: 'section',
      text: {
        type: 'plain_text',
        text: message,
        emoji: true,
      },
    },
  ];

  return plainTextSection;
}

function singleRegularSection(content, displayData) {
  const block = [
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: content,
      },
    },
    {
      type: 'context',
      elements: [
        {
          type: 'plain_text',
          emoji: true,
          text: `${displayData.source}`,
        },
      ],
    },
  ];
  return block;
}
