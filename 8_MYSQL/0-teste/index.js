const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.send('<h1>Estamos aqui!</h1>')
})

app.listen(3000,()=>{
    console.log('App rodando na porta 3000')
})

