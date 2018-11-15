import express from 'express';
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.get('/', function (req, res) {
	res.status(200).json({ message: 'Register GET welcome' });
});
// router.get('/:id', authController.singleUser);

router.get('/students', authController.students);

// REGISTER...
router.post('/register',
	authController.signup
);

// LOGIN...
router.post('/login', authController.login);


module.exports = router;