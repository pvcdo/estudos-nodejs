const readline = require('readline')
const chalk = require('chalk')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
rl.question("Qual seu time do coração? ", (clube) => {
    if(clube !== 'Cruzeiro'){
        console.log("Isso nem é time")
    }else{
        console.log(chalk.blue('VAMOS VAMOS CRUZEIRO!!!'))
    }
    rl.close()
})