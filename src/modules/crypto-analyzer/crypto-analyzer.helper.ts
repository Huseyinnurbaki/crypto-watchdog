import { NotifyModel } from "../notify/dto/notify.model";
import { CryptoProviders } from "src/utils/providers";
import { ListingRules } from "src/utils/constants";
import { ninEqualRange } from "src/utils/js-utils";

function checkCMCRate(currency) {
  const { percent_change_1h, percent_change_24h } = currency.quote?.['USD'];
  if(!percent_change_1h || !percent_change_24h) return false
  const hourly = ninEqualRange(percent_change_1h, ListingRules.hourly_percentage);
  const daily = ninEqualRange(percent_change_24h, ListingRules.daily_percentage);
  return hourly || daily
}

function checkGeckoRate(currency) {
  const { price_change_percentage_1h_in_currency, price_change_percentage_24h } = currency;
  if(!price_change_percentage_1h_in_currency || !price_change_percentage_24h) return false
  const hourly = ninEqualRange(price_change_percentage_1h_in_currency, ListingRules.hourly_percentage);
  const daily = ninEqualRange(price_change_percentage_24h, ListingRules.daily_percentage);
  return hourly || daily
}

export function filterGecko(data) {
  try {
    const result = data?.filter(checkGeckoRate).map(item => notifyModelGeckoMapper(item));
    return result;
  } catch (error) {
    return serviceFailure(CryptoProviders.CoinGecko)
  }
}
export function filterCoinMarketCap(data) {
  try {
    const result = data?.data?.filter(checkCMCRate).map(item => notifyModelCMCMapper(item));
    return result;
  } catch (error) {
    return serviceFailure(CryptoProviders.CoinMarketCap)
  }
}

function serviceFailure(provider) {
  const failure = new NotifyModel(provider);
  failure.errorMessage = 'Check Your Provider Config';
  return [failure];
}

function notifyModelGeckoMapper(item) {
  const potential = new NotifyModel(CryptoProviders.CoinGecko);
  potential.symbol = item.symbol?.toUpperCase();
  potential.name = item.name;
  potential.priceChangePercentage1h = item.price_change_percentage_1h_in_currency;
  potential.priceChangePercentage24h = item.price_change_percentage_24h;
  potential.price = item.current_price

  return potential;
}

function notifyModelCMCMapper(item) {
  const potential = new NotifyModel(CryptoProviders.CoinMarketCap);
  potential.symbol = item.symbol?.toUpperCase();
  potential.name = item.name;
  potential.priceChangePercentage1h = item.quote?.['USD']?.percent_change_1h;
  potential.priceChangePercentage24h = item.quote?.['USD']?.percent_change_24h;
  potential.price = item.quote?.['USD']?.price

  return potential;
}
