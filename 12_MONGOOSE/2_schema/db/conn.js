const mongoose = require('mongoose')

const uri = "mongodb://localhost:27017/mongooseNode"

mongoose.connect(uri)
  .then(() => {
    console.log("Conectou com o mongoose")
    module.exports = mongoose
  })
  .catch((e) => console.error("Erroooooooooo"))


