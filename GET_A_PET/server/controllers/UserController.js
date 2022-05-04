const User = require('../models/User')

module.exports = class UserController{
  static async home(req, res){
    res.json('Estamos na home!')
  }
  static async register(req, res){
    res.json('Estamos registrando um usuário!')
  }
}
