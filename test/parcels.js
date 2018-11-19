const chaiHttp = require('chai-http');
const chai = require('chai');
const server = require('../server');

const should = chai.should();
const baseURL = 'https://sendit-hook.herokuapp.com/api/v1';

chai.use(chaiHttp);

describe('Parcels', () => {

	describe('/GET all parcels', () => {
		it('should Get list of all parcels', (done) => {
			chai
				.request(server)
				.get(`${baseURL}/parcels`)
				.end((err, res) => {
					res.should.have.status(200);
					res.should.be.an('object');
					res.should.have.property('status');
					done();
				});
		});
	});

});