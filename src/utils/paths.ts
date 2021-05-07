import { config } from 'dotenv';

config();

// https://coinmarketcap.com/api/documentation/v1/#section/Endpoint-Overview

export const CMC_API_BASEURL = `https://pro-api.coinmarketcap.com/v1`;

/* 
#############
Api Prefixes
#############
*/

export const CMC_API_CRYPTOCURRENCY = `${CMC_API_BASEURL}/cryptocurrency`;
export const CMC_API_EXCHANGE = `${CMC_API_BASEURL}/exchange`;
export const CMC_API_TOOLS = `${CMC_API_BASEURL}/tools`;

/* 
#############
Api Endpoints - CMC_API_CRYPTOCURRENCY
#############
*/


export const CMC_API_CRYPTOCURRENCY__LISTINGS_LATEST = `${CMC_API_CRYPTOCURRENCY}/listings/latest`;
export const CMC_API_CRYPTOCURRENCY__LISTINGS_HISTORICAL = `${CMC_API_CRYPTOCURRENCY}/listings/historical`;




