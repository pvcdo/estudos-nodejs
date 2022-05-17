const express = require('express')
const router = express.Router()

const PetControllers = require('../controllers/PetControllers.js')

//helpers
const verifyToken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')

router.get('/',PetControllers.getAll)
router.get('/mypets',verifyToken,PetControllers.getAllUserPets)

router.post('/create',verifyToken,imageUpload.array('images'),PetControllers.create)

module.exports = router
