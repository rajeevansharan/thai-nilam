"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _issueController = require("../controllers/issueController");
var _upload = _interopRequireDefault(require("../middleware/upload"));
var _auth = require("../middleware/auth");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
router.post('/', _auth.authenticate, _auth.requireAdmin, _upload["default"].fields([{
  name: 'pdf',
  maxCount: 1
}, {
  name: 'image',
  maxCount: 1
}, {
  name: 'contentImages',
  maxCount: 5
}]), _issueController.createIssue);
router.put('/:id', _auth.authenticate, _auth.requireAdmin, _upload["default"].fields([{
  name: 'pdf',
  maxCount: 1
}, {
  name: 'image',
  maxCount: 1
}, {
  name: 'contentImages',
  maxCount: 5
}]), _issueController.updateIssue);
router["delete"]('/:id', _auth.authenticate, _auth.requireAdmin, _issueController.deleteIssue);
router.get('/', _issueController.getAllIssues);
router.get('/recent', _issueController.getRecentIssues);
var _default = exports["default"] = router;