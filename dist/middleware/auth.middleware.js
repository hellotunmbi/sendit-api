'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _pg = require('pg');

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionString = process.env.DATABASE_URL;

var client = new _pg.Client({
	connectionString: connectionString
});
client.connect();

exports.verifyToken = function (req, res, next) {
	var token = req.headers['x-access-token'];
	if (!token) return res.json({ 'status': 403, 'message': 'No token provided.' });

	_jsonwebtoken2.default.verify(token, process.env.SECRET, function (err, decoded) {
		if (err) return res.json({ 'status': 500, 'message': 'Failed to authenticate token.' });
		// if everything good, save to request for use in other routes
		req.userId = decoded.id;
		next();
	});
};

exports.verifyParcelOwnership = async function (req, res, next) {
	var parcelId = req.params.id;
	var userId = req.body.userId;

	if (!userId) return res.json({ status: 403, message: 'Please provide userId' });

	var text = 'SELECT placedby, id, status FROM parcels where id=$1 and placedby=$2';

	try {
		var _ref = await _models2.default.query(text, [parcelId, userId]),
		    rows = _ref.rows;

		if (rows[0]) {
			next();
		} else {
			res.json({ 'status': 403, 'data': { 'message': 'You are not the owner of this parcel' } });
		}
	} catch (err) {
		res.json({ status: 400, data: err });
	}
};