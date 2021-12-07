const express = require('express')
const app = express()
const port = 3000

app.get('/',(req,res) => { // define o que fazer quando for acessada a rota /
    res.send('Hello world!') // emite uma resposta ao usuário com um texto simples
})

app.get('/h1',(req,res) => { // define o que fazer quando for acessada a rota /h1
    res.send('<h1>Teste de h1</h1>') // emite uma resposta ao usuário com um título h1
})

app.listen(port,()=>{
    console.log(`O servidor está rodando na porta ${port}`)
})