const express = require('express');
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const senhaMySQL = require('./conn')

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

app.get('/',(req,res)=>{
    res.render('home')
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: senhaMySQL,
    database: 'nodemysql',
})

conn.connect((err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('Conectou ao MySQL')
    app.listen(3000, ()=>{
        console.log('App rodando na porta 3000')
    })
})

app.post('/books/insertbook', (req,res) =>{
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql_query = `INSERT INTO books (title,pageqty) VALUES ('${title}','${pageqty}')`

    conn.query(sql_query, (err)=>{
        err ? console.log(err) : res.redirect('/')
    })
}) //ao ser chamada a rota /books/insertbook pelo método post são criadas as constantes title e pageqty a partir do corpo da requisição, essas constantes são usadas para gerar a query que será passada ao banco pelo método query. Caso dê tudo certo os dados passados pelo form será repassado ao banco e haverá o redirecionamento para a raiz do app; caso dê erro será retornado o erro. No caso tudo rodou 100% aqui.