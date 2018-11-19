// const jwt = require('jsonwebtoken');
import { Pool } from 'pg';
import Helper from '../helpers';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
	connectionString,
});

try {
	pool.on('connect', () => {
		console.log('connected to the db');
	});
} catch (err) {
	console.log('unable to connect to db');
}

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
	pool.query(query)
		.then(result => {
			const token = Helper.generateToken(result.rows[0].id, req.body.email);
			res.json({
				'status': 200,
				'data': [{
					'token': token,
					'user': result.rows[0],
				}]
			});
			pool.end();
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
	const hashedPassword = Helper.hashPassword(req.body.password);
	console.log(hashedPassword);
	const query = {
		text: 'select * from users where email=$1 and password = $2',
		values: [
			req.body.email,
			hashedPassword
		]
	};

	pool.query(query)
		.then(() => {
			res.json({
				'status': 200,
				'data': res
			});
			pool.end();
		})
		.catch((err) => {res.json(
			{
				'status': 400,
				'data': err
			});
		}
		);
};
