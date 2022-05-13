const jwt = require('jsonwebtoken')
const User = require('../models/User')

const getUserByToken = async (token) => {
  if(!token){
    return res.status(401).json({message:"Acesso negado no getUserByToken"})
  }
  const verified = jwt.verify(token,"nossosecret")
  const _id = verified.id
  const user = await User.findOne({_id})
  return user
}

module.exports = getUserByToken