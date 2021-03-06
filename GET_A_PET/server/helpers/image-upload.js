const multer = require('multer')
const path = require('path')
const getToken = require('./get-token')

//Configuração do destino para o armazenamento de imagens
const imageStorage = multer.diskStorage({
  destination: function(req,file,cb){
    let folder = ""
    if(req.baseUrl.includes('users')){
      folder = "users"
    }else if(req.baseUrl.includes('pets')){
      folder = "pets"
    }
    cb(null,`public/img/${folder}/`)
  },
  filename: function(req,file,cb){
    const user = getToken(req).substr(0,5)
    cb(null,Date.now() + user + Math.floor(Math.random()*1000) + path.extname(file.originalname))
  }
})

const imageUpload = multer({
  storage:imageStorage,
  fileFilter: function(req,file,cb){
    if(!file.originalname.match(/\.(png|jpg)$/)){
      //faz o upload apenas se as imagens foram png ou jpg
      return cb(new Error("Por favor, envie apenas imagens .PNG ou .JPG"))
    }
    cb(undefined,true)
  }
})

module.exports = {imageUpload}