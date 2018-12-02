'use strict';

var _pg = require('pg');

var connectionString = process.env.DATABASE_URL;

var pool = new _pg.Pool({
	connectionString: connectionString
});

pool.on('connect', function () {
	console.log('connected to the db');
});