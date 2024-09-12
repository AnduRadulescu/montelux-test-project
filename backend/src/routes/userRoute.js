//importing modules
const express = require('express')
const userController = require('../controllers/userController')
const userAuth = require('../middleware/userAuth')
const requireAuth = require('../middleware/requireAuths')

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, userController.signup)

//login endpoint
router.post('/login', userController.login)

router.post('/logout', requireAuth.jwtAuthentication, userController.logout)

module.exports = router