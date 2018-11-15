// const jwt = require('jsonwebtoken');
import { Client } from 'pg';
require('dotenv').config({ path: '../variables.env' });


const connectionString = "postgres://postgres:password@localhost:5432/senditdb";

const client = new Client({
	connectionString,
});
client.connect();

// GET ALL PARCELS...
exports.getAllParcels = (req, res) => {
	const query = {
		text: 'SELECT * FROM parcels'
	};
	client.query(query)
		.then(() => {
			res.json({
				'status': 200,
				'data': res
			});
		})
		.catch((err) => {
			res.json({
				'status': 400,
				'data': err
			});
		});
};


// GET ALL PARCELS...
exports.getSingleParcel = (req, res) => {
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
	const { placedBy, weight, weightmetric, sentOn, deliveredOn, status, from, to, currentLocation } = req.body;
	const query = { text: 'INSERT INTO parcels(placedBy, weight, weightmetric, sentOn, deliveredOn, status, from, to, currentLocation) VALUES($1, $2, $3, $4, $%, $6, $7, $8, $9)',
		values: [
			placedBy,
			weight,
			weightmetric,
			sentOn,
			deliveredOn,
			status,
			from,
			to,
			currentLocation
		]
	};
	client.query(query)
		.then(() => {
			res.json({
				'status': 200,
				'data': res
			});
		})
		.catch((err) => {
			res.json({
				'status': 400,
				'data': err
			});
		});
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

