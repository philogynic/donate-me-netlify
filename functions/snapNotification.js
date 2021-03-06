const midtransClient = require('midtrans-client');

exports.handler = async (event, context, callback) => {
    let apiClient = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : false,
        serverKey : 'SB-Mid-server-RPIkHxFpG3BBH1zazgRyYwEd',
        clientKey: 'SB-Mid-client-OFR_K5ME8oifxlc6'
    });

    const notificationJson = event.body
    
    statusResponse = await apiClient.transaction.notification(notificationJson)
        .then((statusResponse) => {
            let orderId = statusResponse.order_id;
            let transactionStatus = statusResponse.transaction_status;
            let fraudStatus = statusResponse.fraud_status;

            console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);
            return statusResponse
        })


    return {
        statusCode: 200,
        body: JSON.stringify({'transactionToken': statusResponse})
    }
}