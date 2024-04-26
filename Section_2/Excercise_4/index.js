console.log("Intentando llamar a 'funcionDeclarada' antes de su declaración:");
try {
  console.log(funcionDeclarada());
} catch (error) {
  console.log("Error:", error.message);
}

console.log("Intentando llamar a 'funcionExpresada' antes de su declaración:");
try {
  console.log(funcionExpresada());
} catch (error) {
  console.log("Error:", error.message);
}

// Declaración de una función declarada
function funcionDeclarada() {
  return "Función declarada ha sido llamada.";
}

// Declaración de una función expresada
const funcionExpresada = function () {
  return "Función expresada ha sido llamada.";
};

console.log("Llamando a 'funcionDeclarada' después de su declaración:");
console.log(funcionDeclarada());

console.log("Llamando a 'funcionExpresada' después de su declaración:");
console.log(funcionExpresada());

//4.3
// - ¿Qué sucedió cuando intentaste llamar a las funciones antes de su declaración?

//Answer: Cuando intenté llamar a las funciones antes de su declaración, funcionDeclarada se ejecutó sin problemas, pero funcionExpresada lanzó un error ReferenceError.

// - ¿Cómo difieren los resultados entre la función declarada y la función expresada?

//Answer: Los resultados difieren entre la función declarada y la función expresada debido a cómo JavaScript maneja el hoisting. Las funciones declaradas son completamente hoisted, lo que significa que pueden ser llamadas antes de su declaración. Sin embargo, aunque las funciones expresadas también son hoisted, solo se elevan las declaraciones, no las inicializaciones. Por lo tanto, no puedes llamar a una función expresada antes de su declaración.


// - ¿Qué indica esto sobre cómo el JavaScript maneja estas dos diferentes declaraciones de funciones?

//Answer: Indica que las funciones declaradas son completamente hoisted, mientras que las funciones expresadas solo son hoisted en su declaración, no en su inicialización.