'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var userController = require('../controllers/users.controller');

// HOME ROUTE...
router.get('/', function (req, res) {
	res.status(200).json({ message: 'Users GET welcome' });
});

// GET PARCELS BY SPECIFIC USER...
router.get('/:userid/parcels', userController.getParcelsByUser);

module.exports = router;