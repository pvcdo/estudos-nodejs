const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars') // o professor não explicou o que significa isso

app.get('/dashboard', (req,res)=>{
    res.render('dashboard')
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
    console.log('App rodando perfeitamente!')
})

