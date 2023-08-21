const midtransClient = require('midtrans-client');

let core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: 'SB-Mid-server-QOyZiWPKznszZjZfoNEXvh33',
    clientKey: 'SB-Mid-client-ba8dUvYEJf93DMRl'
})

export default {
    core
}