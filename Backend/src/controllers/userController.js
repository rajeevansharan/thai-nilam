"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.toggleFavorite = exports.register = exports.login = exports.getFavorites = exports.getAllUsers = exports.deleteUser = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _prisma = _interopRequireDefault(require("../config/prisma"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var SALT_ROUNDS = 12;
var register = exports.register = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, name, email, password, existingUser, hashedPassword, user, token, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context.n = 1;
          return _prisma["default"].user.findUnique({
            where: {
              email: email
            }
          });
        case 1:
          existingUser = _context.v;
          if (!existingUser) {
            _context.n = 2;
            break;
          }
          res.status(400).json({
            error: 'User already exists'
          });
          return _context.a(2);
        case 2:
          _context.n = 3;
          return _bcrypt["default"].hash(password, SALT_ROUNDS);
        case 3:
          hashedPassword = _context.v;
          _context.n = 4;
          return _prisma["default"].user.create({
            data: {
              name: name,
              email: email,
              password: hashedPassword
            }
          });
        case 4:
          user = _context.v;
          token = _jsonwebtoken["default"].sign({
            id: user.id,
            role: user.role
          }, process.env.JWT_SECRET, {
            expiresIn: '7d'
          });
          res.status(201).json({
            token: token,
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            isPremium: user.isPremium
          });
          _context.n = 6;
          break;
        case 5:
          _context.p = 5;
          _t = _context.v;
          console.error('Registration error:', _t);
          res.status(500).json({
            error: 'Registration failed'
          });
        case 6:
          return _context.a(2);
      }
    }, _callee, null, [[0, 5]]);
  }));
  return function register(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var login = exports.login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$body2, email, password, user, isMatch, token, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.n = 1;
          return _prisma["default"].user.findUnique({
            where: {
              email: email
            }
          });
        case 1:
          user = _context2.v;
          if (user) {
            _context2.n = 2;
            break;
          }
          res.status(401).json({
            error: 'Invalid email or password'
          });
          return _context2.a(2);
        case 2:
          _context2.n = 3;
          return _bcrypt["default"].compare(password, user.password);
        case 3:
          isMatch = _context2.v;
          if (isMatch) {
            _context2.n = 4;
            break;
          }
          res.status(401).json({
            error: 'Invalid email or password'
          });
          return _context2.a(2);
        case 4:
          token = _jsonwebtoken["default"].sign({
            id: user.id,
            role: user.role
          }, process.env.JWT_SECRET, {
            expiresIn: '7d'
          });
          res.json({
            token: token,
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            isPremium: user.isPremium
          });
          _context2.n = 6;
          break;
        case 5:
          _context2.p = 5;
          _t2 = _context2.v;
          console.error('Login error:', _t2);
          res.status(500).json({
            error: 'Login failed'
          });
        case 6:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 5]]);
  }));
  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getAllUsers = exports.getAllUsers = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var users, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _context3.n = 1;
          return _prisma["default"].user.findMany({
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              isPremium: true,
              createdAt: true
            },
            orderBy: {
              createdAt: 'desc'
            }
          });
        case 1:
          users = _context3.v;
          res.json(users);
          _context3.n = 3;
          break;
        case 2:
          _context3.p = 2;
          _t3 = _context3.v;
          console.error('Fetch users error:', _t3);
          res.status(500).json({
            error: 'Failed to fetch users'
          });
        case 3:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return function getAllUsers(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var toggleFavorite = exports.toggleFavorite = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _req$body3, userId, magazineIssueId, existingFavorite, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          _req$body3 = req.body, userId = _req$body3.userId, magazineIssueId = _req$body3.magazineIssueId;
          if (!(!userId || !magazineIssueId)) {
            _context4.n = 1;
            break;
          }
          res.status(400).json({
            error: 'Missing userId or magazineIssueId'
          });
          return _context4.a(2);
        case 1:
          _context4.n = 2;
          return _prisma["default"].favorite.findUnique({
            where: {
              userId_magazineIssueId: {
                userId: Number(userId),
                magazineIssueId: Number(magazineIssueId)
              }
            }
          });
        case 2:
          existingFavorite = _context4.v;
          if (!existingFavorite) {
            _context4.n = 4;
            break;
          }
          _context4.n = 3;
          return _prisma["default"].favorite["delete"]({
            where: {
              id: existingFavorite.id
            }
          });
        case 3:
          res.json({
            message: 'Removed from favorites'
          });
          _context4.n = 6;
          break;
        case 4:
          _context4.n = 5;
          return _prisma["default"].favorite.create({
            data: {
              userId: Number(userId),
              magazineIssueId: Number(magazineIssueId)
            }
          });
        case 5:
          res.json({
            message: 'Added to favorites'
          });
        case 6:
          _context4.n = 8;
          break;
        case 7:
          _context4.p = 7;
          _t4 = _context4.v;
          console.error('Toggle favorite error:', _t4);
          res.status(500).json({
            error: 'Failed to toggle favorite'
          });
        case 8:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function toggleFavorite(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getFavorites = exports.getFavorites = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var userId, favorites, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          userId = req.params.userId;
          if (userId) {
            _context5.n = 1;
            break;
          }
          res.status(400).json({
            error: 'Missing userId'
          });
          return _context5.a(2);
        case 1:
          _context5.n = 2;
          return _prisma["default"].favorite.findMany({
            where: {
              userId: Number(userId)
            },
            include: {
              issue: true
            },
            orderBy: {
              createdAt: 'desc'
            }
          });
        case 2:
          favorites = _context5.v;
          res.json(favorites.map(function (f) {
            return f.issue;
          }));
          _context5.n = 4;
          break;
        case 3:
          _context5.p = 3;
          _t5 = _context5.v;
          console.error('Fetch favorites error:', _t5);
          res.status(500).json({
            error: 'Failed to fetch favorites'
          });
        case 4:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 3]]);
  }));
  return function getFavorites(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
var deleteUser = exports.deleteUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var id, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          id = req.params.id;
          _context6.n = 1;
          return _prisma["default"].user["delete"]({
            where: {
              id: Number(id)
            }
          });
        case 1:
          res.json({
            message: 'User deleted successfully'
          });
          _context6.n = 3;
          break;
        case 2:
          _context6.p = 2;
          _t6 = _context6.v;
          console.error('Delete user error:', _t6);
          res.status(500).json({
            error: 'Failed to delete user'
          });
        case 3:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 2]]);
  }));
  return function deleteUser(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
var updateUser = exports.updateUser = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var id, _req$body4, role, isPremium, updatedUser, _t7;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.p = 0;
          id = req.params.id;
          _req$body4 = req.body, role = _req$body4.role, isPremium = _req$body4.isPremium;
          _context7.n = 1;
          return _prisma["default"].user.update({
            where: {
              id: Number(id)
            },
            data: {
              role: role,
              isPremium: isPremium
            },
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              isPremium: true,
              createdAt: true
            }
          });
        case 1:
          updatedUser = _context7.v;
          res.json(updatedUser);
          _context7.n = 3;
          break;
        case 2:
          _context7.p = 2;
          _t7 = _context7.v;
          console.error('Update user error:', _t7);
          res.status(500).json({
            error: 'Failed to update user'
          });
        case 3:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 2]]);
  }));
  return function updateUser(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();