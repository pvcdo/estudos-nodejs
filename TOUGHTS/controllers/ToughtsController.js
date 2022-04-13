const User = require('../models/User')
const Tought = require('../models/Tought')
const {Op} = require('sequelize')
const { search } = require('../routes/toughtsRoutes')

module.exports = class ToughtsController{
  static async showToughts(req,res){
    
    let search = ''

    if(req.query.search){
      search = req.query.search
    }

    let order = 'DESC'

    if(req.query.order === 'old'){
      order = 'ASC'
    }else{
      order = 'DESC'
    }
    
    Tought.findAll({
      include:User,
      where:{
        title:{[Op.like]:`%${search}%`}
      },
      order:[['createdAt', order]]
    })
      .then((toughtData) => {
        let toughts = toughtData.map(tought => {
          return tought.get({plain:true})
        })
        let toughtsLength = toughts.length
        if(toughtsLength === 0){
          toughtsLength = false
        }
        res.render('toughts/home', {toughts, search, toughtsLength})
      })
      .catch(e => console.error("Meu erro!!!!!!!" + e))
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
        const toughts = user.Toughts.map((tought) => {
          return tought.dataValues
        })
        
        let emptyToughts = false

        if(toughts.length === 0){
          emptyToughts = true
        }

        res.render('toughts/dashboard' , {toughts , emptyToughts})
      })
      .catch(e => console.error("Deu o erro" + e))
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

  static async removeTought(req,res){
    const toughtid = req.body.id
    const userId = req.session.userid

    Tought.destroy({
      where:{
        id: toughtid,
        UserId: userId
      }
    })
      .then(() => {
        req.flash('message', 'Pensamento excluído')
        req.session.save(() =>{
          res.redirect('/toughts/dashboard')
        })
      })
      .catch(e => console.error(e))
  }

  static updateTought(req,res){
      const id = req.params.id
      const UserId = req.session.userid

      Tought.findOne({where:{id, UserId}, raw:true})
        .then((tought) => {
          res.render('toughts/edit', {tought})
        })

      
  }

  static async updateToughtPost(req,res){
    const {id, userId, title} = req.body

    Tought.update({title}, {where: {id, UserId: userId}})
      .then(() => {
        req.flash('message', 'Pensamento atualizado')
        res.redirect('/toughts/dashboard')
      })
  }
}