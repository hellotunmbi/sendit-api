// const jwt = require('jsonwebtoken');
import db from '../models';
import moment from 'moment';

// GET ALL PARCELS...
exports.getAllParcels = async (req, res) => {
	const text = 'SELECT * FROM parcels';
	try {
		const { rows } = await db.query(text);
		if(rows[0]) {
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
	}	catch(err) { res.json({ status: 400, data: err }); }
};


// GET SINGLE PARCELS...
exports.getSingleParcel = async (req, res) => {
	const text = 'SELECT * FROM parcels where id=$1';
	try {
		const { rows } = await db.query(text, [req.params.id]);
		if(rows[0]) {
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
	} catch(err) { res.json({ status: 400, data: err });  }
};



// CANCEL PARCEL...
exports.cancelParcel = async (req, res) => {
	const text = 'UPDATE parcels set status = $1 where id = $2 returning id';
	try {
		const { rows } = await db.query(text, ['cancelled', req.params.id]);
		if(rows[0]) {
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
	} catch(err) { res.json({ status: 400, data: err }); }
};


// SAVE PARCEL...
exports.saveParcel = async (req, res) => {
	if (!req.body.placedby || !req.body.weight || !req.body.weightmetric || !req.body.deliveredon || !req.body.status || !req.body.from || !req.body.to || !req.body.currentlocation) {
		res.json({ status: 400, error: 'some paramenters are missing' });
	} else {
		const { placedby, weight, weightmetric, deliveredon, status, currentlocation } = req.body;
		const fromlocation = req.body.from;
		const tolocation = req.body.to;

		const text = 'INSERT INTO parcels (placedby, weight, weightmetric, senton, deliveredon, status, fromlocation, tolocation, currentlocation) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id';
		const values = [placedby, weight, weightmetric, moment(new Date()), deliveredon, status, fromlocation, tolocation, currentlocation];

		try {
			const { rows } = await db.query(text, values);
			if(rows[0]) {
				res.json({
					'status': 200,
					'data': [
						{
							'id': rows[0].id,
							'message': 'order created'
						}
					]
				});
			} else {
				res.json({
					'status': 200,
					'data': [{
						'message': 'unable to create order'
					}]
				});
			}
		} catch(err) { res.json({ 'status': 400, 'data': err }); }
	}
};



// CHANGE PARCEL DESTINATION...
exports.changeParcelDestination = async (req, res) => {
	if(!req.body.destination) {
		res.json({
			'status': 400,
			'error': 'enter destination'
		});
	} else {
		const text = 'UPDATE parcels SET tolocation = $1 WHERE id = $2::int  returning id';
		const values = [ req.body.destination, req.params.id ];

		try {
			const { rows } = await db.query(text, values);
			if(rows[0]) {
				res.json({
					'status': 200,
					'data': [
						{
							'id': rows[0].id,
							'to': req.body.destination,
							'message': 'Parcel destination updated'
						}
					]
				});
			} else {
				res.json({ 'status': 400, 'data': { 'message': 'Parcel not updated' } });
			}
		} catch(err) { res.json({ status: 400, data: err }); }
	}
};



// CHANGE PARCEL STATUS...
exports.changeParcelStatus = async (req, res) => {
	if (!req.body.status) {
		res.json({
			'status': 400,
			'error': 'enter status'
		});
	} else {
		const	text = 'UPDATE parcels SET status = $1 WHERE id = $2::int returning id';
		const values = [req.body.status, req.params.id];

		try {
			const { rows } = await db.query(text, values);
			if(rows[0]) {
				res.json({
					'status': 200,
					'data': [
						{
							'id': rows[0].id,
							'status': req.body.status,
							'message': 'Parcel status updated'
						}
					]
				});
			} else {
				res.json({
					'status': 400,
					'data': [{
						'message': 'Parcel status NOT updated'
					}]
				});
			}

		}catch(err) { res.json({ status: 400, data: err }); }
	}
};



// CHANGE PARCEL CURRENT LOCATION...
exports.changeParcelCurrentLocation = async (req, res) => {
	if (!req.body.currentlocation) {
		res.json({
			'status': 400,
			'error': 'enter current location'
		});
	} else {
		const text = 'UPDATE parcels SET currentlocation = $1 WHERE id = $2::int  returning id';
		const	values = [req.body.currentlocation, req.params.id];

		try {
			const { rows } = await db.query(text, values);
			if(rows[0]) {
				res.json({
					'status': 200,
					'data': [
						{
							'id': rows[0].id,
							'currentLocation': req.body.currentlocation,
							'message': 'Parcel location updated'
						}
					]
				});
			} else {
				res.json({
					'status': 400,
					'data': [{
						'message': 'Parcel current location NOT updated'
					}]
				});
			}
		} catch(err) { res.json({ status: 400, data: err }); }
	}
};