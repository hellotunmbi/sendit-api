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

var argv = require('minimist')(process.argv.slice(2));
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
_dotenv2.default.config({ path: 'variables.env' });

var subpath = (0, _express2.default)();

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

app.use('/v1/api-docs', subpath);
var swagger = require('swagger-node-express').createNew(subpath);
app.use(_express2.default.static('docs'));

swagger.setApiInfo({
	title: 'SendIT API',
	description: 'API Endpoints for SendIT Parcel delivery',
	termsOfServiceUrl: '',
	contact: 'hellotunmbi@gmail.com',
	license: '',
	licenseUrl: ''
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/docs/index.html');
});

// Set api-doc path
swagger.configureSwaggerPaths('', 'api-docs', '');

// Configure the API domain
var domain = 'localhost';
if (argv.domain !== undefined) domain = argv.domain;else console.log('No --domain=xxx specified, taking default hostname "localhost".');

// Set and display the application URL
var applicationUrl = 'http://' + domain + ':' + port;
console.log('snapJob API running on ' + applicationUrl);

swagger.setAppHandler(app);
swagger.configure(applicationUrl, '1.0.0');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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