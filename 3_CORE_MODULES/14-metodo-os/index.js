const os = require("os");

console.log(os.cpus()); //quantos cpus

console.log(os.freemem()); // quanto de memória livre na máquina em bytes

console.log(os.homedir()); // qual diretório principal da máquina

console.log(os.type()); // qual sistema operacional está rodando?