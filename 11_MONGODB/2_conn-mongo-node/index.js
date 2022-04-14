const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended:true,
  })
)

app.use(express.json())

let port = process.env.PORT || 3000

const conn = require('./db/conn')

app.listen(port, () => {
  console.log("Escutando na porta " + port)
})