'use strict';

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// LOGIN...
exports.getParcelsByUser = async function (req, res) {
	var text = 'SELECT * FROM parcels where placedby=$1';
	var values = [req.params.userid];

	try {
		var _ref = await _models2.default.query(text, values),
		    rows = _ref.rows;

		if (rows[0]) {
			res.json({
				'status': 200,
				'data': rows
			});
		} else {
			res.json({ 'status': 200, 'data': { 'message': 'No parcel found' } });
		}
	} catch (err) {
		res.json({ 'status': 400, 'data': err });
	}
};