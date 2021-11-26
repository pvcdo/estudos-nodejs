// mais de uma valor
const x = 10;
const y = "Matheus";

console.log(x, y);

// contagem de impressões 
// conta quantas vezes o que está no count foi utilizado no script
console.count(`O valor de x é: ${x} -> contagem`); // aqui utilizando template string
console.count("x " + x + " -> contagem:");
console.count(`O valor de x é: ${x} -> contagem`);
console.count("x " + x + " -> contagem:");
console.count("O valor de y é: " + y + " -> contagem:");

// variável entre string
// substitui o código %s pelo valor que está especificado no final
console.log("O nome dele é %s", y);

// limpando console
setTimeout(() => {
  console.clear();
}, 2000);