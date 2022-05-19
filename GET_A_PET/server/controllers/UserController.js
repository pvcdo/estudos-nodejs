const User = require('../models/User')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController{

  static async home(req, res){
    res.json('Estamos na home!')
  }

  static async register(req, res){
    const {name, email, phone, password, confirmpassword} = req.body

    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório!' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória!' })
      return
    }

    if (!confirmpassword) {
      res.status(422).json({ message: 'A confirmação de senha é obrigatória!' })
      return
    }

    if (password != confirmpassword) {
      res
        .status(422)
        .json({ message: 'A senha e a confirmação precisam ser iguais!' })
      return
    }

    // check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
      return
    }

    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // create user
    const user = new User({name,email,phone,password: passwordHash})

    user.save()
    .then((new_user) => {
      /*res.status(201).json({
        message: "Usuário cadastrado com sucesso",
        new_user
      })*/

      createUserToken(new_user,req,res)
    })
    .catch(error => {
      res.status(500).json({ message: error })
    })
  }

  static async login(req,res){
    const {email,password} = req.body

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória!' })
      return
    }

    User.findOne({email})
    .then(async(user) => {
      const checkPass = await bcrypt.compare(password,user.password)
      if(!checkPass){
        res.status(422).json({
          message:"A senha está incorreta"
        })
        return
      }
      createUserToken(user,req,res)
    })
    .catch(()=>{
      res.status(422).json({
        message:"Não há nenhum usuário cadastrado com este e-mail"
      })
      return
    })

  }

  static async checkUser(req,res){
    let currentUser

    if(req.headers.authorization){
      const token = getToken(req)
      const decoded = jwt.verify(token,"nossosecret")
      currentUser = await User.findById(decoded.id)
      currentUser.password = undefined
    }else{
      currentUser = null
    }

    res.status(200).send(currentUser)
  }

  static async getUserById(req,res){
    const id = req.params.id

    const user = await User.findById(id).select("-password")

    if(!user){
      res.status(422).json({
        message:"Não há nenhum usuário cadastrado com este id"
      })
      return
    }

    return res.status(200).json(user)
    
  }

  static async updateUser(req,res){
    const id = req.params.id
    const user = await getUserByToken(getToken(req))

    if(req.file){
      user.image = req.file.filename
    }

    const {name, email,phone, password, confirmpassword} = req.body

    if(!name){
      res.status(401).json({message:"O nome é obrigatório"})
      return
    }
    user.name = name

    if(!email){
      res.status(401).json({message:"O e-mail é obrigatório"})
      return
    }
    user.email = email

    if(!phone){
      res.status(401).json({message:"O telefone é obrigatório"})
      return
    }
    user.phone = phone

    if(password !== confirmpassword){
      res.status(401).json({message:"As senhas não conferem"})
      return
    }else if(password === confirmpassword && password != null){
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password,salt)
      user.password = passwordHash
    }

    try{
      const userUpdated = await User.findOneAndUpdate(
        {_id:id},
        {$set:user},
        {new:true}
      )
      res.status(200).json({
        message:"Usuário atualizado com sucesso!",
        data: userUpdated
      })
    }catch(e){
      res.status(500).json({message: e})
    }

    return res.status(200).json(user)
  }
}
