const {MongoClient} = require('mongodb')

const uri = "mongodb://localhost:27017/mongoNode"

const client = new MongoClient(uri)

client.connect()
  .then(() => {
    console.log('Conectamos ao mongoDB')
    module.exports = client
  })
  .catch(e=>console.error('Erro!!!!!!!' + e))

