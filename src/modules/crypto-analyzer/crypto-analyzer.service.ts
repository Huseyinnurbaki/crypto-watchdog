import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  BITQUERY_API_BASEURL,
  CMC_API_CRYPTOCURRENCY__LISTINGS_LATEST,
  COINGECKO_API__LISTINGS_LATEST,
} from 'src/utils/paths';
import {
  AppConfigs,
  exceptionMessages,
  getCoinGeckoPageLimit,
  BitQueryApiNetworks,
  BitQueryApiNetworkCrawlURLs,
} from 'src/utils/constants';
import queries from 'src/utils/queries';
import { RequestService } from '../network/request.service';
import { NotifyService } from '../notify/notify.service';
import {
  filterGecko,
  filterCoinMarketCap,
  filterBitQueryNewBSCTokens,
  filterBitQueryNewETHTokens,
} from './helpers/crypto-analyzer.filter';
import { parseInfo } from './helpers/crypto-analyzer-crawler.helper';
import { NotifyModel } from '../notify/dto/notify.model';
import { removeSelectedFromArray, Rules } from 'src/utils/js-utils';

@Injectable()
export class CryptoAnalyzerService {
  constructor(private readonly requestService: RequestService, private readonly notifyService: NotifyService) {}

  @Cron('*/45 * * * *')
  async getCryptos() {
    const geckoPotentials = await this.getCoinGeckoCryptos();
    const cmcPotentials = await this.getCMCCryptos();
    const mergedCoinList = geckoPotentials.concat(cmcPotentials);
    // this.notifyService.publish(mergedCoinList);

    return mergedCoinList;
  }

  @Cron('*/30 * * * *')
  async getNewbies() {
    if (!AppConfigs.BITQUERY_API_KEY) return exceptionMessages.inactiveFeature;
    if (!AppConfigs.BITQUERY_NEW_LISTED_BSC_COINS_ENABLED && !AppConfigs.BITQUERY_NEW_LISTED_ETH_COINS_ENABLED)
      return exceptionMessages.missingBitqueryNetworkEnvVariable;
    const bitQueryNewBSCTokens = await this.getBitqueryNewBSCTokens();
    const bitQueryNewETHTokens = await this.getBitqueryNewEthTokens();
    const mergedCoinList = [].concat.apply(bitQueryNewBSCTokens, bitQueryNewETHTokens);
    this.notifyService.publish(mergedCoinList);

    return mergedCoinList;
  }

  async getCoinGeckoCryptos() {
    const data = [];
    const pages = getCoinGeckoPageLimit();
    for (let i = 1; i < pages + 1; i++) {
      const query = `${COINGECKO_API__LISTINGS_LATEST}?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h&page=${i}&per_page=250`;
      const response = await this.requestService.get(query);
      if (response.length) data.push(...response);
    }

    return filterGecko(data);
  }

  async getCMCCryptos() {
    if (!AppConfigs.CMC_PRO_API_KEY) return [];
    const query = `${CMC_API_CRYPTOCURRENCY__LISTINGS_LATEST}?start=1&limit=200`;
    const data = await this.requestService.get(query);

    return filterCoinMarketCap(data);
  }

  async getBitqueryNewBSCTokens() {
    if (!AppConfigs.BITQUERY_NEW_LISTED_BSC_COINS_ENABLED) return [];
    const newTokens = await this.requestService.graphql(
      BITQUERY_API_BASEURL,
      queries.newToken(BitQueryApiNetworks.BSC),
    );
    const filteredTokens = filterBitQueryNewBSCTokens(newTokens);
    return await this.crawlInformation(BitQueryApiNetworks.BSC, filteredTokens);
  }

  async getBitqueryNewEthTokens() {
    if (!AppConfigs.BITQUERY_NEW_LISTED_ETH_COINS_ENABLED) return [];
    const newTokens = await this.requestService.graphql(
      BITQUERY_API_BASEURL,
      queries.newToken(BitQueryApiNetworks.Ethereum),
    );
    const filteredTokens = filterBitQueryNewETHTokens(newTokens);
    return this.crawlInformation(BitQueryApiNetworks.Ethereum, filteredTokens);
  }

  async crawlInformation(network: string, coinsList: [NotifyModel]) {
    for await (const coin of coinsList) {
      coin.holders = await this.crawlAdditionalInfo(network, coin.address);
    }
    return removeSelectedFromArray(coinsList, 'holders', Rules.tokenHolderSize);
  }

  async crawlAdditionalInfo(network, address: string) {
    if (!address) return '';
    const query = `${BitQueryApiNetworkCrawlURLs[network]}/${address}`;
    const data = await this.requestService.get(query);
    const parsed = parseInfo(network, data);
    return parsed;
  }
}
