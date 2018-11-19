'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config({ path: 'variables.env' });

var Helper = {
	hashPassword: function hashPassword(password) {
		return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(8));
	},
	comparePassword: function comparePassword(hashPassword, password) {
		return _bcrypt2.default.compareSync(password, hashPassword);
	},
	isValidEmail: function isValidEmail(email) {
		return (/\S+@\S+\.\S+/.test(email)
		);
	},
	generateToken: function generateToken(id, email) {
		var token = _jsonwebtoken2.default.sign({
			id: id,
			email: email
		}, process.env.SECRET, { expiresIn: '7d' });
		return token;
	}
};

exports.default = Helper;