/*

Do Not Modify Existing Namings/Values

*/

import { config } from 'dotenv';
import { BSC_SCAN_TOKEN, ETH_SCAN_TOKEN } from './paths';

config();

export const CRYPTO_WATCHDOG_VERSION = '0.3.3';
export const AppConfigs = {
  CMC_PRO_API_KEY: process.env.CMC_PRO_API_KEY,
  BITQUERY_API_KEY: process.env.BITQUERY_API_KEY,
  GOOGLE_CHAT_ROOM_HOOK: process.env.GOOGLE_CHAT_ROOM_HOOK,
  SLACK_CHANNEL_HOOK: process.env.SLACK_CHANNEL_HOOK,
  TELEGRAM_CHANNEL_HOOK: process.env.TELEGRAM_CHANNEL_HOOK,
  CUSTOM_CHANNEL_HOOK: process.env.CUSTOM_CHANNEL_HOOK,
  HOURLY_PERCENTAGE: Number(process.env.HOURLY_PERCENTAGE),
  DAILY_PERCENTAGE: Number(process.env.DAILY_PERCENTAGE),
  COIN_GECKO_PAGE_LIMIT: Number(process.env.COIN_GECKO_PAGE_LIMIT),
  BITQUERY_NEW_LISTED_BSC_COINS_ENABLED: process.env.BITQUERY_NEW_LISTED_BSC_COINS_ENABLED,
  BITQUERY_NEW_LISTED_ETH_COINS_ENABLED: process.env.BITQUERY_NEW_LISTED_ETH_COINS_ENABLED,
};

const Colors = {
  LimeGreen: '32CD32',
  FireBrick: 'B22222',
  ForestGreen: '228B22',
  Crimson: 'DC143C',
  Black: '000000',
};

export const MessageColors = {
  info: Colors.LimeGreen,
  error: Colors.FireBrick,
  increased: Colors.ForestGreen,
  decreased: Colors.Crimson,
  default: Colors.Black,
};

export const ListingRules = {
  hourly_percentage: AppConfigs.HOURLY_PERCENTAGE || 10,
  daily_percentage: AppConfigs.DAILY_PERCENTAGE || 999999,
};

const DEFAULTPAGELIMIT = 2;
const PAGE_LIMIT = AppConfigs.COIN_GECKO_PAGE_LIMIT || DEFAULTPAGELIMIT;

export function getCoinGeckoPageLimit() {
  if (PAGE_LIMIT > 0 && PAGE_LIMIT <= 28) return PAGE_LIMIT;
  return DEFAULTPAGELIMIT;
}

export enum NotificationTypes {
  ERROR = -1,
  WARN = 0,
  SUDDEN_CHANGES = 1,
  NEW_LISTED = 2,
}

export const BitQueryApiNetworks = {
  Ethereum: 'ethereum',
  BSC: 'bsc',
};
export const BitQueryApiNetworkCrawlURLs = {
  bsc: BSC_SCAN_TOKEN,
  ethereum: ETH_SCAN_TOKEN,
};

export const exceptionMessages = {
  inactiveFeature: 'This feature is inactive. Checkout github.com/Huseyinnurbaki/crypto-watchdog for troubleshooting.',
  missingBitqueryNetworkEnvVariable:
    'Enable at least 1 network for this api. Checkout https://github.com/Huseyinnurbaki/crypto-watchdog/blob/master/README.md for more.',
};
