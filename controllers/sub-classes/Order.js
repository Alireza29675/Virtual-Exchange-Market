const priceStore = require('../../stores/price')
const wallet = require('../../stores/wallet')

class Order {

    /**
     * Represents an Order
     * @param {Number} amount - From's Amount
     * @param {String} from - From Coin
     * @param {String} to - To Coin
     */
    constructor (amount, from, to) {
        
        // identity card
        this.amount = amount;
        this.from = from;
        this.to = to;

        // put amount to reserved amount
        wallet.funds[from].amount -= amount;
        wallet.funds[from].reservedAmount += amount;

        // check if order accepted
        this.check();

        // also check order when prices has been changed
        priceStore.listen(this.check.bind(this));

    }

    /**
     * Checks if order is accepted
     */
    check () {

    }

}

module.exports = Order;