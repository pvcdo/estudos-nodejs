const http = require('http')
const fs = require('fs')
const url = require('url')

const port = 3000

const server = http.createServer((req, res) => { // esta função será executada quando o servidor for acessado pelo navegador, usando o localhost:3000 (3000 é o número da porta que foi usada)
  var q = url.parse(req.url,true) // um método que transforma a url em um objeto
  //console.log(q.pathname[1])
  var filename = q.pathname.substring(1)

  if (filename.includes('html')) {
    if (fs.existsSync(filename)) {
      fs.readFile(filename, function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(data)
        return res.end()
      })
    } else {
      fs.readFile('404.html', function (err, data) {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.write(data)
        return res.end()
      })
    }
  }else if(filename === ""){
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      return res.end()
    })
  }
})

server.listen(port, () => { // toda vez que uma rota for executada no localhost:3000 será disparada o método createServer
  console.log(`Servidor rodando na porta: ${port}`)
})