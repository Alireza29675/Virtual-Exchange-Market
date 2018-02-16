global.fetch = require('node-fetch')
const cc = require('cryptocompare')
const coins = require('./coins')

cc.priceMulti(coins.otherCoins, coins.baseCoins).then(console.log)