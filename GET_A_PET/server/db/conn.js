const mongoose = require('mongoose')

const uri = 'http://localhost:27017/get-a-pet'

mongoose.connect(uri)
  .then(()=>{
    console.log('Conectado ao mongoose')
    module.exports(mongoose)
  })
  .catch((e)=>console.error("Errooooooo " + e))
  