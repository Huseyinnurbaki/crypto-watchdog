export class NotifyModel {
  constructor(source: string) {
    this.source = source;
  }

  symbol: string;
  source: string;
  name: string;
  priceChangePercentage1h: string;
  priceChangePercentage24h: string;
  price: string;
  errorMessage: string;
  warnMessage: string;
  bscScanUrl: string;
  pooCoinUrl: string;
}
