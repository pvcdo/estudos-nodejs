const http = require("http");
const url = require("url");

const port = 3000;

const server = http.createServer((req, res) => {
  var urlInfo = require("url").parse(req.url, true);
  const name = urlInfo.query.name;

  /* 
    Aqui nós estamos pegando a url passada na requisição e a partir dela nós vamos pegar o atributo name.
  */

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  if (!name) {
    res.end(
      "<h1>Preencha seu nome:</h1><form method='GET'><input type='text' name='name'/><input type='submit' value='Enviar'></form>"
    );
  } else {
    res.end(`<h1>Seja bem-vindo ${name}!</h1>`);
  }

  /* 
    Caso não tenha o atributo name na url passada para o servidor, o sistema vai exibir um formulário que ao ser preenchido redirecionará para um recarregamento da página, agora com o atributo name que foi gerado pela resposta ao formulário.
  */
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});