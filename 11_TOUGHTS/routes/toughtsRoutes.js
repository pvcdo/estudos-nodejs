const express = require('express');
const router = express.Router();
const ToughtsController = require('../controllers/ToughtsController');
const checkAuth = require('../helpers/auth')

router.get('/update/:id', checkAuth, ToughtsController.updateTought)
router.get('/add', checkAuth, ToughtsController.createTought)
router.get('/dashboard', checkAuth, ToughtsController.dashboard)
router.get('/', ToughtsController.showToughts)

router.post('/add', checkAuth, ToughtsController.createToughtSave)
router.post('/remove', checkAuth, ToughtsController.removeTought)
router.post('/update', checkAuth, ToughtsController.updateToughtPost)

module.exports = router;
