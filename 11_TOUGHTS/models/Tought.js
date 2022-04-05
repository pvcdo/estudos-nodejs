const { DataTypes } = require('sequelize');
const conn = require('../db/conn')

const User = require('./User')

const Tought = conn.define("Tought", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Tought.belongsTo(User)
User.hasMany(Tought)

module.exports = Tought;