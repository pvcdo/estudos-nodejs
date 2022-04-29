const express = require('express')
const app = express()

app.use(express.urlencoded({
  extended:true
}))

app.use(express.json())

app.get('/',(req,res) => {
  res.json({
    message: "Estamos prontos!"
  })
})

app.post('/createproduct',(req,res) => {
  const {name, price} = req.body

  if(!name || !price){
    res.status(422).json({message:"Todos os campos são de preenchimento obrigatório"})
    return
  }

  res
  .status(201)
  .json({message: `O produto ${name} foi criado com o valor de ${price}`})
})

app.listen(3000)