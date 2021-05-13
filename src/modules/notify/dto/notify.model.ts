import { NotificationTypes } from 'src/utils/constants';

export class NotifyModel {
  constructor(source: string) {
    this.source = source;
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
  network: string;
}
