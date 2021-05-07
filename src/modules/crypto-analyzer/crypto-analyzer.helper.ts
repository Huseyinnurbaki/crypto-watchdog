import { NotifyModel } from "../notify/dtos/notify.model";
import { config } from 'dotenv';

config();

export function checkCMCRate(currency) {
  const percentage = Number(process.env.PERCENTAGE) || 10;
  return currency.quote?.['USD']?.percent_change_1h > percentage
}

export function checkGeckoRate(currency) {
  const percentage = Number(process.env.PERCENTAGE) || 10;
  return currency.price_change_percentage_1h_in_currency > percentage
}

export function notifyModelGeckoMapper(item) {
  const potential = new NotifyModel('Coin Gecko');
  potential.symbol = item.symbol?.toUpperCase();
  potential.name = item.name;
  potential.priceChangePercentage1h = item.price_change_percentage_1h_in_currency;
  potential.priceChangePercentage24h = item.price_change_percentage_24h;
  potential.price = item.current_price

  return potential;
}

export function notifyModelCMCMapper(item) {
  const potential = new NotifyModel('Coin Market Cap');
  potential.symbol = item.symbol?.toUpperCase();
  potential.name = item.name;
  potential.priceChangePercentage1h = item.quote?.['USD']?.percent_change_1h;
  potential.priceChangePercentage24h = item.quote?.['USD']?.percent_change_24h;
  potential.price = item.quote?.['USD']?.price

  return potential;
}
