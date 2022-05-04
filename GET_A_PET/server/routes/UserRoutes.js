const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/',UserController.home)

router.post('/register',UserController.register)

module.exports = router
