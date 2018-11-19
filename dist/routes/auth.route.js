'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var authController = require('../controllers/auth.controller');

router.get('/', function (req, res) {
	res.status(200).json({ message: 'Auth GET welcome' });
});

// REGISTER...
router.post('/signup', authController.signup);

// LOGIN...
router.post('/login', authController.login);

module.exports = router;