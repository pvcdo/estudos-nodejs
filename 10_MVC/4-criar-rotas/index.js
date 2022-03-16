const express = require('express')
const exphbs = require('express-handlebars')

const conn = require('./db/conn')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

const Task = require('./models/Task')

const taskRoutes = require('./routes/taskRoutes')

app.use('/tasks', taskRoutes)

conn.sync()
  .then(()=>{
    app.listen(3000, ()=>{
      console.log('App rodando na porta 3000')
    })
  })
  .catch(err => {console.err(err)})