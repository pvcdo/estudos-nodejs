const express = require('express')
const router = express.Router()

const HistoriesController = require('../controllers/HistoriesController')

router.get('/', HistoriesController.home)

module.exports = router