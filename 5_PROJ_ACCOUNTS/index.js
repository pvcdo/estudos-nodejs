/* LEGENDAS */

// np = notas de aula pessoais
// nj = notas do projeto

/* FIM DE LENGENDAS */

// np - Iniciamos o projeto instalando pelo npm os módulos externos inquirer e chalk, além de chamar o core module fs

// np - Depois de instalados os pacotes externos, nós fomos ao package.json e definimos um script de nome start, que irá executar o comando "node index.js"

// nj - módulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

// nj - módulos internos
const fs = require('fs')

operation()

function operation() {

    // np - A assinatura do objeto do inquirer.prompt exige a criação dos parâmetros com os nomes corretos (choices, message, type, name)

    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }])
    .then((answer) => { // np - o retorno do input do usuário será um objeto com um atributo de chave igual ao name definido e valor igual à opção escolhida pelo usuário; no nosso caso o irá retornar um objeto com um atributo de chave 'action' e seu valor será a nossa escolha entre as choices. Nós atribuiremos a esse objeto o nome de answer

        //console.log(answer)
        const action = answer.action
        
        if(action === "Criar conta"){
            msgCreateAccount()
            buildAccount()
        }
    })
    .catch((err) => { //np - será executado caso dê algum erro
        console.log('Deu o erro ' + err)
    })
}

//nj - creat an account 
function msgCreateAccount(){
    console.log(chalk.bgGreen.black("Muito obrigado por escolher o nosso banco"))
    console.log(chalk.green("Vamos começar a criação da sua conta!"))
}

function buildAccount(){
    inquirer.prompt([{
        name: 'accountName',
        message: "Escreva um nome para a sua conta"
    }])
    .then((resp) => {
        const accountName = resp.accountName
        
        if(!fs.existsSync('./accounts')){
            fs.mkdirSync('./accounts')
        }

        if(fs.existsSync(`./accounts/${accountName}.json`)){
            console.log(chalk.bgRed(`A conta ${accountName} já existe. Gentileza escolher outro nome de conta`))
            buildAccount()
            return
        }else{
            fs.writeFileSync(`./accounts/${accountName}.json`,'{"balance":0}',(err) => {
                console.log(chalk.red(`Erro ${err}`))
                return
            })
            console.log(chalk.bgGreen.black("Parabéns! Sua conta foi criada com sucesso!"))
        }
    })
}