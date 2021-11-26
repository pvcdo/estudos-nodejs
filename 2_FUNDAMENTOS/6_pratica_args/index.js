/*é necessário passar argumentos inline no terminal para conseguirmos executar este script*/

const minimist = require('minimist')
const soma = require('./matematica').soma

const args = minimist(process.argv.slice(2))
/* O process.argv retorna um array com 2 + N elementos, sendo os dois primeiros elementos o caminho do executável do node e o segundo o caminho do arquivo que está executando o node.

N é o número de argumentos passados na linha de comando, assim, se for passado apenas um argumento o process.argv retornará 3 elementos, se 2, retornará 4, e assim sucessivamente.

O slice é um método de arrays que extrai os elementos de um array (https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).
*/
console.log(args)

const a = parseInt(args['a'])
const b = parseInt(args['b'])

soma(a,b)
