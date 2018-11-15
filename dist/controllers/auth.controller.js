'use strict';

var _pg = require('pg');

var connectionString = 'postgres://postgres:password@localhost:5432/senditdb'; // const jwt = require('jsonwebtoken');


var client = new _pg.Client({
	connectionString: connectionString
});
client.connect();

exports.students = function (req, res) {
	client.query('SELECT * FROM students where id = $1', [3], function (err, result) {
		client.end();
		if (err) {
			console.log(err);
			res.send(err);
		}
		res.send(result.rows);
	});
};

// SIGNUP...
exports.signup = function (req, res) {
	var _req$body = req.body,
	    firstname = _req$body.firstname,
	    lastname = _req$body.lastname,
	    othernames = _req$body.othernames,
	    email = _req$body.email,
	    isAdmin = _req$body.isAdmin;

	var query = {
		text: 'INSERT INTO users(firstname, lastname, othernames, email, registered, isadmin) VALUES($1, $2, $3, $4, NOW(), $5)',
		values: [firstname, lastname, othernames, email, isAdmin]
	};
	client.query(query).then(function (result) {
		client.end();
		res.json({
			'status': 200,
			'data': [{
				'user': req.body
			}]
		});
	}).catch(function (err) {
		return res.json({
			'status': 400,
			'data': err
		});
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