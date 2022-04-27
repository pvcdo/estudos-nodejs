const express = require('express')
const router = express.Router()

const StoriesController = require('../controllers/StoriesController')

router.get('/', StoriesController.home)
router.get('/new', StoriesController.createStory)
router.get('/error', StoriesController.pageError)
router.get('/:id', StoriesController.getStory)
router.get('/update/:id', StoriesController.updateStory)

router.post('/new', StoriesController.createStoryPost)
router.post('/update', StoriesController.updateStoryPost)
router.post('/remove/:id', StoriesController.removeStory)

module.exports = router