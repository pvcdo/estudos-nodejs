const express = require('express')
const router = express.Router()

const path = require('path')

const basePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

router.post('/save', (req, res) => {
    console.log(req.body) // body é um atributo da requisição enviada pelo post. Nela têm-se acesso a todos os atributos do objeto enviado pelo post com os dados do formulário
    const name = req.body.name
    const age = req.body.age

    console.log(name)
    console.log(age)
})

router.get('/:id', (req, res) => {
    console.log(`Carregando usuário: ${req.params.id}`)

    res.sendFile(`${basePath}/users.html`)
})

module.exports = router