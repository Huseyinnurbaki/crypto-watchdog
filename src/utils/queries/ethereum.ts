export const ethereum = `
{
  ethereum(network: bsc) {
    dexTrades(options: {limit: 10, asc: "baseAmount"}) {
      baseCurrency {
        address
        name
        symbol
      }
      baseAmount(in: USD)
      count
    }
  }
}
`;
