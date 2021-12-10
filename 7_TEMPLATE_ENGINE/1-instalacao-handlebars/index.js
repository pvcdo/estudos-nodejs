const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars') // o professor não explicou o que significa isso

app.get('/',(req,res)=>{
    res.render('home', {layout: false}) // o layout:false será necessário agora por não termos um layout ainda
})

app.listen(3000,() => {
    console.log('App rodando perfeitamente!')
})

