const express = require('express');
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/Users')

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

app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.post('/users/create', async(req, res) =>{
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === "on"){ //quando o checkbox está marcado seu valor é a string "on", caso contrário é null
        newsletter = true
    }else{
        newsletter = false
    }

    await User.create({name,occupation,newsletter}) // aqui nós passamos os parâmetros necessários para criar um registro na tabela users no banco de dados a partir do model User, que representa essa tabela através do sequelize

    res.redirect('/')
})

//rota "home"
app.get('/', async(req,res)=>{
    const users = await User.findAll({raw:true}) //raw indica que o retorno não terá algumas informações de metadados que para nós são desnecessárias
    res.render('home', {users})
})

conn.sync() //não é necessário especificar que é necessário usar os models criados. O próprio sequelize vai verificar a existência de User aqui no index e vai levá-lo em consideração quando da execução de sync
    .then(() => {
        app.listen(3000, ()=>{
            console.log('App rodando na porta 3000')
        })
    })
    .catch(err => console.error("Erro: " + err))
