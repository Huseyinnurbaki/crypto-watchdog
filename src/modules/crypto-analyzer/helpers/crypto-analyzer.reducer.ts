import { ListingRules } from 'src/utils/constants';
import { ninEqualRange } from 'src/utils/js-utils';

export function checkCMCRate(currency) {
  const { percent_change_1h, percent_change_24h } = currency.quote?.['USD'];
  if (!percent_change_1h || !percent_change_24h) return false;
  const hourly = ninEqualRange(percent_change_1h, ListingRules.hourly_percentage);
  const daily = ninEqualRange(percent_change_24h, ListingRules.daily_percentage);
  return hourly || daily;
}

export function checkGeckoRate(currency) {
  const { price_change_percentage_1h_in_currency, price_change_percentage_24h } = currency;
  if (!price_change_percentage_1h_in_currency || !price_change_percentage_24h) return false;
  const hourly = ninEqualRange(price_change_percentage_1h_in_currency, ListingRules.hourly_percentage);
  const daily = ninEqualRange(price_change_percentage_24h, ListingRules.daily_percentage);
  return hourly || daily;
}
