const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const port = 3000

const conn = require('./db/conn')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(
  express.urlencoded({
    extended:true,
  })
)

app.use(express.json())

app.use(
  session({
    name: 'session',
    secret: 'secret_paulo',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000, //1 hora em milissegundos
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  })
)

app.use(flash())

app.use((req,res,next)=>{
  //console.log(req.session.userid);

  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
})

//Models
const User = require('./models/User')
const Tought = require('./models/Tought')

//Routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const ToughtsController = require('./controllers/ToughtsController')

app.use('/toughts', toughtsRoutes)
app.use('/', ToughtsController.showToughts)

conn
  //.sync({force:true})
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log('Servidor escutando na porta ' + port)
    })
  })
  .catch(e => console.error(e))
