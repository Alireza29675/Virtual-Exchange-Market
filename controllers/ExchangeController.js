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
        this.orders = [];
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

        // If fund doesn't exist in wallet
        if (!wallet.funds[from]) {
            return {
                success: false,
                message: `Not enough ${from.toUpperCase()} to order! Remaining: ${wallet.funds[coin].amount}`
            }
        }

        // If not enough fund exist in wallet
        if (wallet.funds[from].amount < amount) {
            return {
                success: false,
                message: `Not enough ${from.toUpperCase()} to order! Remaining: ${wallet.funds[coin].amount}`
            }
        }

        // If everything was fine
        const order = new Order(amount, from, to)
        this.orders.push(order)
        return order;

    }
    

}

module.exports = ExchangeController;