const {DataTypes} = require('sequelize');
const db = require('../db/conn')
const User = require('./Users')

const Address = db.define('Address', {
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
})

User.hasMany(Address) //um usuário pode ter muitos endereços
Address.belongsTo(User) //o endereço cadastrado só vai ser associado a um usuário

module.exports = Address