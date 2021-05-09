
# Custom Hooks

- Provide your webhook url (CUSTOM_CHANNEL_HOOK) to active custom webhook feature. 
- Always refer to the [CustomHook model](https://raw.githubusercontent.com/Huseyinnurbaki/crypto-watchdog/master/src/modules/notify/dto/custom-hook.model.ts)
- You will recieve array of CustomHook model inside data object.
- There are 3 modes
- Healthy CustomHook model, includes information about the cryptocurrency.
- Warn is used to display messages such as "there is a newer version". Warnings will include only source & warnMessage field.
- Error is used to display errors such as misconfigurations etc. Errors will include only source & errorMessage field.
- If data is empty, no message will be published until next query.

> Open an issue if your services require any authentication placed in header.
> You will not recieve informaiton or error mesages for the features you did not activate.
## Example of a healthy, wrning & error models.


```json
data: [
.....
{
errorMessage:'',
name:'Pirate Chain',
price:'7.08000000',
priceChangePercentage1h:'-26.42',
priceChangePercentage24h:'-3.93',
source:'Coin Gecko',
symbol:'ARRR',
warnMessage:''
},
{
errorMessage:'',
name:'',
price:'',
priceChangePercentage1h:'',
priceChangePercentage24h:'',
source:'Crypto Watchdog',
symbol:'',
warnMessage:'Newer version avaliable !'
},
{
eerrorMessage:'Check your configs',
name:'',
price:'',
priceChangePercentage1h:'',
priceChangePercentage24h:'',
source:'Coin Market Cap',
symbol:'',
warnMessage:''
}
.......
]

```