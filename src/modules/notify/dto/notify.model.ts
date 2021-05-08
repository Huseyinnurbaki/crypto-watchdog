export class NotifyModel {
  constructor(source: string) {
    this.source = source
  }

  symbol: string
  source: string
  name: string
  priceChangePercentage1h: number
  priceChangePercentage24h: number
  price: number
  errorMessage: string
}