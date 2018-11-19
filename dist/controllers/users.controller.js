'use strict';

var _pg = require('pg');

var connectionString = process.env.DATABASE_URL;

var pool = new _pg.Pool({
	connectionString: connectionString
});

try {
	pool.on('connect', function () {
		console.log('connected to the db');
	});
} catch (err) {
	console.log('unable to connect to db');
}

// LOGIN...
exports.getParcelsByUser = function (req, res) {
	var allQuery = {
		text: 'SELECT * FROM parcels where placedby=$1',
		values: [req.params.userid]
	};
	pool.query(allQuery).then(function (result) {
		res.json({
			status: 200,
			data: result.rows
		});
		pool.end();
	}).catch(function (err) {
		res.json({ status: 400, data: err });
		pool.end();
	});
};