const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

// middleware to validate token

const checkToken = (req,res,next)=>{
  if(!req.headers.authorization){
    return res.status(401).json({ message: "Acesso negado: Sem req.headers.authorization" });
  }
  const token = getToken(req)
  if(!token){
    return res.status(401).json({ message: "Acesso negado: authorization sem token!" });
  }

  try{
    const verified = jwt.verify(token,"nossosecret")
    req.user = verified
    next()
  }catch(e){
    return res.status(400).json({ message: "O token é inválido!" });
  }
}

module.exports = checkToken
