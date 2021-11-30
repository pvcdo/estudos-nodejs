const url = require('url')
const address = 'https://www.meusite.com.br/catalogo?produtos=cadeira'
const parsedUrl = new url.URL(address)

/* 
    url é um módulo, URL é sua subclasse que apresenta atributos e métodos onde, a partir de uma url, é possível resgatar várias informações.
*/

console.log(parsedUrl.host)
console.log(parsedUrl.pathname)
console.log(parsedUrl.search)
console.log(parsedUrl.searchParams)
console.log(parsedUrl.searchParams.get('produtos'))