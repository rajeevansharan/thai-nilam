"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supabase = void 0;
var _supabaseJs = require("@supabase/supabase-js");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var supabaseUrl = process.env.SUPABASE_URL || '';
var supabaseKey = process.env.SUPABASE_KEY || '';
var supabase = exports.supabase = (0, _supabaseJs.createClient)(supabaseUrl, supabaseKey);