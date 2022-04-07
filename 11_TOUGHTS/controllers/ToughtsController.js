const User = require('../models/User')
const Tought = require('../models/Tought')

module.exports = class ToughtsController{
  static async showToughts(req,res){
    res.render('toughts/home')
  }

  static async dashboard(req,res){
    const userId = req.session.userid

    User.findOne(
      {
        where:{
          id: userId
        },
        include: Tought,
        plain: true,
      },
    )
      .then((user) => {
        const toughts = []
        user.Toughts.map((tought) => {
          toughts.push(tought.dataValues)
        })
        //console.log(toughts)
        res.render('toughts/dashboard' , {toughts})
      })
      .catch(e => console.error(e))
  }

  static createTought(req,res){
    res.render('toughts/create')
  }

  static async createToughtSave(req, res){
    const tought = {
      title: req.body.title,
      UserId: req.session.userid
    }

    Tought.create(tought)
      .then(() => {
        req.flash('message', 'Pensamento criado com sucesso!')
        req.session.save(() => {
          res.redirect('/toughts/dashboard')
        })
      })
      .catch(e => console.error(e))
  }
}