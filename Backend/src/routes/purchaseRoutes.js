"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _purchaseController = require("../controllers/purchaseController");
var _upload = _interopRequireDefault(require("../middleware/upload"));
var _auth = require("../middleware/auth");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post('/upload-receipt', _auth.authenticate, _upload["default"].single('receipt'), _purchaseController.uploadReceipt);
router.get('/admin/all', _auth.authenticate, _auth.requireAdmin, _purchaseController.getPendingPurchases);
router.patch('/admin/:id/status', _auth.authenticate, _auth.requireAdmin, _purchaseController.updatePurchaseStatus);
var _default = exports["default"] = router;