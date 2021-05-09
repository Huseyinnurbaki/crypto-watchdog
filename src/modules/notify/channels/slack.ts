/*
#############
Styling Ref:
https://app.slack.com/block-kit-builder/
https://api.slack.com/messaging/composing/layouts

#############
*/

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
  if (Section.errorMessage) {
    return errorSection(Section);
  } else if (Section.warnMessage) {
    return warningSection(Section);
  }
  return successSection(Section);
}

function warningSection(row: NotifyModel) {
  const message = `Info | ${row.source} | ${row.warnMessage}`;
  return plainText(message);
}
function errorSection(row: NotifyModel) {
  const message = `Attention | ${row.source} | ${row.errorMessage}`;
  return plainText(message);
}

function successSection(section: NotifyModel) {
  const lines = {
    price: `price: ${section.price}`,
    percentChangeHourly: `1h  %: ${section.priceChangePercentage1h}`,
    percentChangeDaily: `24h %: ${section.priceChangePercentage24h}`,
    title: `[${section.symbol}] ${section.name}`,
    source: `Currency | ${section.source}`,
  };
  return singleRegularSection(lines);
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

function singleRegularSection(lines) {
  const block = [
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*<fakeLink.toHotelPage.com|${lines.title}>*\n${lines.price}\n${lines.percentChangeHourly}\n${lines.percentChangeDaily}`,
      },
    },
    {
      type: 'context',
      elements: [
        {
          type: 'plain_text',
          emoji: true,
          text: `${lines.source}`,
        },
      ],
    },
  ];
  return block;
}
