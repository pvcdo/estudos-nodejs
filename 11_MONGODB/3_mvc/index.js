const express = require('express')
const exphbs = require('express-handlebars')

const port = process.env.PORT || 3000

const conn = require('./db/conn')

//Controllers
const HistoriesController = require('./controllers/HistoriesController')

//Routes
const historiesRoutes = require('./routes/historiesRoutes')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(
  express.urlencoded({
    extended:true,
  })
)

app.use(express.json())

app.use('/histories', historiesRoutes)

app.get('/', HistoriesController.home)

app.listen(port, () => {
  console.log("Escutando na porta " + port)
})