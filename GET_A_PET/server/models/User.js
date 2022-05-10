const mongoose = require('../db/conn') //repare que aqui a trabalharemos com o objeto retornado pela conexão com o mongoose, diferentemente da aula de mongoose, onde trabalhamos diretamente com o objeto mongoose raiz
const { Schema } = mongoose

const User = mongoose.model(
  'User',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
  }, {timestamps: true}),
)

module.exports = User