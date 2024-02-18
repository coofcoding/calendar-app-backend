const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validators')
const { JWTValidator } = require('../middlewares/jwt-validator')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();

// JWT Validation
router.use ( JWTValidator );

// Validation JWT
// TODO: Get Events
router.get('/', getEvents);

// TODO: Create new event
router.post('/', [
    check('title', 'The titles is obligatory').not().isEmpty(),
    check('start', 'The start date is obligatory').custom( isDate ),
    check('end', 'The end date is obligatory').custom( isDate ),
    validateFields
], createEvent);

// TODO: Update event
router.put('/:id',[
    check('title', 'The titles is obligatory').not().isEmpty(),
    check('start', 'The start date is obligatory').custom( isDate ),
    check('end', 'The end date is obligatory').custom( isDate ),
    validateFields
], updateEvent);

// TODO: Delete event
router.delete('/:id', deleteEvent);

module.exports = router;