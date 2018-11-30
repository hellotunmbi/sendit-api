'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var parcelController = require('../controllers/parcels.controller');
var authMiddleware = require('../middleware/auth.middleware');

// GET ALL PARCELS
// GET /parcels
router.get('/', parcelController.getAllParcels); //DONE


// GET SINGLE PARCELS
// GET /parcels/:id
router.get('/:id', parcelController.getSingleParcel); //DONE


// CANCEL PARCEL
// PATCH /parcels/:id
router.patch('/:id/cancel', authMiddleware.verifyParcelOwnership, parcelController.cancelParcel); //DONE


// SAVE A PARCEL INFO
// POST /parcels
router.post('/', parcelController.saveParcel); //DONE


// CHANGE PARCEL DESTINATION
// PATCH /parcels/:id/destination  => accepts destination request parameter
router.patch('/:id/destination', authMiddleware.verifyParcelOwnership, parcelController.changeParcelDestination);

// CHANGE PARCEL STATUS
// PATCH /parcels/:id/status  => accepts status request parameter
router.patch('/:id/status', parcelController.changeParcelStatus);

// CHANGE PARCEL CURRENT LOCATION
// PATCH /parcels/:id/currentlocation  => accepts location body parameter
router.patch('/:id/currentlocation', parcelController.changeParcelCurrentLocation);

module.exports = router;