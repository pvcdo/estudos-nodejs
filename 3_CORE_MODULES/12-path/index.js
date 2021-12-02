const path = require('path')

const customPath = '/relatorios/matheus/relatorio1.pdf'

console.log(path.dirname(customPath)) // caminho até o arquivo "/relatorios/matheus"
console.log(path.basename(customPath)) // nome do arquivo "relatorio1.pdf"
console.log(path.extname(customPath)) // extensão do arquivo ".pdf"