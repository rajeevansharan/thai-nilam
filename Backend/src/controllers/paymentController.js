"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlePaymentNotification = exports.generatePaymentParams = void 0;
var _crypto = _interopRequireDefault(require("crypto"));
var _prisma = _interopRequireDefault(require("../config/prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Helper to generate PayHere MD5 hash
var generateHash = function generateHash(merchantId, orderId, amount, currency, merchantSecret) {
  var amountFormatted = amount.toLocaleString('en-us', {
    minimumFractionDigits: 2
  }).split(',').join('');
  var secretHash = _crypto["default"].createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
  var mainString = merchantId + orderId + amountFormatted + currency + secretHash;
  return _crypto["default"].createHash('md5').update(mainString).digest('hex').toUpperCase();
};
var generatePaymentParams = exports.generatePaymentParams = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var userId, issueId, user, issue, existingPurchase, merchantId, merchantSecret, currency, amount, purchase, orderId, hash, paymentParams, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          userId = parseInt(req.body.userId);
          issueId = parseInt(req.body.issueId);
          if (!(isNaN(userId) || isNaN(issueId))) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(400).json({
            error: 'Invalid userId or issueId'
          }));
        case 1:
          _context.p = 1;
          _context.n = 2;
          return _prisma["default"].user.findUnique({
            where: {
              id: userId
            }
          });
        case 2:
          user = _context.v;
          _context.n = 3;
          return _prisma["default"].issue.findUnique({
            where: {
              id: issueId
            }
          });
        case 3:
          issue = _context.v;
          if (!(!user || !issue)) {
            _context.n = 4;
            break;
          }
          return _context.a(2, res.status(404).json({
            error: 'User or Issue not found'
          }));
        case 4:
          _context.n = 5;
          return _prisma["default"].purchase.findUnique({
            where: {
              userId_magazineIssueId: {
                userId: userId,
                magazineIssueId: issueId
              }
            }
          });
        case 5:
          existingPurchase = _context.v;
          if (!(existingPurchase && existingPurchase.status === 'paid')) {
            _context.n = 6;
            break;
          }
          return _context.a(2, res.status(400).json({
            error: 'Issue already purchased'
          }));
        case 6:
          // For PayHere Sandbox/Production configuration
          merchantId = process.env.PAYHERE_MERCHANT_ID || '';
          merchantSecret = process.env.PAYHERE_MERCHANT_SECRET || '';
          currency = 'LKR'; // Adjust as needed
          amount = issue.price || 500.00; // Use issue price or fallback
          // Create a pending purchase record
          _context.n = 7;
          return _prisma["default"].purchase.upsert({
            where: {
              userId_magazineIssueId: {
                userId: userId,
                magazineIssueId: issueId
              }
            },
            update: {
              status: 'pending',
              amount: amount
            },
            create: {
              userId: userId,
              magazineIssueId: issueId,
              amount: amount,
              status: 'pending'
            }
          });
        case 7:
          purchase = _context.v;
          orderId = String(purchase.id);
          hash = generateHash(merchantId, orderId, amount, currency, merchantSecret);
          paymentParams = {
            sandbox: process.env.NODE_ENV !== 'production',
            merchant_id: merchantId,
            return_url: "".concat(process.env.FRONTEND_URL, "/payment?status=success&issueId=").concat(issueId),
            cancel_url: "".concat(process.env.FRONTEND_URL, "/payment?status=cancel&issueId=").concat(issueId),
            notify_url: "".concat(process.env.BACKEND_URL, "/api/payments/notify"),
            order_id: orderId,
            items: "Thai Nilam Magazine - ".concat(issue.title || issue.month + ' ' + issue.year),
            amount: amount.toFixed(2),
            currency: currency,
            first_name: user.name.split(' ')[0],
            last_name: user.name.split(' ').slice(1).join(' ') || 'User',
            email: user.email,
            phone: '0712345678',
            // Placeholder, ideally from user.phone
            address: 'No. 1, Main Street',
            // Placeholder, ideally from user.address
            city: 'Colombo',
            country: 'Sri Lanka',
            hash: hash
          };
          return _context.a(2, res.json(paymentParams));
        case 8:
          _context.p = 8;
          _t = _context.v;
          console.error('Payment initiation error:', _t);
          return _context.a(2, res.status(500).json({
            error: 'Failed to initiate payment'
          }));
      }
    }, _callee, null, [[1, 8]]);
  }));
  return function generatePaymentParams(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var handlePaymentNotification = exports.handlePaymentNotification = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$body, merchant_id, raw_order_id, payhere_amount, payhere_currency, status_code, md5sig, order_id, merchantSecret, secretHash, localMd5Sig, _t2, _t3;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _req$body = req.body, merchant_id = _req$body.merchant_id, raw_order_id = _req$body.order_id, payhere_amount = _req$body.payhere_amount, payhere_currency = _req$body.payhere_currency, status_code = _req$body.status_code, md5sig = _req$body.md5sig;
          order_id = parseInt(raw_order_id);
          if (!isNaN(order_id)) {
            _context2.n = 1;
            break;
          }
          console.error('Invalid order_id received from PayHere:', raw_order_id);
          return _context2.a(2, res.status(400).send('Invalid order_id'));
        case 1:
          merchantSecret = process.env.PAYHERE_MERCHANT_SECRET || '';
          secretHash = _crypto["default"].createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
          localMd5Sig = _crypto["default"].createHash('md5').update(merchant_id + raw_order_id + payhere_amount + payhere_currency + status_code + secretHash).digest('hex').toUpperCase();
          if (!(localMd5Sig === md5sig && status_code === '2')) {
            _context2.n = 6;
            break;
          }
          _context2.p = 2;
          _context2.n = 3;
          return _prisma["default"].purchase.update({
            where: {
              id: order_id
            },
            data: {
              status: 'paid',
              paidAt: new Date()
            }
          });
        case 3:
          console.log("Payment successful for order: ".concat(order_id));
          _context2.n = 5;
          break;
        case 4:
          _context2.p = 4;
          _t2 = _context2.v;
          console.error('Notification update error:', _t2);
          return _context2.a(2, res.status(500).send('Error updating purchase'));
        case 5:
          _context2.n = 10;
          break;
        case 6:
          console.warn("Payment verification failed or status not success: ".concat(status_code, " for order ").concat(order_id));
          if (!(status_code === '-2')) {
            _context2.n = 10;
            break;
          }
          _context2.p = 7;
          _context2.n = 8;
          return _prisma["default"].purchase.update({
            where: {
              id: order_id
            },
            data: {
              status: 'failed'
            }
          });
        case 8:
          _context2.n = 10;
          break;
        case 9:
          _context2.p = 9;
          _t3 = _context2.v;
        case 10:
          return _context2.a(2, res.status(200).send('OK'));
      }
    }, _callee2, null, [[7, 9], [2, 4]]);
  }));
  return function handlePaymentNotification(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();