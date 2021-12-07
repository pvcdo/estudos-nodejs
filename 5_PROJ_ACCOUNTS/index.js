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
        }else if(action === "Consultar saldo"){
            consultAmount()
        }else if(action === "Depositar"){
            deposit()
        }else if(action === "Sacar"){
            withdraw()
        }else if(action === "Sair"){
            exit()
        }
    })
    .catch((err) => { //np - será executado caso dê algum erro
        console.log('Deu o erro ' + err)
    })
}

//nj - global functions

    function checkAccount(accountName){
        return fs.existsSync(`./accounts/${accountName}.json`)
    }

    function getAccount(accountName){
        /**
         * 
         * Retorna o objeto da conta.
         *  */ 

        const accountTXT = fs.readFileSync(`./accounts/${accountName}.json`,{
            encoding: 'utf-8', // aqui coloca a possibilidade de usar nossos caracteres especiais
            flag: 'r' //aqui informa que o arquivo será somente leitura
        }) //essa função no caso retornará o arquivo como um arquivo de texto
        return JSON.parse(accountTXT) //aqui eu estou transformando o texto que nós recuperamos em um arquivo JSON
    }

//nj - create an account 
    function msgCreateAccount(){
        console.log(chalk.bgGreen.black("Muito obrigado por escolher o nosso banco"))
        console.log(chalk.green("Vamos começar a criação da sua conta!"))
    }

    function buildAccount(){
        inquirer.prompt([{
            name: 'accountName',
            message: "Escreva um nome para a sua conta (menu para ir para o menu / sair para fechar o programa)"
        }])
        .then((resp) => {
            const accountName = resp.accountName

            if(accountName === "menu"){
                operation()
                return
            }

            if(accountName === "sair"){
                exit()
            }
            
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
                operation()
            }
        })
    }

// nj - consult wallet

    function consultAmount(){
        inquirer.prompt([{
            name:"accountName",
            message:'Qual conta você quer consultar?  (menu para ir para o menu / sair para fechar o programa)'
        }])
        .then((answer) => {
            const accountName = answer.accountName
            if(accountName === "menu"){
                operation()
                return
            }

            if(accountName === "sair"){
                exit()
            }
            if(!checkAccount(accountName)){ //verifica se a conta existe e caso não exista, dá um recado e volta para o início da função
                console.log(chalk.bgRed.black(` A conta ${accountName} não existe. Gentileza escolher uma conta válida `))
                return consultAmount()
            }

            const accountData = getAccount(accountName)
            console.log(chalk.black.bgBlue(` A conta ${accountName} possui R$${accountData.balance} `))
            operation()
        })
        .catch((err) => console.log(err + " - erro em consultAmount"))
    }

// nj - add an amount to user account

    function deposit(){
        inquirer.prompt([{
            name: 'accountName',
            message: 'Qual a conta que você quer depositar?  (menu para ir para o menu / sair para fechar o programa)'
        }])
        .then((answer) => {
            const accountName = answer.accountName
            if(accountName === "menu"){
                operation()
                return
            }

            if(accountName === "sair"){
                exit()
            }
            if(!checkAccount(accountName)){
                console.log(chalk.bgRed.black(` A conta ${accountName} não existe. Gentileza escolher uma conta válida `))
                return deposit()
            }
            
            inquirer.prompt([{
                name: "amount",
                message:"Quanto você deseja depositar?"
            }])
            .then((answer) => {
                const amount = answer.amount
                if(addAmount(accountName,amount)){
                   return deposit()
                }else{
                    operation()
                }
                
            })
            .catch(err => console.log(err + " no inquirer name amount"))
        })
        .catch(err => console.log(err + " no inquirer name accountName"))
    }

    function addAmount(accountName, amount){
        if(!isNaN(amount) && amount){
            let accountData = getAccount(accountName)

            const new_value = parseFloat(accountData.balance) + parseFloat(amount)

            fs.writeFileSync(
                `./accounts/${accountName}.json`,
                `{"balance":${new_value}}`
            )

            console.log(chalk.green(`Foi depositado R$${amount} na conta ${accountName}`))

            accountData = getAccount(accountName)
            console.log(chalk.black.bgBlue(` A conta ${accountName} possui R$${accountData.balance} `))
        }else{
            console.log(chalk.bgRed.black(' Insira um valor de saque válido! '))
            return true
        }
        
    }

// nj - withdraw an amount from user account

    function withdraw(){
        inquirer.prompt([{
            name: 'accountName',
            message: 'De qual a conta que você quer sacar? (menu para ir para o menu / sair para fechar o programa)'
        }])
        .then((answer) => {
            const accountName = answer.accountName
            if(accountName === "menu"){
                operation()
                return
            }

            if(accountName === "sair"){
                exit()
            }
            if(!checkAccount(accountName)){
                console.log(chalk.bgRed.black(` A conta ${accountName} não existe. Gentileza escolher uma conta válida `))
                return withdraw()
            }

            inquirer.prompt([{
                name: "amount",
                message:"Quanto você deseja sacar?"
            }])
            .then((answer) => {
                const amount = answer.amount
                if(removeAmount(accountName,amount)){
                   return withdraw()
                }else{
                    operation()
                }
                
            })
            .catch(err=>console.log(err + ' erro no amount do withdraw'))

        })
        .catch(err=>console.log(err + ' erro no withdraw'))

    }

    function removeAmount(accountName,amount){
        if(!isNaN(amount) && amount){
            let accountData = getAccount(accountName)
            if(amount <= accountData.balance){
                const new_value = parseFloat(accountData.balance) - parseFloat(amount)

                fs.writeFileSync(
                    `./accounts/${accountName}.json`,
                    `{"balance":${new_value}}`
                )

                console.log(chalk.green(` Foi sacado R$${amount} da conta ${accountName} `))
            }else{
                console.log(chalk.bgRed.black(` A conta ${accountName} não tem saldo suficiente para esse saque. `))
            }
            accountData = getAccount(accountName)
            console.log(chalk.black.bgBlue(` A conta ${accountName} possui R$${accountData.balance} `))
        }else{
            console.log(chalk.bgRed.black(' Insira um valor de saque válido! '))
            return true
        }
        
    }

// nj - exist of program

function exit() {
    console.log(chalk.bgBlue.black(' Obrigado por usar o Accounts! '))
    process.exit() // np - isso mata o programa
}