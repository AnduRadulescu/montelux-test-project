const express = require('express')
const user_eventController = require('../controllers/user_eventController')
const requireAuth = require('../middleware/requireAuths')

const router = express.Router()

router.post('/joinEvent/:user_id/:event_id', requireAuth.jwtAuthentication, user_eventController.joinEventAsParticipant)

module.exports = router