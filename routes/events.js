const { Router } = require('express');
const { JWTValidator } = require('../middlewares/jwt-validator')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')

const router = Router();

// JWT Validation
router.use ( JWTValidator );

// Validation JWT
// TODO: Get Events
router.get('/', getEvents);

// TODO: Create new event
router.post('/', createEvent);

// TODO: Update event
router.put('/:id', updateEvent);

// TODO: Delete event
router.delete('/:id', deleteEvent);

module.exports = router;