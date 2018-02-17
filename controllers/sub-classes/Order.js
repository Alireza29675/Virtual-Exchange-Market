const priceStore = require('../../stores/price')
const wallet = require('../../stores/wallet')

class Order {

    /**
     * Represents an Order
     * @param {Number} amount - From's Amount
     * @param {String} from - From Coin
     * @param {String} to - To Coin
     * @param {Number} price - Order Price
     */
    constructor (exchangeController, uuid, amount, from, to, price) {

        this.exchangeController = exchangeController;
        
        // identity variables
        this.uuid = uuid;
        this.amount = amount;
        this.from = from;
        this.to = to;
        this.price = price;
        this.completed = false;

        // put amount to reserved amount
        wallet.funds[from].amount -= amount;
        wallet.funds[from].reservedAmount += amount;

        // also check order when prices has been changed
        priceStore.listen(this.check.bind(this));

    }

    /**
     * Checks if order is accepted
     */
    check () {

        if (priceStore.prices[this.from]) {

            // current price of this exchange
            const currentPrice = priceStore.prices[this.from][this.to];

            // comparing order price with current price
            if (currentPrice <= this.price && !this.completed) {

                wallet.funds[this.from].reservedAmount -= this.amount;
                wallet.charge(this.to, this.amount * currentPrice);
                this.completed = true;

                // canceling the order
                this.cancel();

            }
        }

    }

    /**
     * Cancels the Order
     */
    cancel () {

        // if order cancels before compeleting we should return reservedAmount to amount
        if (!this.completed) {
            wallet.funds[this.from].amount += this.amount;
            wallet.funds[this.from].reservedAmount -= this.amount;
        }

        // removing order from exchangeController orders
        this.exchangeController.cancelOrder(this.uuid)
    }

}

module.exports = Order;