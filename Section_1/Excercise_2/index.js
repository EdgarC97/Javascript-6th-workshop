// vars call
alert("BIenvenido a la practica del Hoisting");
console.log(`        // vars call
        console.log("Valor de a:", a);
        console.log("Valor de b:", b);
        console.log("Valor de c:", c);

        // functions call
        console.log("Resultado de funcionDeclarada:", funcionDeclarada());
        console.log("Resultado de funcionExpresada:", funcionExpresada());

        // vars declaration
        var a = 1;
        let b = 2;
        const c = 3;

        // functions declarations
        function funcionDeclarada() {
            return "Función declarada ha sido llamada.";
        }

        const funcionExpresada = function() {
            return "Función expresada ha sido llamada.";
        };`);
// Pregunta al usuario sus predicciones
let predA = prompt("¿Cuál crees que será el valor de 'a'?");
let predB = prompt("¿Cuál crees que será el valor de 'b'?");
let predC = prompt("¿Cuál crees que será el valor de 'c'?");
let predFuncionDeclarada = prompt(
  "¿Qué crees que devolverá 'funcionDeclarada'?"
);
let predFuncionExpresada = prompt(
  "¿Qué crees que devolverá 'funcionExpresada'?"
);

// Muestra las predicciones del usuario
console.log(`Tus predicciones fueron:
              \n Valor de a: ${predA}
              \n Valor de b: ${predB}
              \n Valor de c: ${predC}
              \n Resultado de funcionDeclarada: ${predFuncionDeclarada}
              \n Resultado de funcionExpresada: ${predFuncionExpresada}`);
//vars call
console.log("Valor de a:", a);
console.log("Valor de b:", b);
console.log("Valor de c:", c);

// functions call
console.log("Resultado de funcionDeclarada:", funcionDeclarada());
console.log("Resultado de funcionExpresada:", funcionExpresada());

// vars declaration
var a = 1;
let b = 2;
const c = 3;

// functions declarations
function funcionDeclarada() {
  return "Función declarada ha sido llamada.";
}

const funcionExpresada = function () {
  return "Función expresada ha sido llamada.";
};
