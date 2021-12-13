const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')

const hbs = exphbs.create({
    partialsDir: ["views/partials/"], // isso indica que usaremos o partials para criar componentes no node e mostra a localização dos documentos que especificam estes componentes
});

app.use(express.static('public'))

app.get('/',(req,res)=>{
    const achocolatados = [
        {
            nome: 'Xocopinho',
            valor: 8.98,
            validade: new Date(2022,0,5),
            sabor: 'Chocolate'
        },
        {
            nome: 'Nescau',
            valor: 1.98,
            validade: new Date(2023,0,5),
            sabor: 'Morango'
        },
        {
            nome: 'Aleatório',
            valor: 100.98,
            validade: new Date(2050,11,29),
            sabor: 'Pitaya'
        }
    ]

    const teste = ['a','b','c']

    res.render('home', {achocolatados})
})

app.listen(8080,()=>{
    console.log("App rodando na porta 8080")
})