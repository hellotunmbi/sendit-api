import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config({ path: 'variables.env' });

export function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}


export function comparePassword(hashPassword, password) {
  return bcrypt.compareSync(password, hashPassword);
}


export function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}


export function generateToken(id) {
  const token = jwt.sign({
      email: id
    },
    process.env.SECRET,
    { expiresIn: '7d' }
  );
  return token;
}