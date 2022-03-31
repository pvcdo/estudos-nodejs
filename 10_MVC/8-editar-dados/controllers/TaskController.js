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

  static async removeTask(req,res){
    const id = req.body.id

    await Task.destroy({where:{id}})

    res.redirect('/tasks')
  }

  static async editTask(req,res){
    const id = req.params.id

    const task = await Task.findOne(
      {
        where:{id},
        raw:true
      }
    )

    res.render('tasks/edit', {task})
  }

  static async editTaskPost(req,res){
    const id = req.body.id
    const title = req.body.title
    const description = req.body.description

    const task = {id,title,description}

    await Task.update(task,{where:{id}})

    res.redirect('/tasks')
  }

  static async toggleTaskStatus(req,res){
    const done = req.body.done == 0 ? true : false;
    const id = req.body.id

    const task = {done}

    await Task.update(task, {where:{id}})

    res.redirect('/tasks')
  }



}