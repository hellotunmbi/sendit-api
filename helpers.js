import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config({ path: 'variables.env' });

const Helper = {

	hashPassword(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
	},


	comparePassword(hashPassword, password) {
		return bcrypt.compareSync(password, hashPassword);
	},


	isValidEmail(email) {
		return /\S+@\S+\.\S+/.test(email);
	},


	generateToken(id, email) {
		const token = jwt.sign({
			id,
			email
		},
		process.env.SECRET,
		{ expiresIn: '2y' }
		);
		return token;
	}

};

export default Helper;