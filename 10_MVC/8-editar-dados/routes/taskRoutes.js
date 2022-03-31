const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')

router.get('/edit/:id', TaskController.editTask)
router.get('/add', TaskController.createTask)
router.get('/', TaskController.showTasks)

router.post('/updateStatus', TaskController.toggleTaskStatus)
router.post('/edit', TaskController.editTaskPost)
router.post('/remove', TaskController.removeTask)
router.post('/add', TaskController.createTaskSave)


module.exports = router;