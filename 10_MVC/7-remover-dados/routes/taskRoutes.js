const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')

router.get('/add', TaskController.createTask)
router.get('/', TaskController.showTasks)

router.post('/add', TaskController.createTaskSave)
router.post('/remove', TaskController.removeTask)


module.exports = router;