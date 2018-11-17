// const jwt = require('jsonwebtoken');
import { Client } from 'pg';
import jwt from 'jsonwebtoken';
import Helper from '../helpers';

const connectionString = process.env.DATABASE_URL;

const client = new Client({
	connectionString,
});
client.connect();

// SIGNUP...
exports.signup = (req, res) => {
	const hashedPassword = Helper.hashPassword(req.body.password);
	const { firstname, lastname, othernames, email, isAdmin } = req.body;
	const query = {
		text: 'INSERT INTO users(firstname, lastname, othernames, email, registered, isadmin, password) VALUES($1, $2, $3, $4, NOW(), $5, $6) returning *',
		values: [
			firstname,
			lastname,
			othernames,
			email,
			isAdmin,
			hashedPassword
		]
	};
	client.query(query)
		.then(result => {
			const token = Helper.generateToken(result.rows[0].id, req.body.email);
			res.json({
				'status': 200,
				'data': [{
					'token': token,
					'user': result.rows[0],
				}]
			});
		})
		.catch(err => {
			if (err.routine === '_bt_check_unique') {
				res.json({ 'status': 400,	'message': 'Email address has already been taken'});
			} else {
				res.json({ 'status': 400,	'data': err	});
			}
		});
};

// LOGIN...
exports.login = (req, res) => {
	const query = {
		text: 'SELECT * FROM users where email=$1 and password=$2',
		values: [
			req.body.email,
			req.body.password
		]
	};

	client.query(query)
		.then(() => {
			res.json({
				'status': 200,
				'data': res
			});
		})
		.catch((err) => res.json(
			{
				'status': 400,
				'data': err
			})
		);
};
