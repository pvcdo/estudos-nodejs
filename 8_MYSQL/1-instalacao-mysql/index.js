const express = require('express');
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const senhaMySQL = require('./conn')

const app = express()

//app.use(express.static('public'))

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
