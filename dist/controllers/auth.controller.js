'use strict';

var _helpers = require('../helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// SIGNUP...
// const jwt = require('jsonwebtoken');
exports.signup = async function (req, res) {
	var hashedPassword = _helpers2.default.hashPassword(req.body.password);
	var _req$body = req.body,
	    firstname = _req$body.firstname,
	    lastname = _req$body.lastname,
	    othernames = _req$body.othernames,
	    email = _req$body.email,
	    isAdmin = _req$body.isAdmin;

	var text = 'INSERT INTO users(firstname, lastname, othernames, email, registered, isadmin, password) VALUES($1, $2, $3, $4, NOW(), $5, $6) returning *';
	try {
		var _ref = await _models2.default.query(text, [firstname, lastname, othernames, email, isAdmin, hashedPassword]),
		    rows = _ref.rows;

		var token = _helpers2.default.generateToken(rows[0].id, req.body.email);
		if (!rows[0]) {
			res.json({ 'status': 400, 'data': 'Unable to insert' });
		} else {
			res.json({
				'status': 200,
				'data': [{
					'token': token,
					'user': rows[0]
				}]
			});
		}
	} catch (err) {
		if (err.routine === '_bt_check_unique') {
			res.json({ 'status': 400, 'message': 'Email address has already been taken' });
		} else {
			res.json({ 'status': 400, 'data': err });
		}
	}
};

// LOGIN...
exports.login = async function (req, res) {
	var text = 'select * from users where email=$1';

	try {
		var _ref2 = await _models2.default.query(text, [req.body.email]),
		    rows = _ref2.rows;
		// res.json({'result': rows});


		if (!rows[0]) {
			res.json({
				'status': 400,
				'data': 'Invalid Login'
			});
		} else {
			var isPasswordCorrect = _helpers2.default.comparePassword(rows[0].password, req.body.password);
			if (!isPasswordCorrect) {
				res.json({
					'status': 400,
					'data': 'Invalid Login credentials'
				});
			} else {
				var token = _helpers2.default.generateToken(rows[0].id, req.body.email);
				res.json({
					'status': 200,
					'data': [{
						'token': token,
						'user': rows[0]
					}]
				});
			}
		}
	} catch (error) {
		res.json({ 'status': 400, 'data': error });
	}
};