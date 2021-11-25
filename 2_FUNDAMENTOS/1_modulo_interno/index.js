const meuModulo = require('./meu_modulo')
const soma = meuModulo.soma

soma(2,5)
soma(5,6)

/*
Na linha 1 temos a importação por meio do require do módulo criado em outro arquivo. 

Interessante notar que em caso de módulos internos, temos que passar o caminho relativo, se não passarmos o caminho o node irá procurar um módulo core ou externo com o nome especificado, gerando erros.

Na linha 2 nós atribuímos um nome ao método soma que é pertencente ao módulo meu_modulo.

No final, executamos o método.
*/