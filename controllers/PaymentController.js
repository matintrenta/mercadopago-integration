class PaymentController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService;
  }

  async getPaymentLink(req, res) {
    try {
      const payment = await this.subscriptionService.createPayment();

      return res.json(payment);
    } catch (error) {
      console.log(error.message);

      return res
        .status(500)
        .json({ error: true, msg: "Failed to create payment" });
    }
  }

  async getSubscriptionLink(req, res) {
    try {
      const subscription = await this.subscriptionService.createSubscription();

      return res.json(subscription);
    } catch (error) {
      console.log(error.message);

      return res
        .status(500)
        .json({ error: true, msg: "Failed to create subscription" });
    }
  }

  async getSubscriptionByEmail(req, res) {
    try {
      const subscription = await this.subscriptionService.searchSubscription();

      return res.json(subscription);
    } catch (error) {
      console.log(error.message);

      return res
        .status(500)
        .json(error);
    }
  }

  async getPaymentByEmail(req, res) {
    try {
      const subscription = await this.subscriptionService.searchPayment();

      return res.json(subscription);
    } catch (error) {
      console.log(error.message);

      return res
        .status(500)
        .json(error);
    }
  }
}

module.exports = PaymentController;
