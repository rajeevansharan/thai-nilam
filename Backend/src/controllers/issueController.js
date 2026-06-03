"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateIssue = exports.getRecentIssues = exports.getAllIssues = exports.deleteIssue = exports.createIssue = void 0;
var _prisma = _interopRequireDefault(require("../config/prisma"));
var _storageService = require("../services/storageService");
var _excluded = ["purchases", "favorites"],
  _excluded2 = ["purchases", "favorites"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var createIssue = exports.createIssue = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, title, description, month, year, price, files, pdfUrl, imageUrl, contentImageFiles, contentImageUrls, issue, _t, _t2, _t3;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _req$body = req.body, title = _req$body.title, description = _req$body.description, month = _req$body.month, year = _req$body.year, price = _req$body.price;
          files = req.files;
          if (!files['pdf']) {
            _context.n = 2;
            break;
          }
          _context.n = 1;
          return (0, _storageService.uploadFile)(files['pdf'][0], 'pdfs');
        case 1:
          _t = _context.v;
          _context.n = 3;
          break;
        case 2:
          _t = '';
        case 3:
          pdfUrl = _t;
          if (!files['image']) {
            _context.n = 5;
            break;
          }
          _context.n = 4;
          return (0, _storageService.uploadFile)(files['image'][0], 'images');
        case 4:
          _t2 = _context.v;
          _context.n = 6;
          break;
        case 5:
          _t2 = '';
        case 6:
          imageUrl = _t2;
          contentImageFiles = files['contentImages'] || [];
          if (!(!pdfUrl || !imageUrl)) {
            _context.n = 7;
            break;
          }
          res.status(400).json({
            error: 'PDF and Image are required'
          });
          return _context.a(2);
        case 7:
          _context.n = 8;
          return Promise.all(contentImageFiles.map(function (file) {
            return (0, _storageService.uploadFile)(file, 'images');
          }));
        case 8:
          contentImageUrls = _context.v;
          _context.n = 9;
          return _prisma["default"].issue.create({
            data: {
              title: title,
              description: description,
              month: month,
              year: year,
              pdfUrl: pdfUrl,
              imageUrl: imageUrl,
              price: price ? parseFloat(price) : undefined,
              contentImages: {
                create: contentImageUrls.map(function (url) {
                  return {
                    url: url
                  };
                })
              }
            },
            include: {
              contentImages: true
            }
          });
        case 9:
          issue = _context.v;
          res.status(201).json(issue);
          _context.n = 11;
          break;
        case 10:
          _context.p = 10;
          _t3 = _context.v;
          console.error('Create issue error:', _t3);
          res.status(500).json({
            error: 'Failed to create issue'
          });
        case 11:
          return _context.a(2);
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function createIssue(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getAllIssues = exports.getAllIssues = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$query, month, year, rawUserId, userId, filter, issues, formattedIssues, _t4;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _req$query = req.query, month = _req$query.month, year = _req$query.year, rawUserId = _req$query.userId;
          userId = rawUserId ? parseInt(rawUserId) : undefined;
          filter = {};
          if (month && month !== 'All') {
            filter.month = month;
          }
          if (year && year !== 'All') {
            filter.year = year;
          }
          _context2.n = 1;
          return _prisma["default"].issue.findMany({
            where: filter,
            orderBy: {
              createdAt: 'desc'
            },
            include: {
              contentImages: true,
              favorites: userId ? {
                where: {
                  userId: userId
                }
              } : false,
              purchases: userId ? {
                where: {
                  userId: userId,
                  status: 'paid'
                }
              } : false
            }
          });
        case 1:
          issues = _context2.v;
          formattedIssues = issues.map(function (issue) {
            var _ref3 = issue,
              purchases = _ref3.purchases,
              favorites = _ref3.favorites,
              rest = _objectWithoutProperties(_ref3, _excluded);
            return _objectSpread(_objectSpread({}, rest), {}, {
              isPurchased: purchases ? purchases.length > 0 : false,
              isFavorite: favorites ? favorites.length > 0 : false
            });
          });
          res.json(formattedIssues);
          _context2.n = 3;
          break;
        case 2:
          _context2.p = 2;
          _t4 = _context2.v;
          console.error('Fetch issues error:', _t4);
          res.status(500).json({
            error: 'Failed to fetch issues'
          });
        case 3:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 2]]);
  }));
  return function getAllIssues(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getRecentIssues = exports.getRecentIssues = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var rawUserId, userId, issues, formattedIssues, _t5;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          rawUserId = req.query.userId;
          userId = rawUserId ? parseInt(rawUserId) : undefined;
          _context3.n = 1;
          return _prisma["default"].issue.findMany({
            take: 3,
            orderBy: {
              createdAt: 'desc'
            },
            include: {
              contentImages: true,
              favorites: userId ? {
                where: {
                  userId: userId
                }
              } : false,
              purchases: userId ? {
                where: {
                  userId: userId,
                  status: 'paid'
                }
              } : false
            }
          });
        case 1:
          issues = _context3.v;
          formattedIssues = issues.map(function (issue) {
            var _ref5 = issue,
              purchases = _ref5.purchases,
              favorites = _ref5.favorites,
              rest = _objectWithoutProperties(_ref5, _excluded2);
            return _objectSpread(_objectSpread({}, rest), {}, {
              isPurchased: purchases ? purchases.length > 0 : false,
              isFavorite: favorites ? favorites.length > 0 : false
            });
          });
          res.json(formattedIssues);
          _context3.n = 3;
          break;
        case 2:
          _context3.p = 2;
          _t5 = _context3.v;
          console.error('Fetch recent issues error:', _t5);
          res.status(500).json({
            error: 'Failed to fetch recent issues'
          });
        case 3:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return function getRecentIssues(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
var updateIssue = exports.updateIssue = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var id, _req$body2, title, description, month, year, price, files, updateData, _files$pdf, _files$image, contentImageFiles, contentImageUrls, updatedIssue, _t6;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          id = req.params.id;
          _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, month = _req$body2.month, year = _req$body2.year, price = _req$body2.price;
          files = req.files;
          updateData = {
            title: title,
            description: description,
            month: month,
            year: year,
            price: price ? parseFloat(price) : undefined
          };
          if (!files) {
            _context4.n = 7;
            break;
          }
          if (!((_files$pdf = files['pdf']) !== null && _files$pdf !== void 0 && _files$pdf[0])) {
            _context4.n = 2;
            break;
          }
          _context4.n = 1;
          return (0, _storageService.uploadFile)(files['pdf'][0], 'pdfs');
        case 1:
          updateData.pdfUrl = _context4.v;
        case 2:
          if (!((_files$image = files['image']) !== null && _files$image !== void 0 && _files$image[0])) {
            _context4.n = 4;
            break;
          }
          _context4.n = 3;
          return (0, _storageService.uploadFile)(files['image'][0], 'images');
        case 3:
          updateData.imageUrl = _context4.v;
        case 4:
          if (!files['contentImages']) {
            _context4.n = 7;
            break;
          }
          contentImageFiles = files['contentImages'];
          _context4.n = 5;
          return Promise.all(contentImageFiles.map(function (file) {
            return (0, _storageService.uploadFile)(file, 'images');
          }));
        case 5:
          contentImageUrls = _context4.v;
          _context4.n = 6;
          return _prisma["default"].contentImage.deleteMany({
            where: {
              issueId: parseInt(id)
            }
          });
        case 6:
          updateData.contentImages = {
            create: contentImageUrls.map(function (url) {
              return {
                url: url
              };
            })
          };
        case 7:
          _context4.n = 8;
          return _prisma["default"].issue.update({
            where: {
              id: parseInt(id)
            },
            data: updateData,
            include: {
              contentImages: true
            }
          });
        case 8:
          updatedIssue = _context4.v;
          res.json(updatedIssue);
          _context4.n = 10;
          break;
        case 9:
          _context4.p = 9;
          _t6 = _context4.v;
          console.error('Update error:', _t6);
          res.status(500).json({
            error: 'Failed to update issue'
          });
        case 10:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function updateIssue(_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();
var deleteIssue = exports.deleteIssue = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var id, _t7;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          id = req.params.id;
          _context5.n = 1;
          return _prisma["default"].issue["delete"]({
            where: {
              id: parseInt(id)
            }
          });
        case 1:
          res.status(200).json({
            message: 'Issue deleted successfully'
          });
          _context5.n = 3;
          break;
        case 2:
          _context5.p = 2;
          _t7 = _context5.v;
          console.error('Delete error:', _t7);
          res.status(500).json({
            error: 'Failed to delete issue'
          });
        case 3:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 2]]);
  }));
  return function deleteIssue(_x9, _x0) {
    return _ref7.apply(this, arguments);
  };
}();