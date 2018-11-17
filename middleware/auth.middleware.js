import jwt from 'jsonwebtoken';
import { Client } from 'pg';

const connectionString = process.env.DATABASE_URL;

const client = new Client({
	connectionString
});
client.connect();

exports.verifyToken = (req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token)
		return res.json({ 'status': 403, 'message': 'No token provided.' });

	jwt.verify(token, process.env.SECRET, function (err, decoded) {
		if (err)
			return res.json({ 'status': 500, 'message': 'Failed to authenticate token.' });
		// if everything good, save to request for use in other routes
		req.userId = decoded.id;
		next();
	});

};


exports.verifyParcelOwnership = (req, res, next) => {
	const parcelId = req.params.id;
	const userId = req.params.userId;
	if (!userId) return res.json({ status: 403, message: 'No token provided.' });

	const allQuery = { text: 'SELECT placedby, id, status FROM parcels where id=$1 and placedby=$2', values: [parcelId, userId] };
	client
		.query(allQuery)
		.then(result => {
			res.json({ status: 200, data: result.rows });
		})
		.catch(err => res.json({ status: 400, data: err }));
};

