const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
    partialsDir: ["views/partials/"], // isso indica que usaremos o partials para criar componentes no node e mostra a localização dos documentos que especificam estes componentes
});

app.use(express.static('public'))

app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')

app.get("/blog", function (req, res) {
    const posts = [
      {
        title: "Aprender Node.js",
        category: "Node.js",
        body: "Node.js é muito utilizado na programação hoje em dia",
        comments: 4,
      },
      {
        title: "PHP ainda vale a pena?",
        category: "PHP",
        body: "Muitos projetos legados utilizam PHP, além de Laravel ter bastante procura",
        comments: 12,
      },
      {
        title: "Os segredos de JavaScript",
        category: "JavaScript",
        body: "De front a back",
        comments: 5,
      },
    ];
  
    res.render("blog", { posts });
});

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

    res.render('home', {admin,time, auth})
})

app.listen(3000,() => {
    console.log('App rodando perfeitamente na porta 3000!')
})

