"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _paymentController = require("../controllers/paymentController");
var _auth = require("../middleware/auth");
var router = (0, _express.Router)();

// Endpoint for the frontend to get PayHere parameters and the secure hash
router.post('/initiate', _auth.authenticate, _paymentController.generatePaymentParams);

// Webhook endpoint for PayHere to notify backend of payment status
router.post('/notify', _paymentController.handlePaymentNotification);
var _default = exports["default"] = router;