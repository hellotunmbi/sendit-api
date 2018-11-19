import { Pool } from 'pg';

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


// LOGIN...
exports.getParcelsByUser = (req, res) => {
	const allQuery = {
		text: 'SELECT * FROM parcels where placedby=$1',
		values: [req.params.userid]
	};
	pool
		.query(allQuery)
		.then(result => {
			res.json({
				status: 200,
				data: result.rows
			});
			pool.end();
		})
		.catch(err => {
			res.json({ status: 400, data: err });
			pool.end();
		});
};
