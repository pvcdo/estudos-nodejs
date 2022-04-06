const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController{
  static login(req,res){
    res.render('auth/login')
  }
  static register(req,res){
    res.render('auth/register')
  }
  static registerPost(req,res){
    const {nome, email, senha, confirmSenha} = req.body

    if(senha !== confirmSenha){
      req.flash('message', 'A confirmação de senha é diferente da senha digitada')
      res.render('auth/register')
      return
    }
    
  }
  
}