'use strict';

const paypal = require('paypal-rest-sdk');
const payments = paypal.v1.payments;


let env;
if (process.env.NODE_ENV === 'production') {
  // Live Account details
  env = new paypal.core.LiveEnvironment('Your Live Client ID', 'Your Live Client Secret');
} else {
  env = new paypal.core.SandboxEnvironment('AdV4d6nLHabWLyemrw4BKdO9LjcnioNIOgoz7vD611ObbDUL0kJQfzrdhXEBwnH8QmV-7XZjvjRWn0kg', 'EPKoPC_haZMTq5uM9WXuzoxUVdgzVqHyD5avCyVC1NCIUJeVaNNUZMnzduYIqrdw-carG9LBAizFGMyK');
}

let client = new paypal.core.PayPalHttpClient(env);

let payment = {
  "intent": "sale",
  "transactions": [{
    "item_list": {
        "items": [{
            "name": "item",
            "sku": "item",
            "price": "1.00",
            "currency": "USD",
            "quantity": 1
        }]
    },
    "amount": {
        "currency": "USD",
        "total": "1.00"
    },
    "description": "This is the payment description."
    }],
  "redirect_urls": {
    "cancel_url": "http://example.com/cancel",
    "return_url": "http://example.com/return"
  },
  "payer": {
    "payment_method": "paypal"
  }
};




let request = new payments.PaymentCreateRequest();
request.requestBody(payment);

module.exports.run = function() {
    client.execute(request).then((response) => {
        return response.result
    // console.log(response.statusCode);
    // console.log(response.result);
    }).catch((error) => {
    // console.error(error.statusCode);
    // console.error(error.message);
        return error.message
    });
}