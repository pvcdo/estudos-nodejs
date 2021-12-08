//Express
const express = require('express')

//módulos internos
const path = require('path')

const app = express()
const port = 3000

const templatePath = path.join(__dirname,'templates') //esse comando cria um caminho juntando as partes que queremos. __dirname é uma variável de ambiente que nos dá o caminho da pasta que estamos

//console.log(templatePath)

app.get('/',(req,res) => { // define o que fazer quando for acessada a rota /h1
    res.sendFile(`${templatePath}/index.html`) // emite uma resposta ao usuário com o conteúdo do arquivo ./templates/index.html. O caminho deve ser absoluto, por isso tivemos que usar o templatePath
})

app.listen(port,()=>{ // a partir da porta estabelecida o navegador fica observando se haverá alguma mudança de rota, executando os get quando isso ocorrer
    console.log(`O servidor está rodando na porta ${port}`)
})