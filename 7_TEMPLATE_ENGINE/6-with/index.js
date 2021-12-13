const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars',exphbs.engine()) // middleware que vai rodar quando o método render do response de um get for rodado
app.set('view engine','handlebars') // o professor não explicou o que significa isso, mas imagino que seja algo obrigatório para o correto uso do handlebars como criador de templates

app.get("/post", function (req, res) {
    const post = {
      title: "Aprender Node.js",
      category: "Node.js",
      body: "Node.js é muito utilizado na programação hoje em dia",
      comments: 4,
    };
  
    res.render("blogpost", { post });
})

app.get('/dashboard', (req,res)=>{
    const items = ['item 1','item 2','item 3']

    res.render('dashboard',{items})
})

app.get('/',(req,res)=>{
    const admin = {
        name: 'Paulo',
        surname: 'Oliveira',
    }

    const time = "Cruzeiro"

    const auth = true

    res.render('home', {admin,time, auth}) //estou enviando as variáveis admin, time e auth para a página home.handlebars, que está na pasta views (padrão do handlebars)
})

app.listen(3000,() => {
    console.log('App rodando perfeitamente na porta 3000!')
})

