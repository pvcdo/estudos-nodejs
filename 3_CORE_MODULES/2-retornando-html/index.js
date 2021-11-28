const http = require('http')

const port = 3000

const server = http.createServer((req,res)=>{
    res.statusCode = 200 // código de status de sucesso
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Olá! Assim estou aceitando HTML!</h1>') // não alteramos o encode do texto e portanto na resposta do navegador haverá um erro ao renderizar a letra a com acento.
})

/* 
    A criação do servidor exige a passagem de uma função de callback que recebe os parâmetros de requisição (req) e resposta (res).

    No exemplo nós vamos dar uma resposta ao usuário de um texto simples "Servidor criado". Ao final temos que dar o comando end() para finalizar a resposta.

    Ele ainda não explicou o que fazer com o request nem como ele é manipulado pelo navegador.
*/

server.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`)
})

/*
    Depois de criar o servidor nós vamos dar o comando listen para ficar ouvindo o que será passado na porta especificada. No caso a porta será a 3000. Nós podemos passar uma função de callback para sinalizar que tudo está ok.

    Se eu agora abrir o meu navegador e digitar localhost:3000 será exibido o que escrevemos em server.res.write.
*/

/*
    Isso trava o navegador e o terminal. Para parar a execução desse método nós devemos dar ctrl + c.
*/
