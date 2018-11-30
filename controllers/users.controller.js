import db from '../models';

// LOGIN...
exports.getParcelsByUser = async (req, res) => {
	const text = 'SELECT * FROM parcels where placedby=$1';
	const values = [req.params.userid];

	try {
		const { rows } = await db.query(text, values);

		if (rows[0]) {
			res.json({
				'status': 200,
				'data': rows
			});
		} else {
			res.json({ 'status': 200, 'data': { 'message': 'No parcel found' } });
		}
	} catch(err) {
		res.json({ 'status': 400, 'data': err });
	}
};
