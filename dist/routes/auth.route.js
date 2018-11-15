'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var authController = require('../controllers/auth.controller');

router.get('/', function (req, res) {
	res.status(200).json({ message: 'Register GET welcome' });
});
// router.get('/:id', authController.singleUser);

router.get('/students', authController.students);

// REGISTER...
router.post('/register', authController.signup);

// LOGIN...
router.post('/login', authController.login);

module.exports = router;