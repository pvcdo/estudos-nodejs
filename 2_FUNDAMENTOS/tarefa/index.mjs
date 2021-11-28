import inquirer from 'inquirer';
import chalk from 'chalk';

inquirer.prompt([
    {name: 'p1', message: "Qual seu nome?"},
    {name: 'p2', message: "Quantos anos você tem?"}
]).then((resps) => {
    console.log(chalk.bgYellow.black(`Seu nome é ${resps.p1} e você tem ${resps.p2} anos`))
}).catch((err) => {
    console.log(err)
})