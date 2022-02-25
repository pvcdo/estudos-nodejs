const express = require('express');
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/Users') //chama a tabela que deve ser criada

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
) //middleware usado para pegar recuperar o texto do body 

app.use(express.json()) //usado para pegar o body em json

app.use(express.static('public'))

app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')

//rota "home"
    app.get('/',(req,res)=>{
        res.render('home')
    })


conn.sync() //não é necessário especificar que é necessário usar os models criados. O próprio sequelize vai verificar a existência de User aqui no index e vai levá-lo em consideração quando da execução de sync
    .then(() => {
        app.listen(3000, ()=>{
            console.log('App rodando na porta 3000')
        })
    })
    .catch(err => console.error("Erro: " + err))
