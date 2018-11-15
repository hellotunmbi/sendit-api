'use strict';

var _pg = require('pg');

require('dotenv').config({ path: '../variables.env' }); // const jwt = require('jsonwebtoken');


var connectionString = 'postgres://postgres:password@localhost:5432/senditdb';

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
	    placedby = _req$body.placedby,
	    weight = _req$body.weight,
	    weightmetric = _req$body.weightmetric,
	    senton = _req$body.senton,
	    deliveredon = _req$body.deliveredon,
	    status = _req$body.status,
	    from = _req$body.from,
	    to = _req$body.to,
	    currentlocation = _req$body.currentlocation;

	var query = { text: 'INSERT INTO parcels(placedby, weight, weightmetric, senton, deliveredon, status, from, to, currentlocation) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', values: [placedby, weight, weightmetric, senton, deliveredon, status, from, to, currentlocation] };
	client.query(query).then(function (result) {
		client.end();
		res.json({ status: 200, data: [{ user: req.body }] });
	}).catch(function (err) {
		return res.json({ status: 400, data: err });
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