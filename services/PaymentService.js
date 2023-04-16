const axios = require("axios");

class PaymentService {
  async createPayment() {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: "test_user_847743437@testuser.com",
      items: [
        {
          id: 'website_basic',
          title: "Website",
          description: "Dummy description",
          picture_url: "https://static.wixstatic.com/media/ea6ac8_b6b0cbe25615488e855f515846354dda~mv2.jpg/v1/fill/w_640,h_420,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/ea6ac8_b6b0cbe25615488e855f515846354dda~mv2.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: 1000
        }
      ],
      back_urls: {
        failure: `${process.env.NGROK_URL}/status/failure`,
        pending: `${process.env.NGROK_URL}/status/pending`,
        success: `${process.env.NGROK_URL}/status/success`
      }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });



    return payment.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 400,
        currency_id: "ARS"
      },
      back_url: process.env.NGROK_URL,
      payer_email: "test_user_847743437@testuser.com"
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return subscription.data;
  }
}

module.exports = PaymentService;
