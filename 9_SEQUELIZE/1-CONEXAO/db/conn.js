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

try {
    sequelize.authenticate()
    console.log('Conectamos com o Sequelize!')
} catch (error) {
    console.error('Não foi possível conectar: ' + error)
}

module.exports = sequelize;
