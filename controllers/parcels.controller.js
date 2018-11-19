// const jwt = require('jsonwebtoken');
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

// GET ALL PARCELS...
exports.getAllParcels = (req, res) => {
	const allQuery = {
		text: 'SELECT * FROM parcels'
	};
	pool
		.query(allQuery)
		.then(result => {
			pool.end();
			res.json({
				status: 200,
				data: result.rows
			});
		})
		.catch(err => { res.json({ status: 400, data: err }); });
};


// GET SINGLE PARCELS...
exports.getSingleParcel = (req, res) => {
	const allQuery = {
		text: 'SELECT * FROM parcels where id=$1',
		values: [req.params.id]
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
		.catch(err => { res.json({ status: 400, data: err });  });
};



// CANCEL PARCEL...
exports.cancelParcel = (req, res) => {
	const cancelQuery = {
		text: 'UPDATE parcels set status = $1',
		values: ['cancelled']
	};
	pool
		.query(cancelQuery)
		.then(() => {
			pool.end();
			res.json({
				'status': 200,
				'message': 'order cancelled'
			});
		})
		.catch(err => { res.json({ status: 400, data: err }); });
};


// SAVE PARCEL...
exports.saveParcel = (req, res) => {
	if (!req.body.placedby || !req.body.weight || !req.body.weightmetric || !req.body.senton || !req.body.deliveredon || !req.body.status || !req.body.from || !req.body.to || !req.body.currentlocation) {
		res.json({ status: 400, error: 'some paramenters are missing' });
	} else {
		const { placedby, weight, weightmetric, senton, deliveredon, status, currentlocation } = req.body;
		const fromlocation = req.body.from;
		const tolocation = req.body.to;
		const saveQuery = {
			text: 'INSERT INTO parcels (placedby, weight, weightmetric, senton, deliveredon, status, fromlocation, tolocation, currentlocation) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id',
			values: [placedby, weight, weightmetric, senton, deliveredon, status, fromlocation, tolocation, currentlocation] };
		pool
			.query(saveQuery)
			.then(result => {
				pool.end();
				res.json({
					status: 200,
					data: [
						{
							id: result.rows[0].id,
							message: 'order created'
						}
					]
				});
			})
			.catch(err => { res.json({ status: 400, data: err }); });
	}
};



// CHANGE PARCEL DESTINATION...
exports.changeParcelDestination = (req, res) => {
	if(!req.body.destination) {
		res.json({
			'status': 400,
			'error': 'enter destination'
		});
	} else {
		const changeQuery = {
			text: 'UPDATE parcels SET tolocation = $1 WHERE id = $2::int  returning id',
			values: [
				req.body.destination,
				req.params.id
			]
		};
		pool
			.query(changeQuery)
			.then((result) => {
				pool.end();
				res.json({
					'status': 200,
					'data': [
						{
							'id': result.rows[0].id,
							'to': req.body.destination,
							'message': 'Parcel destination updated'
						}
					]
				});
			})
			.catch(err => { res.json({ status: 400, data: err }); });
	}
};



// CHANGE PARCEL STATUS...
exports.changeParcelStatus = (req, res) => {
	if (!req.body.status) {
		res.json({
			'status': 400,
			'error': 'enter status'
		});
	} else {
		const changeQuery = {
			text: 'UPDATE parcels SET status = $1 WHERE id = $2::int returning id',
			values: [
				req.body.status,
				req.params.id
			]
		};
		pool
			.query(changeQuery)
			.then((result) => {
				pool.end();
				res.json({
					'status': 200,
					'data': [
						{
							'id': result.rows[0].id,
							'status': req.body.status,
							'message': 'Parcel status updated'
						}
					]
				});
			})
			.catch(err => { res.json({ status: 400, data: err }); });
	}
};


// CHANGE PARCEL CURRENT LOCATION...
exports.changeParcelCurrentLocation = (req, res) => {
	if (!req.body.currentlocation) {
		res.json({
			'status': 400,
			'error': 'enter current location'
		});
	} else {
		const changeQuery = {
			text: 'UPDATE parcels SET currentlocation = $1 WHERE id = $2::int  returning id',
			values: [
				req.body.currentlocation,
				req.params.id
			]
		};
		pool
			.query(changeQuery)
			.then((result) => {
				pool.end();
				res.json({
					'status': 200,
					'data': [
						{
							'id': result.rows[0].id,
							'currentLocation': req.body.currentlocation,
							'message': 'Parcel location updated'
						}
					]
				});
			})
			.catch(err => { res.json({ status: 400, data: err }); });
	}
};

