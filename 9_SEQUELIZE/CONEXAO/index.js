const express = require('express');
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

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

//rota "home"
    app.get('/',(req,res)=>{
        res.render('home')
    })

//Inserindo dados no banco na tabela books
    app.post('/books/insertbook', (req,res) =>{
        const title = req.body.title
        const pageqty = req.body.pageqty

        const sql_query = `INSERT INTO books (??,??) VALUES (?,?)`

        const data = ['title','pageqty',title,pageqty]

        pool.query(sql_query, data, (err)=>{
            err ? console.log(err) : res.redirect('/books')
        })
    }) 

// Lendo TODOS os dados na tabela books do banco e os renderizando
app.get('/books', (req,res)=>{
    const sql_query = 'SELECT * FROM books'

    pool.query(sql_query, (err,data)=>{
        if(err){
            console.log(err)
            return
        }

        const list_books = data

        res.render('books', {list_books})
    })
})

// Lendo ALGUNS dados na tabela books do banco e os renderizando

app.get('/book/:id', (req,res)=>{
    const id = req.params.id

    const sql_query = `SELECT * FROM books WHERE ?? = ?`

    const data = ['id',id]

    pool.query(sql_query, data, (err,data)=>{
        if(err){
            console.log(err)
            return
        }

        const book = data[0] //data é uma lista de itens (que no nosso caso vai ter só um item)

        res.render('book', {book})
    })
})

//Estabelecendo a roda para a página de edição de livros
app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id

    const sql_query = `SELECT * FROM books WHERE ?? = ?`

    const data = ['id',id] 

    pool.query(sql_query, data, (err,data) => {
        if(err){
            console.log(err)
            return
        }

        const book = data[0] //data é uma lista de itens (que no nosso caso vai ter só um item)

        res.render('editbook', {book})
    })
})

//Rota post para persistir a edição enviada no form da página editbook.handlebars

app.post('/books/updatebook', (req,res) => {
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql_query = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
    
    const data = ['title',title,'pageqty',pageqty,'id',id]

    pool.query(sql_query, data, (err) => {
        if(err){
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

//Excluindo livros

app.post('/book/delete/:id', (req,res) => {
    const id = req.params.id

    const sql_query = `DELETE FROM books WHERE ?? = ?`

    const data = ['id',id]

    pool.query(sql_query, data, err => {
        if(err){
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

app.listen(3000, ()=>{
    console.log('App rodando na porta 3000')
})