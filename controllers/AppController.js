const priceStore = require('../stores/price')
const wallet = require('../stores/wallet')

const ExchangeController = require('./ExchangeController')

class AppController {

    /**
     * Represents an AppController
     * @constructor
     */
    constructor() {

        // inital test deposit (1 BTC)
        wallet.deposit('BTC', 1)

        // initializing controllers
        this.exchangeController = new ExchangeController()

        const order = this.exchangeController.order(1, 'BTC', 'ETH', 10.74)
        
        setInterval(() => {
            console.log('----------------------------')
            console.log(this.exchangeController.orders)
            console.log(priceStore.prices['BTC']['ETH'])
            console.log(wallet.funds)
        }, 1000)

    }
    
}

module.exports = AppController;