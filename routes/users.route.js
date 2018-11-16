import express from 'express';
const router = express.Router();

const userController = require('../controllers/users.controller');

// HOME ROUTE...
router.get('/', function (req, res) {
	res.status(200).json({ message: 'Users GET welcome' });
});

// GET PARCELS BY SPECIFIC USER...
router.get('/:userid/parcels', userController.getParcelsByUser);


module.exports = router;