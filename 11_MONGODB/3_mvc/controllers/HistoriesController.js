const Histories = require('../models/Historie')

module.exports = class HistoriesController{
  static home(req,res){
    res.render('histories/home')
  }
}