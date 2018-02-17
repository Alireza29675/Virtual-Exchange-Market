const priceStore = require('../stores/price')
const wallet = require('../stores/wallet')

const ExchangeController = require('./ExchangeController')

class AppController {

    /**
     * Represents an AppController
     * @constructor
     */
    constructor() {

        // Initilizing wallet to access from out
        this.wallet = wallet;

        // Initializing controllers
        this.exchange = new ExchangeController();

    }

    /**
     * Creates a sell/buy order to exchange market
     * @param {String} type - order type ("buy" | "sell")
     * @param {Object} options - order options { from: String, to: String, amount: Number, price: Number }
     * @return {Order|Object} state object { success: Boolean, message: String } 
     */
    createOrder (type, options) {

        // validating amount
        if (!options.amount || typeof options.amount !== 'number') return {
            success: false,
            message: `"amount" property must be defined and be a "number"!`
        }

        // validating from
        if (!options.from || typeof options.from !== 'string') return {
            success: false,
            message: `"from" property must be defined and be a "string"!`
        }

        // validating to
        if (!options.to || typeof options.to !== 'string') return {
            success: false,
            message: `"to" property must be defined and be a "string"!`
        }

        // validating price
        if (!options.price || typeof options.price !== 'number') return {
            success: false,
            message: `"price" property must be defined and be a "number"!`
        }
        
        // If order type was sell
        if (type.toLowerCase() === 'sell') {
            return this.exchange.sellOrder(options.amount, options.from, options.to, options.price)
        }

        // If order type was buy
        if (type.toLowerCase() === 'buy') {
            return this.exchange.buyOrder(options.amount, options.from, options.to, options.price)
        }
    }

    /**
     * Cancels an order by UUID
     * @param {Number} uuid - Order's UUID
     * @return {Object} state object { success: Boolean, message: String }
     */
    cancelOrder (uuid) {
        return this.exchange.cancelOrder(uuid)
    }

    /**
     * Returns coin's balance from wallet
     * @param {String} coin - Coin Type (SYMBOL)
     * @return {Object} Coin's balance { amount: Number, reservedAmount: Number }
     */
    getBalance (coin) {
        return this.wallet.funds[coin]
    }

    /**
     * Connects a JSON File to wallet
     * @param {String} file - JSON file path
     * @return {Object} state object { success: Boolean, message: String }
     */
    connectWalletTo (file) {
        return this.wallet.connect(file)
    }
    
}

module.exports = AppController;