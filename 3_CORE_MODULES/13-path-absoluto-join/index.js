const path = require('path')

// path absoluto
console.log(path.resolve('teste.txt')) //escreve o caminho completo até o arquivo. Vimos aqui que o arquivo não precisa existir...

// formar path
const midFolder = 'relatorios'
const fileName = 'matheus.txt'

const finalPath = path.join('/', 'arquivos', midFolder, fileName) //constroi um texto

console.log(finalPath)