'use strict';

var _pg = require('pg');

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
exports.getAllParcels = async function (req, res) {
	var text = 'SELECT * FROM parcels';
	try {
		var _ref = await _models2.default.query(text),
		    rows = _ref.rows;

		if (rows[0]) {
			res.json({
				status: 200,
				data: rows
			});
		} else {
			res.json({
				'status': 400,
				'data': { 'message': 'Unable to retrieve parcels' }
			});
		}
	} catch (err) {
		res.json({ status: 400, data: err });
	}
};

// GET SINGLE PARCELS...
exports.getSingleParcel = async function (req, res) {
	var text = 'SELECT * FROM parcels where id=$1';
	try {
		var _ref2 = await _models2.default.query(text, [req.params.id]),
		    rows = _ref2.rows;

		if (rows[0]) {
			res.json({
				status: 200,
				data: rows[0]
			});
		} else {
			res.json({
				'status': 400,
				'data': { 'message': 'Parcel not found' }
			});
		}
	} catch (err) {
		res.json({ status: 400, data: err });
	}
};

// CANCEL PARCEL...
exports.cancelParcel = async function (req, res) {
	var text = 'UPDATE parcels set status = $1 where id = $2 returning id';
	try {
		var _ref3 = await _models2.default.query(text, ['cancelled', req.params.id]),
		    rows = _ref3.rows;

		if (rows[0]) {
			res.json({
				status: 200,
				data: [{
					'id': rows[0].id,
					'message': 'order cancelled'
				}]
			});
		} else {
			res.json({
				'status': 400,
				'data': { 'message': 'Parcel could not be canceled' }
			});
		}
	} catch (err) {
		res.json({ status: 400, data: err });
	}
};

// SAVE PARCEL...
exports.saveParcel = async function (req, res) {
	if (!req.body.placedby || !req.body.weight || !req.body.weightmetric || !req.body.deliveredon || !req.body.status || !req.body.from || !req.body.to || !req.body.currentlocation) {
		res.json({ status: 400, error: 'some paramenters are missing' });
	} else {
		var _req$body = req.body,
		    placedby = _req$body.placedby,
		    weight = _req$body.weight,
		    weightmetric = _req$body.weightmetric,
		    deliveredon = _req$body.deliveredon,
		    status = _req$body.status,
		    currentlocation = _req$body.currentlocation;

		var fromlocation = req.body.from;
		var tolocation = req.body.to;

		var text = 'INSERT INTO parcels (placedby, weight, weightmetric, senton, deliveredon, status, fromlocation, tolocation, currentlocation) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id';
		var values = [placedby, weight, weightmetric, (0, _moment2.default)(new Date()), deliveredon, status, fromlocation, tolocation, currentlocation];

		try {
			var _ref4 = await _models2.default.query(text, values),
			    rows = _ref4.rows;

			if (rows[0]) {
				res.json({
					'status': 200,
					'data': [{
						'id': rows[0].id,
						'message': 'order created'
					}]
				});
			} else {
				res.json({
					'status': 200,
					'data': [{
						'message': 'unable to create order'
					}]
				});
			}
		} catch (err) {
			res.json({ 'status': 400, 'data': err });
		}
	}
};

// CHANGE PARCEL DESTINATION...
exports.changeParcelDestination = async function (req, res) {
	if (!req.body.destination) {
		res.json({
			'status': 400,
			'error': 'enter destination'
		});
	} else {
		var text = 'UPDATE parcels SET tolocation = $1 WHERE id = $2::int  returning id';
		var values = [req.body.destination, req.params.id];

		try {
			var _ref5 = await _models2.default.query(text, values),
			    rows = _ref5.rows;

			if (rows[0]) {
				res.json({
					'status': 200,
					'data': [{
						'id': rows[0].id,
						'to': req.body.destination,
						'message': 'Parcel destination updated'
					}]
				});
			} else {
				res.json({ 'status': 400, 'data': { 'message': 'Parcel not updated' } });
			}
		} catch (err) {
			res.json({ status: 400, data: err });
		}
	}
};

// CHANGE PARCEL STATUS...
exports.changeParcelStatus = async function (req, res) {
	if (!req.body.status) {
		res.json({
			'status': 400,
			'error': 'enter status'
		});
	} else {
		var text = 'UPDATE parcels SET status = $1 WHERE id = $2::int returning id';
		var values = [req.body.status, req.params.id];

		try {
			var _ref6 = await _models2.default.query(text, values),
			    rows = _ref6.rows;

			if (rows[0]) {
				res.json({
					'status': 200,
					'data': [{
						'id': rows[0].id,
						'status': req.body.status,
						'message': 'Parcel status updated'
					}]
				});
			} else {
				res.json({
					'status': 400,
					'data': [{
						'message': 'Parcel status NOT updated'
					}]
				});
			}
		} catch (err) {
			res.json({ status: 400, data: err });
		}
	}
};

// CHANGE PARCEL CURRENT LOCATION...
exports.changeParcelCurrentLocation = async function (req, res) {
	if (!req.body.currentlocation) {
		res.json({
			'status': 400,
			'error': 'enter current location'
		});
	} else {
		var text = 'UPDATE parcels SET currentlocation = $1 WHERE id = $2::int  returning id';
		var values = [req.body.currentlocation, req.params.id];

		try {
			var _ref7 = await _models2.default.query(text, values),
			    rows = _ref7.rows;

			if (rows[0]) {
				res.json({
					'status': 200,
					'data': [{
						'id': rows[0].id,
						'currentLocation': req.body.currentlocation,
						'message': 'Parcel location updated'
					}]
				});
			} else {
				res.json({
					'status': 400,
					'data': [{
						'message': 'Parcel current location NOT updated'
					}]
				});
			}
		} catch (err) {
			res.json({ status: 400, data: err });
		}
	}
};