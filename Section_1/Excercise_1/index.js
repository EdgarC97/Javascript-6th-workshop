// Global Scope
// Global Scope
var globalVariable = "Soy una variable global";

function testScope() {
    // Function Scope
    var functionVariable = "Soy una variable local";

    if (true) {
        // Block Scope
        let blockVariable = "Soy una variable de bloque";
        console.log("Dentro del bloque:", blockVariable);
    }

    console.log("Dentro de la función:", functionVariable);
}

// Convertir el código en una cadena
var codeString = `
var globalVariable = "Soy una variable global";

function testScope() {
    // Function Scope
    var functionVariable = "Soy una variable local";

    if (true) {
        // Block Scope
        let blockVariable = "Soy una variable de bloque";
        console.log("Dentro del bloque:", blockVariable);
    }

    console.log("Dentro de la función:", functionVariable);
}
console.log("Fuera de la función:", globalVariable);

testScope();

`;

// Imprimir la cadena en la consola
console.log(codeString);


// Explicación al usuario
alert("Vamos a realizar un quiz sobre el alcance de las variables en JavaScript. \n Te preguntaré sobre el valor de las variables en diferentes partes del código que ves en consola y tu tarea es seleccionar la opción correcta.");

let questionNumber = 1;
let userAnswer = "";
while (questionNumber <= 3) {
    switch (questionNumber) {
        case 1:
            userAnswer = prompt("Primera pregunta: ¿Cuál es el valor de globalVariable fuera de la función? \n1. Soy una variable local. \n2. Soy una variable de bloque. \n3. Soy una variable global.");
            if (userAnswer === "3") {
                alert("¡Correcto! Fuera de la función, el valor de globalVariable es: " + globalVariable + ". Esto es porque globalVariable es una variable global y su valor puede ser accedido desde cualquier parte del código.");
                questionNumber++;
            } else if (userAnswer === "1" || userAnswer === "2") {
                alert("Incorrecto. Fuera de la función, el valor de globalVariable es: " + globalVariable + ". Esto es porque globalVariable es una variable global y su valor puede ser accedido desde cualquier parte del código, no importa si es dentro de una función o un bloque.");
                questionNumber++;
            } else {
                alert("Opción inválida. Por favor, selecciona 1, 2 o 3.");
            }
            break;
        case 2:
            userAnswer = prompt("Segunda pregunta: ¿Cuál es el valor de blockVariable dentro del bloque? \n1. Soy una variable local. \n2. Soy una variable de bloque. \n3. Soy una variable global.");
            if (userAnswer === "2") {
                alert("¡Correcto! Dentro del bloque, el valor de blockVariable es: 'Soy una variable de bloque'. Esto es porque blockVariable es una variable de bloque y su valor solo puede ser accedido dentro del bloque donde fue declarada.");
                questionNumber++;
            } else if (userAnswer === "1" || userAnswer === "3") {
                alert("Incorrecto. Dentro del bloque, el valor de blockVariable es: 'Soy una variable de bloque'. Esto es porque blockVariable es una variable de bloque y su valor solo puede ser accedido dentro del bloque donde fue declarada.");
                questionNumber++;
            } else {
                alert("Opción inválida. Por favor, selecciona 1, 2 o 3.");
            }
            break;
        case 3:
            userAnswer = prompt("Tercera pregunta: ¿Cuál es el valor de functionVariable dentro de la función? \n1. Soy una variable local. \n2. Soy una variable de bloque. \n3. Soy una variable global.");
            if (userAnswer === "1") {
                alert("¡Correcto! Dentro de la función, el valor de functionVariable es: Variable dentro de un funcion. Esto es porque functionVariable es una variable local y su valor solo puede ser accedido dentro de la función donde fue declarada.");
                questionNumber++;
            } else if (userAnswer === "2" || userAnswer === "3") {
                alert("Incorrecto. Dentro de la función, el valor de functionVariable es: Variable dentro de una funcion Esto es porque functionVariable es una variable local y su valor solo puede ser accedido dentro de la función donde fue declarada.");
                questionNumber++;
            } else {
                alert("Opción inválida. Por favor, selecciona 1, 2 o 3.");
            }
            break;
    }
}

console.log("Fuera de la función:", globalVariable);

testScope();
