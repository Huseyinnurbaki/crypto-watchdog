// https://coinmarketcap.com/api/documentation/v1/#section/Endpoint-Overview
export const CMC_API_BASEURL = `https://pro-api.coinmarketcap.com/v1`;

// https://www.coingecko.com/tr/api#explore-api
export const COINGECKO_API_BASEURL = `https://api.coingecko.com/api/v3`;

/* 
#############
Api Prefixes
#############
*/

// CMC
export const CMC_API_CRYPTOCURRENCY = `${CMC_API_BASEURL}/cryptocurrency`;

// COIN GECKO
export const COINGECKO_API_CRYPTOCURRENCY = `${COINGECKO_API_BASEURL}/coins`;

/* 
#############
Api Endpoints - CMC_API_CRYPTOCURRENCY
#############
*/
export const CMC_API_CRYPTOCURRENCY__LISTINGS_LATEST = `${CMC_API_CRYPTOCURRENCY}/listings/latest`;

/* 
#############
Api Endpoints - COIN_GECKO_API_CRYPTOCURRENCY
#############
*/
export const COINGECKO_API__LISTINGS_LATEST = `${COINGECKO_API_CRYPTOCURRENCY}/markets`;

/*
#############
Github Api
#############
*/

export const GITHUB_RELEASES = 'https://api.github.com/repos/Huseyinnurbaki/crypto-watchdog/releases';
