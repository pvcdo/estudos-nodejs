const Task = require('../models/Task')

module.exports = class TaskController{
  static createTask(req,res){
    res.render('tasks/create')
  }

  static async showTasks(req,res){

    const tasks = await Task.findAll({raw:true})
    res.render('tasks/all', {tasks})

  }

  static async createTaskSave(req, res){
    const title = req.body.title;
    const description = req.body.description;
    var done = false;

    const task = {
      title,
      description,
      done
    }

    await Task.create(task)

    res.redirect('/tasks')
  }
}