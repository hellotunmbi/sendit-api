'use strict';

var _pg = require('pg');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _helpers = require('../helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionString = process.env.DATABASE_URL; // const jwt = require('jsonwebtoken');


var client = new _pg.Client({
	connectionString: connectionString
});
client.connect();

// SIGNUP...
exports.signup = function (req, res) {
	var hashedPassword = _helpers2.default.hashPassword(req.body.password);
	var _req$body = req.body,
	    firstname = _req$body.firstname,
	    lastname = _req$body.lastname,
	    othernames = _req$body.othernames,
	    email = _req$body.email,
	    isAdmin = _req$body.isAdmin;

	var query = {
		text: 'INSERT INTO users(firstname, lastname, othernames, email, registered, isadmin, password) VALUES($1, $2, $3, $4, NOW(), $5, $6) returning *',
		values: [firstname, lastname, othernames, email, isAdmin, hashedPassword]
	};
	client.query(query).then(function (result) {
		var token = _helpers2.default.generateToken(result.rows[0].id, req.body.email);
		res.json({
			'status': 200,
			'data': [{
				'token': token,
				'user': result.rows[0]
			}]
		});
	}).catch(function (err) {
		if (err.routine === '_bt_check_unique') {
			res.json({ 'status': 400, 'message': 'Email address has already been taken' });
		} else {
			res.json({ 'status': 400, 'data': err });
		}
	});
};

// LOGIN...
exports.login = function (req, res) {
	var query = {
		text: 'SELECT * FROM users where email=$1 and password=$2',
		values: [req.body.email, req.body.password]
	};

	client.query(query).then(function () {
		res.json({
			'status': 200,
			'data': res
		});
	}).catch(function (err) {
		return res.json({
			'status': 400,
			'data': err
		});
	});
};