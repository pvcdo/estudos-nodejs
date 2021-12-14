const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')

const hbs = exphbs.create({
    partialsDir: ["views/partials/"], // isso indica que usaremos o partials para criar componentes no node e mostra a localização dos documentos que especificam estes componentes
});

app.use(express.static('public'))

const rota_achocolatados = require('./routes/produtos/achocolatados')

app.use('/produtos/achocolatados',rota_achocolatados)

app.get('/',(req,res)=>{
    const achocolatados = [
        {
            nome: 'Xocopinho',
            valor: 8.98,
            validade: new Date(2022,0,5),
            sabor: 'Chocolate',
            rota: 'xocopinho'
        },
        {
            nome: 'Nescau',
            valor: 1.98,
            validade: new Date(2023,0,5),
            sabor: 'Morango',
            rota:'nescau'
        },
        {
            nome: 'Aleatório',
            valor: 100.98,
            validade: new Date(2050,11,29),
            sabor: 'Pitaya',
            rota:'aleatorio'
        }
    ]

    achocolatados.forEach(ac => {
        const dia  = ac.validade.getDate().toString()
        const diaF = (dia.length == 1) ? '0'+dia : dia
        const mes  = (ac.validade.getMonth()+1).toString() //+1 pois no getMonth Janeiro começa com zero.
        const mesF = (mes.length == 1) ? '0'+mes : mes
        const anoF = ac.validade.getFullYear();

        ac.validade = diaF + '/' + mesF + '/' + anoF
    })

    //console.log(datasValidade)

    const teste = ['a','b','c']

    res.render('home', {achocolatados})
})

app.listen(8080,()=>{
    console.log("App rodando na porta 8080")
})