'use strict';

var _pg = require('pg');

var connectionString = process.env.DATABASE_URL; // const jwt = require('jsonwebtoken');


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

// GET ALL PARCELS...
exports.getAllParcels = function (req, res) {
	var allQuery = {
		text: 'SELECT * FROM parcels'
	};
	pool.query(allQuery).then(function (result) {
		pool.end();
		res.json({
			status: 200,
			data: result.rows
		});
	}).catch(function (err) {
		res.json({ status: 400, data: err });
	});
};

// GET SINGLE PARCELS...
exports.getSingleParcel = function (req, res) {
	var allQuery = {
		text: 'SELECT * FROM parcels where id=$1',
		values: [req.params.id]
	};
	pool.query(allQuery).then(function (result) {
		res.json({
			status: 200,
			data: result.rows
		});
		pool.end();
	}).catch(function (err) {
		res.json({ status: 400, data: err });
	});
};

// CANCEL PARCEL...
exports.cancelParcel = function (req, res) {
	var cancelQuery = {
		text: 'UPDATE parcels set status = $1',
		values: ['cancelled']
	};
	pool.query(cancelQuery).then(function () {
		pool.end();
		res.json({
			'status': 200,
			'message': 'order cancelled'
		});
	}).catch(function (err) {
		res.json({ status: 400, data: err });
	});
};

// SAVE PARCEL...
exports.saveParcel = function (req, res) {
	if (!req.body.placedby || !req.body.weight || !req.body.weightmetric || !req.body.senton || !req.body.deliveredon || !req.body.status || !req.body.from || !req.body.to || !req.body.currentlocation) {
		res.json({ status: 400, error: 'some paramenters are missing' });
	} else {
		var _req$body = req.body,
		    placedby = _req$body.placedby,
		    weight = _req$body.weight,
		    weightmetric = _req$body.weightmetric,
		    senton = _req$body.senton,
		    deliveredon = _req$body.deliveredon,
		    status = _req$body.status,
		    currentlocation = _req$body.currentlocation;

		var fromlocation = req.body.from;
		var tolocation = req.body.to;
		var saveQuery = {
			text: 'INSERT INTO parcels (placedby, weight, weightmetric, senton, deliveredon, status, fromlocation, tolocation, currentlocation) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id',
			values: [placedby, weight, weightmetric, senton, deliveredon, status, fromlocation, tolocation, currentlocation] };
		pool.query(saveQuery).then(function (result) {
			pool.end();
			res.json({
				status: 200,
				data: [{
					id: result.rows[0].id,
					message: 'order created'
				}]
			});
		}).catch(function (err) {
			res.json({ status: 400, data: err });
		});
	}
};

// CHANGE PARCEL DESTINATION...
exports.changeParcelDestination = function (req, res) {
	if (!req.body.destination) {
		res.json({
			'status': 400,
			'error': 'enter destination'
		});
	} else {
		var changeQuery = {
			text: 'UPDATE parcels SET tolocation = $1 WHERE id = $2::int  returning id',
			values: [req.body.destination, req.params.id]
		};
		pool.query(changeQuery).then(function (result) {
			pool.end();
			res.json({
				'status': 200,
				'data': [{
					'id': result.rows[0].id,
					'to': req.body.destination,
					'message': 'Parcel destination updated'
				}]
			});
		}).catch(function (err) {
			res.json({ status: 400, data: err });
		});
	}
};

// CHANGE PARCEL STATUS...
exports.changeParcelStatus = function (req, res) {
	if (!req.body.status) {
		res.json({
			'status': 400,
			'error': 'enter status'
		});
	} else {
		var changeQuery = {
			text: 'UPDATE parcels SET status = $1 WHERE id = $2::int returning id',
			values: [req.body.status, req.params.id]
		};
		pool.query(changeQuery).then(function (result) {
			pool.end();
			res.json({
				'status': 200,
				'data': [{
					'id': result.rows[0].id,
					'status': req.body.status,
					'message': 'Parcel status updated'
				}]
			});
		}).catch(function (err) {
			res.json({ status: 400, data: err });
		});
	}
};

// CHANGE PARCEL CURRENT LOCATION...
exports.changeParcelCurrentLocation = function (req, res) {
	if (!req.body.currentlocation) {
		res.json({
			'status': 400,
			'error': 'enter current location'
		});
	} else {
		var changeQuery = {
			text: 'UPDATE parcels SET currentlocation = $1 WHERE id = $2::int  returning id',
			values: [req.body.currentlocation, req.params.id]
		};
		pool.query(changeQuery).then(function (result) {
			pool.end();
			res.json({
				'status': 200,
				'data': [{
					'id': result.rows[0].id,
					'currentLocation': req.body.currentlocation,
					'message': 'Parcel location updated'
				}]
			});
		}).catch(function (err) {
			res.json({ status: 400, data: err });
		});
	}
};