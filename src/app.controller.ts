import { Controller, Get } from '@nestjs/common';
import { AppConfigs, ListingRules } from './utils/constants';
import * as Pigeon from '@hhaluk/pigeon';
import { ChannelProviders } from './utils/providers';

@Controller()
export class AppController {
  @Get('noti')
  async noti() {
    const body = { text: 'Your pizza delivery is here!' };
    const res = await Pigeon.NotifyGoogleChat(body);
    return res;
  }
  @Get('health')
  health(): string {
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    const localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
    return localISOTime;
  }
  @Get('configs')
  configs() {
    const DATETIME = new Date().getTime();
    const appConfigs = {
      HOURLY_PERCENTAGE: ListingRules.hourly_percentage,
      DAILY_PERCENTAGE: ListingRules.daily_percentage,
      COIN_GECKO_PAGE_LIMIT: AppConfigs.COIN_GECKO_PAGE_LIMIT,
      BITQUERY_NEW_LISTED_BSC_COINS_ENABLED: AppConfigs.BITQUERY_NEW_LISTED_BSC_COINS_ENABLED,
      BITQUERY_NEW_LISTED_ETH_COINS_ENABLED: AppConfigs.BITQUERY_NEW_LISTED_ETH_COINS_ENABLED,
      DATETIME,
    };
    return appConfigs;
  }
}
