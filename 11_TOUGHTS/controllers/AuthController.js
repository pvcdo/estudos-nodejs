const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController{
  static login(req,res){
    res.render('auth/login')
  }

  static async loginPost(req,res){
    const {email, password} = req.body

    const mensagem_erro_login = "Email e/ou senha incorretos"

    User.findOne({where:{email}})
      .then((user) => {
        if(!user){
          req.flash('message', mensagem_erro_login)
          res.redirect('/login')
          return
        }

        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch){
          req.flash('message', mensagem_erro_login)
          res.redirect('/login')
          return
        }

        req.session.userid = user.id

        req.flash('message', 'Login efetuado com sucesso!')

        req.session.save(() => {
          res.redirect('/')
        })
        
      })

  }

  static register(req,res){
    res.render('auth/register')
  }

  static async registerPost(req,res){
    const {nome, email, senha, confirmSenha} = req.body

    if(senha !== confirmSenha){
      req.flash('message', 'Há divergência entre a senha fornecida e sua confirmação')
      res.render('auth/register')
      return
    }

    const emailExiste = await User.findOne({where:{email}})

    if(emailExiste){
      req.flash('message', 'Este e-mail já está sendo utilizado')
      res.render('auth/register')
      return
    }

    const salt = bcrypt.genSaltSync()
    const passHashed = bcrypt.hashSync(senha, salt)

    try{

      const user = {
        name: nome,
        email,
        password: passHashed,
      }
      
      const createdUser =  await User.create(user)

      req.session.userid = createdUser.id

      req.flash('message', 'Usuário criado com sucesso!')

      req.session.save(() => {
        res.redirect('/')
      })

    }catch(e){
      e => console.error(e)
    }
    
  }

  static logout(req,res){
    req.session.destroy()
    res.redirect('/login')
  }
  
}