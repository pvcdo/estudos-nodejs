const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const User = require('../models/User')

router.get('/',UserController.home)
router.get('/checkUser', UserController.checkUser)

router.post('/register',UserController.register)
router.post('/login', UserController.login)

module.exports = router
