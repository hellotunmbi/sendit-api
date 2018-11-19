'use strict';

var _pg = require('pg');

var connectionString = process.env.DATABASE_URL; // const jwt = require('jsonwebtoken');


var client = new _pg.Client({
	connectionString: connectionString
});
client.connect();

// LOGIN...
exports.getParcelsByUser = function (req, res) {
	var allQuery = {
		text: 'SELECT * FROM parcels where placedby=$1',
		values: [req.params.userid]
	};
	client.query(allQuery).then(function (result) {
		res.json({
			status: 200,
			data: result.rows
		});
	}).catch(function (err) {
		res.json({ status: 400, data: err });
	});
};