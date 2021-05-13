/*
#############
Styling and API Ref:
https://core.telegram.org/api
https://core.telegram.org/bots
https://core.telegram.org/bots#6-botfather
#############
*/

import { NotifyModel } from '../dto/notify.model';

export function telegramChannelMessage(data: [NotifyModel]) {
  let message = '';
  const head = '*Crypto Watchdog*\n';
  const info = '_List of CryptoCurrencies_\n\n';
  const template =
    '``` |   Symbol   |    Price    |   1h %   |   24h %  |      Source      |\n |------------|-------------|----------|----------|------------------|\n';

  message = message
    .concat(head)
    .concat(info)
    .concat(template);
  data.map(cur => {
    message += generateSection(cur);
  });
  const body = { text: message.concat('```') };
  return body;
}
function generateSection(Section: NotifyModel) {
  if (Section.message) {
    return errorSection(Section);
  } else if (Section.message) {
    return warningSection(Section);
  }
  return successSection(Section);
}

function warningSection(row: NotifyModel) {
  const message = `Info | ${row.source} | ${row.message}`;
  return plainText(message);
}
function errorSection(row: NotifyModel) {
  const message = `Attention | ${row.source} | ${row.message}`;
  return plainText(message);
}

function successSection(section: NotifyModel) {
  const lines = {
    price: `${parseFloat(section.price)
      .toFixed(6)
      .concat(new Array(14 - section.price.length).join(' '))}`,
    percentChangeHourly: `${section.priceChangePercentage1h.concat(
      new Array(9 - section.priceChangePercentage1h.length).join(' '),
    )}`,
    percentChangeDaily: `${section.priceChangePercentage24h.concat(
      new Array(9 - section.priceChangePercentage24h.length).join(' '),
    )}`,
    title: `${section.symbol.concat(new Array(11 - section.symbol.length).join(' '))}`,
    source: `${section.source.concat(new Array(17 - section.source.length).join(' '))}`,
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
  const block =
    ' | ' +
    lines.title +
    ' | ' +
    lines.price +
    ' | ' +
    lines.percentChangeHourly +
    ' | ' +
    lines.percentChangeDaily +
    ' | ' +
    lines.source +
    ' |\n';
  return block;
}
