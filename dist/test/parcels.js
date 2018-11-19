'use strict';

var chaiHttp = require('chai-http');
var chai = require('chai');
var server = require('../server');

var should = chai.should();

chai.use(chaiHttp);

describe('Parcels', function () {

	describe('/GET all parcels', function () {
		it('should Get list of all parcels', function (done) {
			chai.request(server).get('/api/v1/parcels').end(function (err, res) {
				res.should.have.status(200);
				res.should.be.an('object');
				res.should.have.property('status');
				done();
			});
		});
	});
});