//serve para abrir a minha apostila no navegador de um jeito mais fácil

const http = require("http");
const fs = require("fs");

const port = 8080;

const server = http.createServer((req, res) => {

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    fs.readFile("Apostila.html", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
    });
})

server.listen(port, () => {
    console.log(`A apostila está aberta em http://localhost:${port}`);
});