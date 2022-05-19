const express = require('express')
const router = express.Router()

const PetControllers = require('../controllers/PetControllers.js')

//helpers
const verifyToken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')

router.post('/create',verifyToken,imageUpload.array('images'),PetControllers.create)

router.get('/',PetControllers.getAll)
router.get('/:id',PetControllers.getPet)
router.get('/mypets',verifyToken,PetControllers.getAllUserPets)
router.get('/myadoptions',verifyToken,PetControllers.getAllUserAdoptions)

router.patch('/:id',verifyToken,imageUpload.array('images'),PetControllers.updatePet)
router.patch('/schedule/:id',verifyToken,PetControllers.schedule)
router.patch('/conclude/:id',verifyToken,PetControllers.concludeAdoption)

router.delete('/:id',verifyToken,PetControllers.deletePet)

module.exports = router
