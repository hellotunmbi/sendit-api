import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
const argv = require('minimist')(process.argv.slice(2));
const swaggerUi = require('swagger-ui-express'),

	swaggerDocument = require('./swagger.json');
dotenv.config({ path: 'variables.env' });

const subpath = express();


// ROUTES...
const auth = require('./routes/auth.route');
const users = require('./routes/users.route');
const parcels = require('./routes/parcels.route');
const authMiddleware = require('./middleware/auth.middleware');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/v1/api-docs', subpath);
const swagger = require('swagger-node-express').createNew(subpath);
app.use(express.static('docs'));

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
if (argv.domain !== undefined)
	domain = argv.domain;
else
	console.log('No --domain=xxx specified, taking default hostname "localhost".');

// Set and display the application URL
var applicationUrl = 'http://' + domain + ':' + port;
console.log('snapJob API running on ' + applicationUrl);

swagger.setAppHandler(app);
swagger.configure(applicationUrl, '1.0.0');




// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api/v1/', (req, res) => {
	res.json('Welcome to Home of SendIT');
});
app.use('/api/v1/auth', auth);
app.use('/api/v1/parcels', authMiddleware.verifyToken, parcels);
app.use('/api/v1/users', authMiddleware.verifyToken, users);

let port = 1234;

const server = app.listen(process.env.PORT || port, () => {
	console.log(`Server now up and running on port ${port}`);
});

module.exports = server;