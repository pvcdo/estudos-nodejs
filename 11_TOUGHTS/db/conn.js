const {Sequelize} = require ('sequelize');

  const sequelize = new Sequelize(
    'toughts',
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
  }catch(e){
    console.error(e)
  }

