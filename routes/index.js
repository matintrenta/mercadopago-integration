const express = require("express");
const router = express.Router();

const PaymentController = require("../controllers/PaymentController");
const PaymentService = require("../services/PaymentService");

const PaymentInstance = new PaymentController(new PaymentService());

router.get("/", function (req, res, next) {
  return res.json({
    "/payment": "generates a payment link",
    "/subscription": "generates a subscription link"
  });
});

router.get("/pay", function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res);
});

router.get("/sub", function (req, res, next) {
  PaymentInstance.getSubscriptionLink(req, res);
});

router.get("/search-sub", function (req, res, next) {
  PaymentInstance.getSubscriptionByEmail(req, res);
});

router.get("/search-pay", function (req, res, next) {
  PaymentInstance.getPaymentByEmail(req, res);
});

router.get("/success", function (req, res, next) {
  console.log(res.query)
  res.send('success! check query params info')
});

router.get("/status/:status", function (req, res, next) {
  res.send(req.query)
});

router.post("/notif", function (req, res, next) {
  console.log('notif\n', req.body)
  res.status(200).json({msg: 'received'})
});

module.exports = router;
