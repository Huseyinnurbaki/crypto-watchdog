import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CMC_API_CRYPTOCURRENCY__LISTINGS_LATEST, COINGECKO_API__LISTINGS_LATEST } from 'src/utils/paths';
import { RequestService } from '../network/request.service';
import { NotifyService } from '../notify/notify.service';
import { filterCoinMarketCap, filterGecko } from './crypto-analyzer.helper';

@Injectable()
export class CryptoAnalyzerService {

  constructor(
    private readonly requestService: RequestService,
    private readonly notifyService: NotifyService,
  ) { }

  @Cron('*/45 * * * *')
  async getCryptos() {
    const geckoPotentials = await this.getCoinGeckoCryptos();
    const cmcPotentials = await this.getCMCCryptos();
    const mergedCoinList = geckoPotentials.concat(cmcPotentials);
    this.notifyService.publish(mergedCoinList);

    return mergedCoinList;
  }

  async getCoinGeckoCryptos() {
    const query = `${COINGECKO_API__LISTINGS_LATEST}?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h&per_page=250`;
    const data = await this.requestService.get(query);

    return filterGecko(data)
  }

  async getCMCCryptos() {
    if (!process.env.CMC_PRO_API_KEY) return [];
    const query = `${CMC_API_CRYPTOCURRENCY__LISTINGS_LATEST}?start=1&limit=200`;
    const data = await this.requestService.get(query);

    return filterCoinMarketCap(data)
  }

}
