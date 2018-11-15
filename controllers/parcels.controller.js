// const jwt = require('jsonwebtoken');
import { Client } from 'pg';
require('dotenv').config({ path: '../variables.env' });


const connectionString = 'postgres://postgres:password@localhost:5432/senditdb';

const client = new Client({
	connectionString,
});
client.connect();

// GET ALL PARCELS...
exports.getAllParcels = (req, res) => {
	const allQuery = {
		text: 'SELECT * FROM parcels'
	};
	client
		.query(allQuery)
		.then(result => {
			client.end();
			res.json({
				status: 200,
				data: result.rows
			});
		})
		.catch(err => res.json({ status: 400, data: err }));
};


// GET ALL PARCELS...
exports.getSingleParcel = (req, res) => {
	const allQuery = {
		text: 'SELECT * FROM parcels where id=$1',
		values: [req.params.id]
	};
	client
		.query(allQuery)
		.then(result => {
			client.end();
			res.json({
				status: 200,
				data: result.rows
			});
		})
		.catch(err => res.json({ status: 400, data: err }));
};



// CANCEL PARCEL...
exports.cancelParcel = (req, res) => {
	const query = {
		text: ''
	};
	client.query(query)
		.then(() => {
			res.json({
				'status': 200,
				'data': []
			});
		})
		.catch((err) => {
			res.json({
				'status': 400,
				'data': err
			});
		});
};


// SAVE PARCEL...
exports.saveParcel = (req, res) => {
	const { placedby, weight, weightmetric, senton, deliveredon, status, from, to, currentlocation } = req.body;
	const saveQuery = {
		text: 'INSERT INTO parcels (placedby, weight, weightmetric, senton, deliveredon, status, fromlocation, tolocation, currentlocation) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id',
		values: [placedby, weight, weightmetric, senton, deliveredon, status, from, to, currentlocation] };
	client
		.query(saveQuery)
		.then(result => {
			client.end();
			res.json({
				status: 200,
				data: [
					{
						'id': result.rows[0].id,
						'message': 'order created'
					}
				]
			});
		})
		.catch(err => res.json({ 'status': 400, 'data': err }));
};



// CHANGE PARCEL DESTINATION...
exports.changeParcelDestination = (req, res) => {
	const query = {
		text: ''
	};
	client.query(query)
		.then(() => {
			res.json({
				'status': 200,
				'data': []
			});
		})
		.catch((err) => {
			res.json({
				'status': 400,
				'data': err
			});
		});
};



// CHANGE PARCEL STATUS...
exports.changeParcelStatus = (req, res) => {
	const query = {
		text: ''
	};
	client.query(query)
		.then(() => {
			res.json({
				'status': 200,
				'data': []
			});
		})
		.catch((err) => {
			res.json({
				'status': 400,
				'data': err
			});
		});
};

