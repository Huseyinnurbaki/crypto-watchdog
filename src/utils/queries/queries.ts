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
export const newToken = network => `
{
  ethereum(network: ${network}) {
    smartContractCalls(options: {desc: "block.height", limit: 10}, smartContractMethod: {is: "Contract Creation"}, smartContractType: {is: Token}) {
      block {
        height
        timestamp {
          time
        }
      }
      smartContract {
        contractType
        address {
          address
          annotation
        }
        currency {
          name
          symbol
          decimals
          tokenType
        }
      }
    }
  }
}
`;
