const { DataTypes } = require('sequelize') //esse objeto contém métodos e atributos que indicam qual o tipo que será utilizado para um coluna de uma tabela

const db = require('../db/conn') // faz a instância da conexão com o banco de dados que é criado pelo sequelize

const User = db.define('User', { //passamos como primeiro parâmetro o nome do model, cada um dos objetos dentro deste são as colunas
  name: { //coluna name
    type: DataTypes.STRING,
    allowNull: false, //allowNull indica se a coluna vai aceitar ou não valores nulos (NOT NULL do SQL)
  },
  occupation: { // coluna occupation
    type: DataTypes.STRING,
    required: true, //além de não aceitar nulos, não aceita vazios
  },
  newsletter: { //coluna newsletter
    type: DataTypes.BOOLEAN,
  },
})

module.exports = User