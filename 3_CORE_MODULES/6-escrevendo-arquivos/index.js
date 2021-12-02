const http = require("http");
const fs = require("fs");

const port = 3000;

const server = http.createServer((req, res) => {
  var urlInfo = require("url").parse(req.url, true);
  const name = urlInfo.query.name;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  if (!name) {
    fs.readFile("index.html", function (err, data) {
      //data é o texto do arquivo lido
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();

      /*
        Caso a url passada no navegador para abrir a página não tenha uma query que contenha um parâmetro name, o arquivo index.html é lido, armazenado na memória e seu conteúdo é escrito na tela. 
        
        No index.html há um formulário que ao ser preenchido recarrega a página enviando uma requisição com uma query com um parâmetro name cujo valor é a resposta ao formulário. No ato da página ser recarregada é constatado a existência de query.name e portanto caímos no else.
      */
    });
  } else {
    /*fs.writeFile("arquivo.txt", name, function (err, data) {
      res.writeHead(302, {
        Location: "/",
      });
      return res.end();
    });*/

    fs.appendFile("arquivo.txt", name + ',\r\n' , function (err, data) {
      res.writeHead(302, {
        Location: "/",
      });
      return res.end();
    });

    /* 
        Ao ser encontrado o query.name é escrito um arquivo.txt contendo no valor de name, além disso é criado o cabeçalho de resposta com o status 302 e a página é recarregada sem nenhuma tag query. Tudo isso é feito com o comando fs.writeFile. Esse comando porém substitui tudo o que estava anteriormente escrito nesse arquivo.

        O comando fs.appendFile, porém, adiciona textos ao arquivo, atualizando seu valor.

           \n\r é uma tag de quebra de linha compatível para windows e linux 
    */
  }
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});