"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _path = _interopRequireDefault(require("path"));
var _issueRoutes = _interopRequireDefault(require("./routes/issueRoutes"));
var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));
var _paymentRoutes = _interopRequireDefault(require("./routes/paymentRoutes"));
var _purchaseRoutes = _interopRequireDefault(require("./routes/purchaseRoutes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
var PORT = process.env.PORT || 5000;

// Middlewares
app.use((0, _cors["default"])({
  origin: ["http://localhost:5173",
  // for local testing
  "https://thai-nilam.vercel.app" // <-- your deployed frontend URL
  ],
  credentials: true
}));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));

// Serve static files (Uploaded PDFs and Images)
app.use('/uploads', _express["default"]["static"](_path["default"].join(__dirname, '../uploads')));

// Routes
app.use('/api/issues', _issueRoutes["default"]);
app.use('/api/users', _userRoutes["default"]);
app.use('/api/payments', _paymentRoutes["default"]);
app.use('/api/purchases', _purchaseRoutes["default"]);

// Basic route for health check
app.get('/', function (req, res) {
  res.send('ThaiNilam Backend is running...');
});
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});