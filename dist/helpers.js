'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.isValidEmail = isValidEmail;
exports.generateToken = generateToken;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config({ path: 'variables.env' });

function hashPassword(password) {
  return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(8));
}

function comparePassword(hashPassword, password) {
  return _bcrypt2.default.compareSync(password, hashPassword);
}

function isValidEmail(email) {
  return (/\S+@\S+\.\S+/.test(email)
  );
}

function generateToken(id) {
  var token = _jsonwebtoken2.default.sign({
    email: id
  }, process.env.SECRET, { expiresIn: '7d' });
  return token;
}