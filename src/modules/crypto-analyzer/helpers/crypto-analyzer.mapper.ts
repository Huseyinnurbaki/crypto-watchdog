import { NotifyModel } from 'src/modules/notify/dto/notify.model';
import { NotificationTypes } from 'src/utils/constants';
import { CryptoProviders } from 'src/utils/providers';

export function notifyModelGeckoMapper(item) {
  const potential = new NotifyModel(CryptoProviders.CoinGecko);
  potential.symbol = item.symbol?.toUpperCase();
  potential.name = item.name;
  potential.priceChangePercentage1h = item.price_change_percentage_1h_in_currency?.toFixed(2)?.toString();
  potential.priceChangePercentage24h = item.price_change_percentage_24h?.toFixed(2)?.toString();
  potential.price = item.current_price?.toFixed(8)?.toString();
  potential.notificationType = NotificationTypes.SUDDEN_CHANGES;
  return potential;
}

export function notifyModelCMCMapper(item) {
  const potential = new NotifyModel(CryptoProviders.CoinMarketCap);
  potential.symbol = item.symbol?.toUpperCase();
  potential.name = item.name;
  potential.priceChangePercentage1h = item.quote?.['USD']?.percent_change_1h?.toFixed(2)?.toString();
  potential.priceChangePercentage24h = item.quote?.['USD']?.percent_change_24h?.toFixed(2)?.toString();
  potential.price = item.quote?.['USD']?.price?.toFixed(8)?.toString();
  potential.notificationType = NotificationTypes.SUDDEN_CHANGES;
  return potential;
}

export function notifyBitQueryNewTokensMapper(network, item): NotifyModel {
  const potential = new NotifyModel(CryptoProviders.BitQuery);
  const { block, smartContract } = item;
  potential.address = smartContract?.address?.address;
  potential.timestamp = block?.timestamp?.time;
  potential.symbol = smartContract?.currency?.symbol;
  potential.name = smartContract?.currency?.name;
  potential.decimals = smartContract?.currency?.decimals;
  potential.symbol = smartContract?.currency?.symbol;
  potential.network = network;
  potential.notificationType = NotificationTypes.NEW_LISTED;
  return potential;
}
