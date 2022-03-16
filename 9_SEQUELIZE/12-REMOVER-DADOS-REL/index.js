const express = require('express');
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/Users')
const Address = require('./models/Address')

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
) //middleware usado para pegar recuperar o texto do body 

app.use(express.json()) //usado para pegar o body em json

app.use(express.static('public'))

app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')

app.post('/address/delete', (req,res)=>{
    const id_address = req.body.id_address
    const id_user = req.body.id_user

    Address.destroy({
        where: {id: id_address}
    })
        .then(res.redirect(`/users/edit/${id_user}`))
        .catch((error)=>console.error(error))
})

app.post('/address/create', (req,res)=>{
    const street = req.body.street;
    const number = req.body.number;
    const city = req.body.city;
    const UserId = req.body.UserId;

    const address = {street,number,city,UserId}

    Address.create(address)
        .then(()=>{
            res.redirect(`/users/edit/${UserId}`)
        })
        .catch((err)=>console.error(err))
})

app.post('/users/delete/:id', (req,res) => {
    const id = req.params.id
    User.destroy({
        where:{id}
    })
        .then((user) => {
            res.redirect('/')
        })
        .catch((e) => console.error('erro: ' + e))
})

app.post('/users/create', async(req, res) =>{
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === "on"){ //quando o checkbox está marcado seu valor é a string "on", caso contrário é null
        newsletter = true
    }else{
        newsletter = false
    }

    await User.create({name,occupation,newsletter})

    res.redirect('/')
})

app.post('/users/update', (req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if(newsletter === "on"){
        newsletter = true
    }else{
        newsletter = false
    }

    const atualizacao = {id,name,occupation,newsletter}

    User.update(atualizacao,{
        where:{id}
    })
        .then(() => res.redirect('/'))
        .catch((err) => console.error(err))
})

app.get('/users/edit/:id', (req,res) => {
    const id = req.params.id
    User.findOne({
        where:{id},
        include: Address
    })
        .then((user) => {
            res.render('edituser', {user: user.get({plain:true})})
        })
        .catch((err)=>console.error(err))
})

app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.get('/users/:id', async (req, res) => {
    
    const id = req.params.id

    const user = await User.findOne({
        raw: true,
        where: {id} //podderia ser também where:{id:id}, mas eu imagino que dará no mesmo devido às regras de declaração de objeto do javascript
    })

    res.render('userview', {user})
})

//rota "home"
app.get('/', async(req,res)=>{
    const users = await User.findAll({raw:true}) //raw:true indica que o retorno não terá algumas informações de metadados que para nós são desnecessárias
    res.render('home', {users})
})

conn.sync()
//conn.sync({force:true}) //recria o banco, excluindo todos os dados que porventura já tenham nele
    .then(() => {
        app.listen(3000, ()=>{
            console.log('App rodando na porta 3000')
        })
    })
    .catch(err => console.error("Erro: " + err))
