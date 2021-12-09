const express = require('express')
const app = express()
const port = 3000

const users = require('./users')

const path = require('path')

const basePath = path.join(__dirname, 'templates')

// ler o body (ou seja, ler o corpo da requisição, para conseguir acessar os atributos enviados pelo post)
  app.use( //esse middleware lê o 
    express.urlencoded({
      extended: true,
    }),
  )

  app.use(express.json())

//rota users

  app.use('/users',users)

//rota home

  app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
  })

// configuração do servidor

app.listen(port, () => {
  console.log(`App rodando na porta:${port}`)
})
