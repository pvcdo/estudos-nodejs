const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars') // o professor não explicou o que significa isso

app.get('/',(req,res)=>{
    const admin = {
        name: 'Paulo',
        surname: 'Oliveira',
        grlfd: 'Laís',
        son: 'Bernardo'
    }

    const time = "Cruzeiro"

    res.render('home', {admin,time}) // podemos observar que em comparação com o 1-instalacao-handlebars agora não temos mais o layout:false, indicando que agora estamos sim utilizando um layout
})

app.listen(3000,() => {
    console.log('App rodando perfeitamente!')
})

