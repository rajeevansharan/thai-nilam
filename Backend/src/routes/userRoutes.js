"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _userController = require("../controllers/userController");
var _auth = require("../middleware/auth");
var router = (0, _express.Router)();
router.post('/login', _userController.login);
router.post('/register', _userController.register);

// Admin only routes
router.get('/users', _auth.authenticate, _auth.requireAdmin, _userController.getAllUsers);
router.put('/users/:id', _auth.authenticate, _auth.requireAdmin, _userController.updateUser);
router["delete"]('/users/:id', _auth.authenticate, _auth.requireAdmin, _userController.deleteUser);

// Authenticated user routes
router.post('/favorites/toggle', _auth.authenticate, _userController.toggleFavorite);
router.get('/favorites/:userId', _auth.authenticate, _userController.getFavorites);
var _default = exports["default"] = router;