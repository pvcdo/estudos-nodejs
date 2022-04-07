const express = require('express');
const router = express.Router();
const ToughtsController = require('../controllers/ToughtsController');
const checkAuth = require('../helpers/auth')

router.get('/dashboard', checkAuth, ToughtsController.dashboard)
router.get('/', ToughtsController.showToughts)

module.exports = router;
