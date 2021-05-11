import { config } from 'dotenv';

config();

export const CRYPTO_WATCHDOG_VERSION = '0.2.1';
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
