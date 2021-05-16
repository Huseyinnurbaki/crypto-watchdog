/*
#############
Styling and API Ref:
https://core.telegram.org/api
https://core.telegram.org/bots
https://core.telegram.org/bots#6-botfather
#############
*/

import { NotificationTypes } from 'src/utils/constants';
import { NotifyModel } from '../dto/notify.model';
const singleMessages = [];
const tableMessages = [];

export function telegramChannelMessage(data: [NotifyModel]) {
  let message = '';
  const head = '*Crypto Watchdog*\n';
  let info = '_List of CryptoCurrencies_\n';
  data.forEach(element => {
    switch (element.notificationType) {
      case NotificationTypes.ERROR:
        singleMessages.push(element);
        break;
      case NotificationTypes.WARN:
        singleMessages.push(element);
        break;
      case NotificationTypes.SUDDEN_CHANGES:
        tableMessages.push(element);
        break;
      case NotificationTypes.NEW_LISTED:
        tableMessages.push(element);
        break;
      default:
        tableMessages.push(element);
        break;
    }
  });

  const template = tableModifier(tableMessages[0]);
  singleMessages.map(cur => {
    info += generateSection(cur);
  });
  message = message
    .concat(head)
    .concat(info)
    .concat('\n');
  message = message.concat(template);
  tableMessages.map(cur => {
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
      case 'network':
        template = template.concat('      Network      |');
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
  switch (Section.notificationType) {
    case NotificationTypes.ERROR:
      return errorSection(Section);
    case NotificationTypes.WARN:
      return warningSection(Section);
    case NotificationTypes.SUDDEN_CHANGES:
      return suddenChangesSection(Section);
    case NotificationTypes.NEW_LISTED:
      return suddenChangesSection(Section);
    default:
      return suddenChangesSection(Section);
  }
}

function warningSection(section: NotifyModel) {
  return `Info | ${section.source} | ${section.message} \n`;
}
function errorSection(section: NotifyModel) {
  return `Attention | ${section.source} | ${section.message} \n`;
}

function suddenChangesSection(section: NotifyModel) {
  const lines = {
    source: section?.source && `${section.source.concat(new Array(17 - section.source.length).join(' '))}`,
    address: section.address && `${section.address.concat(new Array(45 - section.address.length).join(' '))}`,
    symbol: section.symbol && `${section.symbol.concat(new Array(11 - section.symbol.length).join(' '))}`,
    network: section.network && `${section.network.concat(new Array(17 - section.network.length).join(' '))}`,
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
  return singleRegularSection(lines);
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
        case 'network':
          block = block.concat(lines.network + ' | ');
          break;
        default:
          break;
      }
    }
  });
  return block.concat('\n');
}
