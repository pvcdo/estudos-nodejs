const express = require('express');
const router = express.Router();
const ToughtsController = require('../controllers/ToughtsController');
const checkAuth = require('../helpers/auth')

router.get('/add', checkAuth, ToughtsController.createTought)
router.get('/dashboard', checkAuth, ToughtsController.dashboard)
router.get('/', ToughtsController.showToughts)

router.post('/add', checkAuth, ToughtsController.createToughtSave)

module.exports = router;
