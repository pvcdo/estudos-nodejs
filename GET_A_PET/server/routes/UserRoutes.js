const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const User = require('../models/User')
const verifyToken = require("../helpers/verify-token")
const {imgUpload, imageUpload} = require("../helpers/image-upload")

router.get('/',UserController.home)
router.get('/checkUser', UserController.checkUser)
router.get('/:id',UserController.getUserById)

router.post('/register',UserController.register)
router.post('/login', UserController.login)

router.patch('/update/:id',verifyToken,imageUpload.single('image'),UserController.updateUser)

module.exports = router
