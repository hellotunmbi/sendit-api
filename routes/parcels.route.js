import express from 'express';
const router = express.Router();

const parcelController = require('../controllers/parcels.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET ALL PARCELS
// GET /parcels
router.get('/', parcelController.getAllParcels); //DONE


// GET SINGLE PARCELS
// GET /parcels/:id
router.get('/:id', parcelController.getSingleParcel); //DONE


// CANCEL PARCEL
// PATCH /parcels/:id
router.patch('/:id/cancel', authMiddleware.verifyParcelOwnership, parcelController.cancelParcel);  //DONE


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