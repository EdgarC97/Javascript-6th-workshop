// Explicación al usuario
alert(
  "Vamos a realizar un quiz sobre Hoisting. \nTe preguntaré sobre el resultado de cada operación en diferentes partes del código que ves en consola y tu tarea es seleccionar la opción correcta."
);
// Muestra el script al usuario
console.log(`El script es:
// vars call
// console.log("Valor de a:", a);
// console.log("Valor de b:", b);
// console.log("Valor de c:", c);

// functions call
// console.log("Resultado de funcionDeclarada:", funcionDeclarada());
// console.log("Resultado de funcionExpresada:", funcionExpresada());

// vars declaration
// var a = 1;
// let b = 2;
// const c = 3;

// functions declarations
// function funcionDeclarada() {
//   return "Función declarada ha sido llamada.";
// }

// const funcionExpresada = function () {
//   return "Función expresada ha sido llamada.";
// };`);

// Preguntas y respuestas correctas
let preguntas = ["a", "b", "c", "funcionDeclarada", "funcionExpresada"];
let respuestasCorrectas = ["undefined", "Error", "Error", "Función declarada ha sido llamada.", "Error"];

// Opciones para el usuario
let opciones = ["1", "undefined", "Error"];

// Bucle para hacer las preguntas
for (let i = 0; i < preguntas.length; i++) {
  let respuestaUsuario = prompt(`¿Cuál crees que será el resultado de '${preguntas[i]}'? \n 1) ${opciones[0]} \n 2) ${opciones[1]} \n 3) ${opciones[2]}`);
  
  // Comprobación de la respuesta
  if (respuestaUsuario === null || respuestaUsuario === "" || ![1, 2, 3].includes(Number(respuestaUsuario))) {
    console.error("Por favor, selecciona una opción válida."); 
    i--;
  } else {
    let resultado;
    if (opciones[respuestaUsuario - 1] === respuestasCorrectas[i]) {
      resultado = "Correcto: \n";
      if (i == 0) {
        resultado += "En JavaScript, las variables declaradas con var son “hoisted” al inicio de su ámbito.\nSin embargo, aunque la declaración de la variable (es decir, var a) se levanta al inicio del ámbito, la inicialización (es decir, a = 1) no lo hace.\n\nPor lo tanto, en el momento en que se llama console.log('Valor de a:', a);, la variable a ya ha sido declarada, pero aún no se ha inicializado.";
      } else if (i == 1) {
        resultado += "Las variables declaradas con let en JavaScript también tienen un comportamiento de “hoisting”, pero a diferencia de var, no se inicializan con undefined.\n\nEsto significa que si intentas acceder a ellas antes de que se declaren, obtendrás un error de ReferenceError indicando que b no está definido.";
      } else if (i == 2) {
        resultado += "Las variables declaradas con const en JavaScript también tienen un comportamiento de “hoisting”, pero a diferencia de var, no se inicializan con undefined.\n\nEsto significa que si intentas acceder a ellas antes de que se declaren, obtendrás un error de ReferenceError indicando que c no está definido.";
      } else if (i == 3) {
        resultado += "Las funciones declaradas en JavaScript también son “hoisted” al inicio de su ámbito, lo que significa que se pueden llamar antes de que se declaren en el código.\nEn el script se llama a funcionDeclarada con console.log('Resultado de funcionDeclarada:', funcionDeclarada()); antes de que se declare con function funcionDeclarada() {...}.\nSin embargo, debido al “hoisting”, esto no es un problema y la función se ejecutará correctamente.";
      } else if (i == 4) {
        resultado += "Las funciones expresadas en JavaScript, como const funcionExpresada = function () {...}, no son “hoisted” al inicio de su ámbito.\nEsto significa que no se pueden llamar antes de que se declaren en el código.\nEn el script se intenta llamar a funcionExpresada antes de que se declare.\nPor lo tanto, este código generará un error de TypeError indicando que funcionExpresada no es una función.";
      }
    } else {
      resultado =  console.error(`Incorrecto`);
    }
  }
  
  // Actualización de las opciones para las funciones
  if (i == 2) {
    opciones = ["Función declarada ha sido llamada.", "Función expresada ha sido llamada.", "Error"];
  }
}
