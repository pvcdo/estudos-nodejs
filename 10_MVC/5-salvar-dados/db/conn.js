const {Sequelize} = require ('sequelize');

  const sequelize = new Sequelize(
    'node_mvc',
    'root', //usuário
    'Mysql#1', //senha do banco
    {
        host: 'localhost',
        dialect: 'mysql',
    }
  )

try{
  sequelize.authenticate()
  console.log('Conectamos ao sequelize!')
  module.exports = sequelize;
}catch(err){
  console.error(err)
}

