import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: 'variables.env' });

// ROUTES...
const auth = require('./routes/auth.route');
const users = require('./routes/users.route');
const parcels = require('./routes/parcels.route');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.get('/api/v1/', (req, res) => {
	res.json('Welcome to Home of SendIT');
});
app.use('/api/v1/auth', auth);
app.use('/api/v1/parcels', parcels);
app.use('/api/v1/users', users);


let port = 1234;

app.listen(process.env.PORT || port, () => {
	console.log(`Server now up and running on port ${port}`);
});