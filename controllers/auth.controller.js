// const jwt = require('jsonwebtoken');
import { Pool } from 'pg';
import Helper from '../helpers';
import db from '../models';

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
exports.signup = async (req, res) => {
	const hashedPassword = Helper.hashPassword(req.body.password);
	const { firstname, lastname, othernames, email, isAdmin } = req.body;
	// const query = {
	// 	text: 'INSERT INTO users(firstname, lastname, othernames, email, registered, isadmin, password) VALUES($1, $2, $3, $4, NOW(), $5, $6) returning *',
	// 	values: [
	// 		firstname,
	// 		lastname,
	// 		othernames,
	// 		email,
	// 		isAdmin,
	// 		hashedPassword
	// 	]
	// };
	const text = 'INSERT INTO users(firstname, lastname, othernames, email, registered, isadmin, password) VALUES($1, $2, $3, $4, NOW(), $5, $6) returning *';
	try {
		const {rows} = await db.query(text, [	firstname, lastname, othernames, email, isAdmin, hashedPassword ]);
		const token = Helper.generateToken(rows[0].id, req.body.email);
		if(!rows[0]) {
			res.json({ 'status': 400, 'data': 'Unable to insert' });
		}
		res.json({
			'status': 200,
			'data': [{
				'token': token,
				'user': rows[0],
			}]
		});
	} catch(err) {
		if (err.routine === '_bt_check_unique') {
			res.json({ 'status': 400,	'message': 'Email address has already been taken'});
		} else {
			res.json({ 'status': 400,	'data': err	});
		}
	}
};


// LOGIN...
exports.login = async (req, res) => {
	const hashedPassword = Helper.hashPassword(req.body.password);
	console.log(hashedPassword);
	const text = 'select * from users where email=$1 and password = $2';
	// const query = {
	// 	text: 'select * from users where email=$1 and password = $2',
	// 	values: [
	// 		req.body.email,
	// 		hashedPassword
	// 	]
	// };

	try {
		const { rows } = await db.query(text, [req.body.email, hashedPassword]);
		if(!rows[0]) {
			res.json({
				'status': 400,
				'data': 'Invalid Login'
			});
		}
		res.json({
			'status': 200,
			'data': rows[0]
		});
	} catch(error) {
		res.json({ 'status': 400, 'data': error });
	}

};
