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
     * Puts an sell/buy order to exchange market
     * @param {String} type - order type ("buy" | "sell")
     * @param {Object} options - order options { from: String, to: String, amount: Number, price: Number }
     */
    order (type, options) {
        
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
     * Connects a JSON File to wallet
     * @param {String} file - JSON file path
     */
    connectWalletTo (file) {
        this.wallet.connect(file)
    }
    
}

module.exports = AppController;