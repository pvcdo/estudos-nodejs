//Express
const express = require('express')

//módulos internos
const path = require('path')

const app = express()
const port = 3000

const templatePath = path.join(__dirname,'templates')

var checkAuth = function (req, res, next) { //esta é a função middleware que é chamada pelo método app.use na linha 25
    req.authStatus = true //aqui estamos criando o atributo authStatus no objeto de requisição e atribuindo a ele o valor de true
  
    if (req.authStatus) {
      console.log('Está logado, pode continuar')
      next() 
    } else {
      console.log('Não está logado, faça o login para continuar!')
      next()
    }
    //os dois next servem para finalizar o fluxo da função middleware e continuar com o projeto 
}   

app.use(checkAuth) //a função checkAuth é a função middleware. Ela vai ser executada entre o envio da requisição do usuário e a resposta do servidor.

app.get('/',(req,res) => { 
    res.sendFile(`${templatePath}/index.html`)
})

app.listen(port,()=>{ 
    console.log(`O servidor está rodando na porta ${port}`)
})