const jwt = require("jsonwebtoken")

function createUserToken(user,req,res){
  const token = jwt.sign({
    name: user.name,
    id: user._id
  },
  "nossosecret")

  res.status(200).json({
    message:"Usuário autenticado",
    token,
    userId: user._id
  })
}

module.exports = createUserToken