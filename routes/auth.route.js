import express from 'express';
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.get('/', function (req, res) {
	res.status(200).json({ message: 'Auth GET welcome' });
});

// REGISTER...
router.post('/signup', authController.signup);

// LOGIN...
router.post('/login', authController.login);


module.exports = router;