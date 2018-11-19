'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ path: 'variables.env' });

// ROUTES...
var auth = require('./routes/auth.route');
var users = require('./routes/users.route');
var parcels = require('./routes/parcels.route');
var authMiddleware = require('./middleware/auth.middleware');

var app = (0, _express2.default)();
app.use((0, _morgan2.default)('combined'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cors2.default)());

app.get('/api/v1/', function (req, res) {
	res.json('Welcome to Home of SendIT');
});
app.use('/api/v1/auth', auth);
app.use('/api/v1/parcels', authMiddleware.verifyToken, parcels);
app.use('/api/v1/users', authMiddleware.verifyToken, users);

var port = 1234;

var server = app.listen(process.env.PORT || port, function () {
	console.log('Server now up and running on port ' + port);
});

module.exports = server;