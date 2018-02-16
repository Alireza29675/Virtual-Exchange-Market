const coins = require('./coins')

class WalletStore {

    /**
     * Represents a WalletStore
     * @constructor
     */
    constructor (initalFunds = {}) {

        // all wallet funds
        this.funds = initalFunds;

    }

    /**
     * Charge some amount
     * @param {String} coin - Coin Type (SYMBOL)
     * @param {Number} amount - Amount of charge
     * @return {Object} state object { success: Boolean, message: String }
     */
    charge (coin, amount) {

        // If coin didn't exist
        if (!coins.all.includes(coin)) {
            return {
                success: false,
                message: `This market doesn't support ${coin.toUpperCase()}!`
            }
        }

        // If fund doesn't exist in wallet
        if (!this.funds[coin]) {
            this.funds[coin] = {
                amount: amount,
                reservedAmount: 0
            }
            return {
                success: true,
                message: `${amount} ${coin.toUpperCase()} charged successfuly!`
            }
        }

        // If fund exists and it just want to charge
        this.funds[coin].amount += amount

    }

    /**
     * Discharge some amount
     * @param {String} coin - Coin Type (SYMBOL)
     * @param {Number} amount - Amount of discharge
     * @return {Object} state object { success: Boolean, message: String }
     */
    discharge (coin, amount) {

        // If coin didn't exist
        if (!coins.all.includes(coin)) {
            return {
                success: false,
                message: `This market doesn't support ${coin.toUpperCase()}!`
            }
        }

        // If fund doesn't exist in wallet
        if (!this.funds[coin]) {
            return {
                success: false,
                message: `Not enough ${coin.toUpperCase()} to discharge! Remaining: ${this.funds[coin].amount}`
            }
        }

        // If not enough fund exist in wallet
        if (this.funds[coin].amount < amount) {
            return {
                success: false,
                message: `Not enough ${coin.toUpperCase()} to discharge! Remaining: ${this.funds[coin].amount}`
            }
        }

        // If enough fund exists and it just want to discharge
        this.funds[coin].amount -= amount

    }

    /**
     * Deposit some amount
     * @param {String} coin - Coin Type (SYMBOL)
     * @param {Number} amount - Amount of Deposit
     * @return {Object} state object { success: Boolean, message: String }
     */
    deposit (coin, amount) {
        return this.charge(coin, amount)
    }

    /**
     * Withdraw some amount
     * @param {String} coin - Coin Type (SYMBOL)
     * @param {Number} amount - Amount of Withdraw
     * @return {Object} state object { success: Boolean, message: String }
     */
    withdraw (coin, amount) {
        return this.discharge(coin, amount)
    }

}

const walletStore = new WalletStore()

module.exports = walletStore;