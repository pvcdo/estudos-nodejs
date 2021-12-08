//Express
const express = require('express')

//módulos internos
const path = require('path')

const app = express()
const port = 3000

const templatePath = path.join(__dirname,'templates')

app.get('/users/:id', (req,res) => { //ao usar o símbolo de : na url nós estamos dizendo ao express que isso é um parâmetro que queremos trabalhar
  const id = req.params.id //ao buscar req.params serão considerados todas as variáveis na url que vieram juntas do :
  console.log(`Estamos buscando o usuário ${id}`)
  res.sendFile(`${templatePath}/users.html`)
})

app.get('/',(req,res) => { 
    res.sendFile(`${templatePath}/index.html`)
})

app.listen(port,()=>{ 
    console.log(`O servidor está rodando na porta ${port}`)
})