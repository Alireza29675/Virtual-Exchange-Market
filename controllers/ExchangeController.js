const uuidv4 = require('uuid/v4');

const coins = require('../stores/coins')
const priceStore = require('../stores/price')
const wallet = require('../stores/wallet')

const Order = require('./sub-classes/Order')

class ExchangeController {

    /**
     * Represents an ExchangeController
     * @constructor
     */
    constructor() {
        // all open orders
        this.orders = {};
    }

    /**
     * Puts a sell/buy order in exchange market
     * @param {Number} amount - From's Amount
     * @param {String} from - From Coin
     * @param {String} to - To Coin
     * @param {Number} price - Order Price
     * @return {Order|Object} state object { success: Boolean, message: String }
     */
    order (amount, from, to, price) {

        // If coin didn't exist
        if (!coins.all.includes(from)) {
            return {
                success: false,
                message: `This market doesn't support ${from.toUpperCase()}!`
            }
        }
        if (!coins.all.includes(to)) {
            return {
                success: false,
                message: `This market doesn't support ${to.toUpperCase()}!`
            }
        }

        // If fund doesn't exist in wallet
        if (!wallet.funds[from]) {
            return {
                success: false,
                message: `Not enough ${from.toUpperCase()} to order! Remaining: 0`
            }
        }

        // If not enough fund exist in wallet
        if (wallet.funds[from].amount < amount) {
            return {
                success: false,
                message: `Not enough ${from.toUpperCase()} to order! Remaining: ${wallet.funds[from].amount}`
            }
        }

        // If everything was fine
        const uuid = uuidv4();
        const order = new Order(this, uuid, amount, from, to, price)
        this.orders[uuid] = order;
        return order;

    }

    /**
     * Puts a sell order in exchange market
     * @param {Number} amount - From's Amount
     * @param {String} from - Buy Coin
     * @param {String} to - Sell Coin
     * @param {Number} price - Order Price
     * @return {Order|Object} state object { success: Boolean, message: String }
     */
    sellOrder (amount, from, to, price) {
        return this.order(amount, to, from, (1 / price))
    }

    /**
     * Puts a buy order in exchange market
     * @param {Number} amount - From's Amount
     * @param {String} from - From Coin
     * @param {String} to - To Coin
     * @param {Number} price - Order Price
     * @return {Order|Object} state object { success: Boolean, message: String }
     */
    buyOrder (amount, from, to, price) {
        return this.order(amount, from, to, price)
    }

    /**
     * Cancels an order by it's uuid
     * @param {Number} uuid - Order's UUID
     * @return {Object} state object { success: Boolean, message: String }
     */
    cancelOrder (uuid) {
        this.orders[uuid] = null;
        delete this.orders[uuid];
        return {
            success: true,
            message: `Order {${uuid}} canceled successfuly!`
        }
    }
    

}

module.exports = ExchangeController;