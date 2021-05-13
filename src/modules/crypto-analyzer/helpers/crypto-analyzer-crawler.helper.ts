import { parse } from '@hhaluk/node-html-parser';
import { BitQueryApiNetworks } from 'src/utils/constants';

export function parseInfo(network, htmlResponse) {
  if (network === BitQueryApiNetworks.BSC) {
    return parseBSCHolderInfo(htmlResponse);
  } else if (network === BitQueryApiNetworks.Ethereum) {
    return parseEthHolderInfo(htmlResponse);
  }
  return '';
}

export function parseBSCHolderInfo(data) {
  try {
    const parsed = parse(data);
    const ContentPlaceHolder1_divSummary = parsed.querySelector('#ContentPlaceHolder1_tr_tokenHolders');
    const holders =
      ContentPlaceHolder1_divSummary?.childNodes?.[3]?.childNodes?.[3]?.childNodes?.[1]?.childNodes?.[1]?.childNodes?.[0]?.toString?.() ||
      '';
    return holders.replace(/\n/g, '');
  } catch (error) {
    return '';
  }
}
export function parseEthHolderInfo(data) {
  // not checked !!
  try {
    const parsed = parse(data);
    const ContentPlaceHolder1_divSummary = parsed.querySelector('#ContentPlaceHolder1_tr_tokenHolders');
    const holders =
      ContentPlaceHolder1_divSummary?.childNodes?.[3]?.childNodes?.[3]?.childNodes?.[1]?.childNodes?.[1]?.childNodes?.[0]?.toString?.() ||
      '';
    return holders.replace(/\n/g, '');
  } catch (error) {
    return '';
  }
}
