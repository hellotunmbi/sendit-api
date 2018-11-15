'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var parcelController = require('../controllers/parcels.controller');

// GET ALL PARCELS
// GET /parcels
router.get('/', parcelController.getAllParcels);

// GET SINGLE PARCELS
// GET /parcels/:id
router.get('/:id', parcelController.getSingleParcel);

// CANCEL PARCEL
// PATCH /parcels/:id
router.patch('/:id/cancel', parcelController.cancelParcel);

// SAVE A PARCEL INFO
// POST /parcels
router.post('/', parcelController.saveParcel);

// CHANGE PARCEL DESTINATION
// PATCH /parcels/:id/destination  => accepts destination request parameter
router.patch('/:id/destination', parcelController.changeParcelDestination);

// CHANGE PARCEL STATUS
// PATCH /parcels/:id/status  => accepts status request parameter
router.patch('/:id/status', parcelController.changeParcelStatus);

module.exports = router;