"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requireAdmin = exports.authenticate = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var authenticate = exports.authenticate = function authenticate(req, res, next) {
  var _req$headers$authoriz;
  var token = (_req$headers$authoriz = req.headers.authorization) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(' ')[1];
  if (!token) {
    res.status(401).json({
      error: 'Authentication required'
    });
    return;
  }
  try {
    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Invalid or expired token'
    });
  }
};
var requireAdmin = exports.requireAdmin = function requireAdmin(req, res, next) {
  var _req$user;
  if (((_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.role) !== 'ADMIN') {
    res.status(403).json({
      error: 'Admin access required'
    });
    return;
  }
  next();
};