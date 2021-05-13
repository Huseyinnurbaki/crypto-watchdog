import { CryptoProviders } from 'src/utils/providers';
import { NotifyModel } from 'src/modules/notify/dto/notify.model';
import { checkGeckoRate, checkCMCRate } from './crypto-analyzer.reducer';
import { BitQueryApiNetworks, NotificationTypes } from 'src/utils/constants';
import { notifyModelGeckoMapper, notifyModelCMCMapper, notifyBitQueryNewTokensMapper } from './crypto-analyzer.mapper';

export function filterGecko(data) {
  try {
    const result = data?.filter(checkGeckoRate).map(item => notifyModelGeckoMapper(item));
    return result;
  } catch (error) {
    return serviceFailure(CryptoProviders.CoinGecko);
  }
}
export function filterCoinMarketCap(data) {
  try {
    const result = data?.data?.filter(checkCMCRate).map(item => notifyModelCMCMapper(item));
    return result;
  } catch (error) {
    return serviceFailure(CryptoProviders.CoinMarketCap);
  }
}

export function filterBitQueryNewBSCTokens(data) {
  try {
    const result = data?.ethereum?.smartContractCalls?.map(item =>
      notifyBitQueryNewTokensMapper(BitQueryApiNetworks.BSC, item),
    );
    return result;
  } catch (error) {
    return serviceFailure(CryptoProviders.BitQuery);
  }
}
export function filterBitQueryNewETHTokens(data) {
  try {
    const result = data?.ethereum?.smartContractCalls?.map(item =>
      notifyBitQueryNewTokensMapper(BitQueryApiNetworks.Ethereum, item),
    );
    return result;
  } catch (error) {
    return serviceFailure(CryptoProviders.BitQuery);
  }
}

function serviceFailure(provider) {
  const failure = new NotifyModel(provider);
  failure.message = 'Check Your Provider Config';
  failure.notificationType = NotificationTypes.ERROR;
  return [failure];
}
