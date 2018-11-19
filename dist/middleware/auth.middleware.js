'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _pg = require('pg');

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

exports.verifyParcelOwnership = function (req, res, next) {
	var parcelId = req.params.id;
	var userId = req.params.userId;
	if (!userId) return res.json({ status: 403, message: 'No token provided.' });

	var allQuery = { text: 'SELECT placedby, id, status FROM parcels where id=$1 and placedby=$2', values: [parcelId, userId] };
	client.query(allQuery).then(function (result) {
		res.json({ status: 200, data: result.rows });
	}).catch(function (err) {
		return res.json({ status: 400, data: err });
	});
};