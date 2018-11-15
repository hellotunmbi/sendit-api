'use strict';

var _pg = require('pg');

require('dotenv').config({ path: '../variables.env' }); // const jwt = require('jsonwebtoken');


var connectionString = "postgres://postgres:password@localhost:5432/senditdb";

var client = new _pg.Client({
	connectionString: connectionString
});
client.connect();

// GET ALL PARCELS...
exports.getAllParcels = function (req, res) {
	var query = {
		text: 'SELECT * FROM parcels'
	};
	client.query(query).then(function () {
		res.json({
			'status': 200,
			'data': res
		});
	}).catch(function (err) {
		res.json({
			'status': 400,
			'data': err
		});
	});
};

// GET ALL PARCELS...
exports.getSingleParcel = function (req, res) {
	var query = {
		text: ''
	};
	client.query(query).then(function () {
		res.json({
			'status': 200,
			'data': []
		});
	}).catch(function (err) {
		res.json({
			'status': 400,
			'data': err
		});
	});
};

// CANCEL PARCEL...
exports.cancelParcel = function (req, res) {
	var query = {
		text: ''
	};
	client.query(query).then(function () {
		res.json({
			'status': 200,
			'data': []
		});
	}).catch(function (err) {
		res.json({
			'status': 400,
			'data': err
		});
	});
};

// SAVE PARCEL...
exports.saveParcel = function (req, res) {
	var _req$body = req.body,
	    placedBy = _req$body.placedBy,
	    weight = _req$body.weight,
	    weightmetric = _req$body.weightmetric,
	    sentOn = _req$body.sentOn,
	    deliveredOn = _req$body.deliveredOn,
	    status = _req$body.status,
	    from = _req$body.from,
	    to = _req$body.to,
	    currentLocation = _req$body.currentLocation;

	var query = { text: 'INSERT INTO parcels(placedBy, weight, weightmetric, sentOn, deliveredOn, status, from, to, currentLocation) VALUES($1, $2, $3, $4, $%, $6, $7, $8, $9)',
		values: [placedBy, weight, weightmetric, sentOn, deliveredOn, status, from, to, currentLocation]
	};
	client.query(query).then(function () {
		res.json({
			'status': 200,
			'data': res
		});
	}).catch(function (err) {
		res.json({
			'status': 400,
			'data': err
		});
	});
};

// CHANGE PARCEL DESTINATION...
exports.changeParcelDestination = function (req, res) {
	var query = {
		text: ''
	};
	client.query(query).then(function () {
		res.json({
			'status': 200,
			'data': []
		});
	}).catch(function (err) {
		res.json({
			'status': 400,
			'data': err
		});
	});
};

// CHANGE PARCEL STATUS...
exports.changeParcelStatus = function (req, res) {
	var query = {
		text: ''
	};
	client.query(query).then(function () {
		res.json({
			'status': 200,
			'data': []
		});
	}).catch(function (err) {
		res.json({
			'status': 400,
			'data': err
		});
	});
};