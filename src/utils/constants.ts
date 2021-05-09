import { config } from 'dotenv';

config();

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
  hourly_percentage: Number(process.env.HOURLY_PERCENTAGE) || 10,
  daily_percentage: Number(process.env.DAILY_PERCENTAGE) || 999999,
};
