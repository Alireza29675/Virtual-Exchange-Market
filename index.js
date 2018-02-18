const AppController = require('./controllers/AppController')

const market = new AppController();

const order = market.createOrder('sell', {
    from: 'ETH',
    to: 'BTC',
    amount: 0.6,
    price: 0.088
});

setInterval(() => {

    console.log(
        market.getActiveOrders(),
        market.getTicker('ETH', 'BTC').price,
        market.wallet.funds
    )

}, 3000);