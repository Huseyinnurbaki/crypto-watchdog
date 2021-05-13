import { NotificationTypes } from 'src/utils/constants';
import { NotifyModel } from './notify.model';

export class CustomHook {
  constructor(data: NotifyModel) {
    this.symbol = data.symbol;
    this.source = data.source;
    this.name = data.name;
    this.notificationType = data.notificationType;
    this.priceChangePercentage1h = data.priceChangePercentage1h;
    this.priceChangePercentage24h = data.priceChangePercentage24h;
    this.price = data.price;
    this.message = data.message;
    this.holders = data.holders;
    this.address = data.address;
    this.decimals = data.decimals;
    this.timestamp = data.timestamp;
  }

  notificationType: NotificationTypes;
  symbol: string;
  source: string;
  name: string;
  priceChangePercentage1h: string;
  priceChangePercentage24h: string;
  price: string;
  message: string;
  holders: string;
  address: string;
  decimals: number;
  timestamp: string;
}
