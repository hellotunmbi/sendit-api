import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
	connectionString,
});

pool.on('connect', () => {
	console.log('connected to the db');
});