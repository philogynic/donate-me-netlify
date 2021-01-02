const midtransClient = require('midtrans-client');

exports.handler = async (event, context, callback) => {
    let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : false,
        serverKey : 'SB-Mid-server-RPIkHxFpG3BBH1zazgRyYwEd'
    });
    
    let parameter = {
        "transaction_details": {
            "order_id": "YOUR-ORDERID-" + Math.round(Math.random() * 100000),
            "gross_amount": 10000
        },
        "credit_card":{
            "secure" : true
        },
        "customer_details": {
            "first_name": "netlify",
            "last_name": "nice",
            "email": "netlify.nice@ex.com",
            "phone": "080000000161"
        }
    };

    const transactionToken = await snap.createTransaction(parameter)
        .then((transaction)=>{
            // transaction token
            const transactionToken = transaction.token;
            console.log('transactionToken:',transactionToken);
            return transactionToken
        })
        .catch((err) => {
            console.log(err.message)
        })

    return {
        statusCode: 200,
        body: JSON.stringify({'transactionToken': transactionToken})
    }
}