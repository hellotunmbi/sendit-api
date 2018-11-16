// const jwt = require('jsonwebtoken');
import { Client } from 'pg';

const connectionString = process.env.DATABASE_URL;

const client = new Client({
	connectionString,
});
client.connect();


// LOGIN...
exports.getParcelsByUser = (req, res) => {
	const allQuery = {
		text: 'SELECT * FROM parcels where placedby=$1',
		values: [req.params.userid]
	};
	client
		.query(allQuery)
		.then(result => {
			res.json({
				status: 200,
				data: result.rows
			});
		})
		.catch(err => {
			res.json({ status: 400, data: err });
		});
};
