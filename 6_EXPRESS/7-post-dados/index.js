const express = require('express')
const app = express()
const port = 3000

const path = require('path')

const basePath = path.join(__dirname, 'templates')

// ler o body (ou seja, ler o corpo da requisição, para conseguir acessar os atributos enviados pelo post)
app.use( //esse middleware lê o 
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.get('/users/add', (req, res) => {
  res.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save', (req, res) => {
  console.log(req.body) // body é um atributo da requisição enviada pelo post. Nela têm-se acesso a todos os atributos do objeto enviado pelo post com os dados do formulário
  const name = req.body.name
  const age = req.body.age

  console.log(name)
  console.log(age)
})

app.get('/users/:id', (req, res) => {
  console.log(`Carregando usuário: ${req.params.id}`)

  res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
  console.log(`App rodando na porta:${port}`)
})
