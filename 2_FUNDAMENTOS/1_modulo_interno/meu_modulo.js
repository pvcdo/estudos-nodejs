// primeira forma de exportar
module.exports = {
    soma(a,b){
        console.log(a+b)
    }
}

// segunda forma de exportar
/*function soma(a,b){
    console.log(a+b)
}

module.exports = soma
*/

/*

Essa é a forma de exportar um módulo.

Primeiro nós executamos o comando module.exports e atribuímos a ele um objeto que irá encapsular todo o nosso script.

Normalmente nós declararíamos a função soma como o comando function antes do nome da função, porém para exportar devemos realizar dessa maneira.

*/