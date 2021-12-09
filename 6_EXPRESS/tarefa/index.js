const express = require('express');

const path = require('path');

const app = express();
const serve = 5000;

const pagesPath = path.join(__dirname,'/pages')

const contato = require('./routes/contato')
const portfolio = require('./routes/portfolio')

app.use('/contato',contato)
app.use('/portfolio',portfolio)

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(`${pagesPath}/index.html`)
})

app.use((req,res,next) => {
    res.status(404).sendFile(`${pagesPath}/404.html`)
})

app.listen(serve,()=>{
    console.log(`App rodando na porta ${serve}`)
})