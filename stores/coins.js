const base = ['BTC', 'USDT', 'ETH', 'LTC', 'ETC', 'BCH'];
const other = ['NEO', 'QTUM', 'GAS', 'DOGE', 'DASH'];

module.exports = {
    baseCoins: base,
    otherCoins: base.concat(other)
}