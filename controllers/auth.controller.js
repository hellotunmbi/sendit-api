// const jwt = require('jsonwebtoken');
import { Client } from 'pg';

const connectionString = 'postgres://postgres:password@localhost:5432/senditdb';

const client = new Client({
	connectionString,
});
client.connect();


exports.students = (req, res) => {
	client.query('SELECT * FROM students where id = $1', [3], (err, result) => {
		client.end();
		if (err) {
			console.log(err);
			res.send(err);
		}
		res.send(result.rows);
	});
};

// SIGNUP...
exports.signup = (req, res) => {
	const { firstname, lastname, othernames, email, isAdmin } = req.body;
	const query = {
		text: 'INSERT INTO users(firstname, lastname, othernames, email, registered, isadmin) VALUES($1, $2, $3, $4, NOW(), $5)',
		values: [
			firstname,
			lastname,
			othernames,
			email,
			isAdmin
		]
	};
	client.query(query)
		.then(result => {
			client.end();
			res.json({
				'status': 200,
				'data': [{
					'user': req.body,
				}]
			});
		})
		.catch(err => res.json({
			'status': 400,
			'data': err
		}));
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
