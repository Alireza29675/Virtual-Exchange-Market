const priceStore = require('../stores/price')
const wallet = require('../stores/wallet')

class AppController {

    /**
     * Represents an AppController
     * @constructor
     */
    constructor() {

        // inital test deposit (1 BTC)
        wallet.deposit('BTC', 1)

    }
    
}

module.exports = AppController;