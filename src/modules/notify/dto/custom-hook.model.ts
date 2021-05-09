import { NotifyModel } from './notify.model';

export class CustomHook {
  constructor(data: NotifyModel) {
    this.symbol = data.symbol;
    this.source = data.source;
    this.name = data.name;
    this.priceChangePercentage1h = data.priceChangePercentage1h;
    this.priceChangePercentage24h = data.priceChangePercentage24h;
    this.price = data.price;
    this.errorMessage = data.errorMessage;
    this.warnMessage = data.warnMessage;
  }

  symbol: string;
  source: string;
  name: string;
  priceChangePercentage1h: string;
  priceChangePercentage24h: string;
  price: string;
  errorMessage: string;
  warnMessage: string;
}
