import { NotifyModel } from "../notify/dto/notify.model";
import { config } from 'dotenv';
import { providers } from "src/utils/providers";

config();

function checkCMCRate(currency) {
  const hourly_percentage = Number(process.env.HOURLY_PERCENTAGE) || 10;
  const daily_percentage = Number(process.env.DAILY_PERCENTAGE) || 99999999;
  const hourly = currency.quote?.['USD']?.percent_change_1h > hourly_percentage;
  const daily = currency.quote?.['USD']?.percent_change_24h > daily_percentage;
  return hourly || daily
}

function checkGeckoRate(currency) {
  const hourly_percentage = Number(process.env.HOURLY_PERCENTAGE) || 10;
  const daily_percentage = Number(process.env.DAILY_PERCENTAGE) || 99999999;
  const hourly = currency.price_change_percentage_1h_in_currency > hourly_percentage;
  const daily = currency.price_change_percentage_24h > daily_percentage;
  return hourly || daily
}

export function filterGecko(data) {
  try {
    const result = data?.filter(checkGeckoRate).map(item => notifyModelGeckoMapper(item));
    return result;
  } catch (error) {
    return serviceFailure(providers.CoinGecko)
  }
}
export function filterCoinMarketCap(data) {
  try {
    const result = data?.data?.filter(checkCMCRate).map(item => notifyModelCMCMapper(item));
    return result;
  } catch (error) {
    return serviceFailure(providers.CoinMarketCap)
  }
}

function serviceFailure(provider) {
  const failure = new NotifyModel(provider);
  failure.errorMessage = 'Check Your Provider Config';
  return [failure];
}

function notifyModelGeckoMapper(item) {
  const potential = new NotifyModel(providers.CoinGecko);
  potential.symbol = item.symbol?.toUpperCase();
  potential.name = item.name;
  potential.priceChangePercentage1h = item.price_change_percentage_1h_in_currency;
  potential.priceChangePercentage24h = item.price_change_percentage_24h;
  potential.price = item.current_price

  return potential;
}

function notifyModelCMCMapper(item) {
  const potential = new NotifyModel(providers.CoinMarketCap);
  potential.symbol = item.symbol?.toUpperCase();
  potential.name = item.name;
  potential.priceChangePercentage1h = item.quote?.['USD']?.percent_change_1h;
  potential.priceChangePercentage24h = item.quote?.['USD']?.percent_change_24h;
  potential.price = item.quote?.['USD']?.price

  return potential;
}
