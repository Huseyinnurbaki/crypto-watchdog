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

  const template = tableModifier(data[0]);

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

function tableModifier(sampleData) {
  let template = '``` |';
  let subline = ' |';
  Object.keys(sampleData).forEach(function(k) {
    switch (k) {
      case 'symbol':
        template = template.concat('   Symbol   |');
        subline = subline = subline.concat('------------|');
        break;
      case 'price':
        template = template.concat('    Price    |');
        subline = subline.concat('-------------|');
        break;
      case 'priceChangePercentage1h':
        template = template.concat('   1h %   |');
        subline = subline.concat('----------|');
        break;
      case 'priceChangePercentage24h':
        template = template.concat('  24h %   |');
        subline = subline.concat('----------|');
        break;
      case 'source':
        template = template.concat('      Source      |');
        subline = subline.concat('------------------|');
        break;
      case 'holders':
        template = template.concat('     Holders      |');
        subline = subline.concat('------------------|');
        break;
      case 'address':
        template = template.concat('                   Address                    |');
        subline = subline.concat('----------------------------------------------|');
        break;

      default:
        break;
    }
  });
  return template
    .concat('\n')
    .concat(subline)
    .concat('\n');
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
    source: section?.source && `${section.source.concat(new Array(17 - section.source.length).join(' '))}`,
    address: section.address && `${section.address.concat(new Array(45 - section.address.length).join(' '))}`,
    symbol: section.symbol && `${section.symbol.concat(new Array(11 - section.symbol.length).join(' '))}`,
    holders: section.holders && `${section.holders.concat(new Array(17 - section.holders.length).join(' '))}`,
    priceChangePercentage1h:
      section.priceChangePercentage1h &&
      `${section.priceChangePercentage1h.concat(new Array(9 - section.priceChangePercentage1h.length).join(' '))}`,
    priceChangePercentage24h:
      section.priceChangePercentage24h &&
      `${section.priceChangePercentage24h.concat(new Array(9 - section.priceChangePercentage24h.length).join(' '))}`,
    price:
      section.price &&
      `${parseFloat(section.price)
        .toFixed(6)
        .concat(new Array(14 - section.price.length).join(' '))}`,
  };
  console.log(lines);
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
  let block = ' | ';
  Object.keys(lines).forEach(function(k) {
    if (lines[k] && block.indexOf(k) < 0) {
      switch (k) {
        case 'symbol':
          block = block.concat(lines.symbol + ' | ');
          break;
        case 'price':
          block = block.concat(lines.price + ' | ');
          break;
        case 'priceChangePercentage1h':
          block = block.concat(lines.priceChangePercentage1h + ' | ');
          break;
        case 'priceChangePercentage24h':
          block = block.concat(lines.priceChangePercentage24h + ' | ');
          break;
        case 'source':
          block = block.concat(lines.source + ' | ');
          break;
        case 'address':
          block = block.concat(lines.address + ' | ');
          break;
        case 'holders':
          block = block.concat(lines.holders + ' | ');
          break;
        default:
          break;
      }
    }
  });
  console.log(block);
  return block.concat('\n');
}
