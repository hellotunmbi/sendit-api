// const jwt = require('jsonwebtoken');
import Helper from '../helpers';
import db from '../models';

// SIGNUP...
exports.signup = async (req, res) => {
	const hashedPassword = Helper.hashPassword(req.body.password);
	const { firstname, lastname, othernames, email, isAdmin } = req.body;
	const text = 'INSERT INTO users(firstname, lastname, othernames, email, registered, isadmin, password) VALUES($1, $2, $3, $4, NOW(), $5, $6) returning *';
	try {
		const {rows} = await db.query(text, [	firstname, lastname, othernames, email, isAdmin, hashedPassword ]);
		const token = Helper.generateToken(rows[0].id, req.body.email);
		if(!rows[0]) {
			res.json({ 'status': 400, 'data': 'Unable to insert' });
		} else {
			res.json({
				'status': 200,
				'data': [{
					'token': token,
					'user': rows[0],
				}]
			});
		}
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
	const text = 'select * from users where email=$1';

	try {
		const { rows } = await db.query(text, [req.body.email]);
		// res.json({'result': rows});
		if(!rows[0]) {
			res.json({
				'status': 400,
				'data': 'Invalid Login'
			});
		} else {
			const isPasswordCorrect = Helper.comparePassword(rows[0].password, req.body.password);
			if (!isPasswordCorrect) {
				res.json({
					'status': 400,
					'data': 'Invalid Login credentials'
				});
			} else {
				const token = Helper.generateToken(rows[0].id, req.body.email);
				res.json({
					'status': 200,
					'data': [{
						'token': token,
						'user': rows[0]
					}]
				});
			}
		}
	} catch(error) {
		res.json({ 'status': 400, 'data': error });
	}

};
