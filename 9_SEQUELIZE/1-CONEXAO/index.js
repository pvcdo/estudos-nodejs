const express = require('express');
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

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

app.listen(3000, ()=>{
    console.log('App rodando na porta 3000')
})