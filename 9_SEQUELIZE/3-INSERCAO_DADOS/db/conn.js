const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'nodesequelize2', //banco
    'root', //usuário
    'Mysql#1', //senha do banco
    {
        host: 'localhost',
        dialect: 'mysql', //qual banco eu quero integrar nesse projeto
    }
)

// try {
//     sequelize.authenticate()
//     console.log('Conectamos com o Sequelize!')
// } catch (error) {
//     console.error('Não foi possível conectar: ' + error)
// }

//no caso esse try...catch é só para testar se o banco está sendo conectado com o sequelize. Vamos utilizar conectar no index.js.

module.exports = sequelize;
