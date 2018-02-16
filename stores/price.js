global.fetch = require('node-fetch')
const cc = require('cryptocompare')
const coins = require('./coins')

class PriceStore {

    /**
     * Represents a PriceStore.
     * @constructor
     */
    constructor () {
        this.restTime = 10 * 1000; // rest time between fetches
        this.listeners = []; // listeners to call when prices fetch successfully

        this.prices = {};
        this.updateTime = null;
        this.ready = false;

        // start fetching
        this.fetch()
    }

    /**
     * Adds a listener to store's listeners
     * @param {Function} listener - Listener Function
     * @return {Number} Listener Index
     */
    listen (listener) {
        this.listeners.push(listener);
        return this.listeners.length - 1;
    }

    /**
     * Removes a listener from store's listeners
     * @param {Number} index  - Listener Index
     */
    unlisten (index) {
        this.listeners.splice(index, 1);
    }


    /**
     * Fetches prices from CryptoCompare
     */
    fetch () {

        cc.priceMulti(coins.all, coins.base).then(data => {

            // updating data
            this.prices = data;
            this.updateTime = Date.now();
            this.ready = true;
            
            // calling listeners
            for (let listener of this.listeners) listener(this.prices, this.updateTime)

            // recalling fetch function
            setTimeout(this.fetch.bind(this), this.restTime);

        })
        .catch(err => {

            // stderr the err
            console.error(err);

            // updating ready state
            this.ready = false;

            // recalling fetch function
            setTimeout(this.fetch.bind(this), this.restTime);

        })

    }

}

const priceStore = new PriceStore();

module.exports = priceStore;