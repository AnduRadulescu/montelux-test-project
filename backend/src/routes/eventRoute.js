const express = require('express')
const eventController = require('../controllers/eventController')
const requireAuth = require('../middleware/requireAuths')

const router = express.Router()

router.get('/getAllEvents', requireAuth.jwtAuthentication, eventController.getAllEvents)

router.get('/getEventsByTitle/:title', requireAuth.jwtAuthentication, eventController.getEventsByTitle)

router.get('/getEventsByLocationAndDate', requireAuth.jwtAuthentication, eventController.getEventsByLocationAndDate)

router.post('/createEvent', requireAuth.jwtAuthentication, eventController.createEvent)

router.put('/updateEvent/:event_id', requireAuth.jwtAuthentication, eventController.updateEvent)

router.delete('/deleteEvent/:event_id', requireAuth.jwtAuthentication, eventController.deleteEvent)

module.exports = router