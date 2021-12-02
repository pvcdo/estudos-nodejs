const fs = require('fs')

/*fs.stat('novoarquivo.txt', (err, stats) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(stats.isFile()) //retorna se é um arquivo
  console.log(stats.isDirectory()) // retorna se é um diretório
  console.log(stats.isSymbolicLink()) // retorna se é um link simbólico (como se fosse um atalho, usa-se muito em linux)
  console.log(stats.ctime) // data de criação
  console.log(stats.size) // tamanho do arquivo
})*/

fs.stat('pasta', (err, stats) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(stats.isFile()) //retorna se é um arquivo
    console.log(stats.isDirectory()) // retorna se é um diretório
    console.log(stats.isSymbolicLink()) // retorna se é um link simbólico (como se fosse um atalho, usa-se muito em linux)
    console.log(stats.ctime) // data de criação
    console.log(stats.size) // tamanho do arquivo
  })