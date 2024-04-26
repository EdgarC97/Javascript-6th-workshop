// 3.1 Creación de la Función con Closure
function crearSumador(x) {
  return function (y) {
    return x + y;
  };
}
// 3.2 Uso de la Función y Observación de Closures
let sumarCinco = crearSumador(5);
console.log(sumarCinco(3));
//ESTO IMPRIME LO MISMO
// console.log(crearSumador(5)(3)); 

// Experimentación Adicional
let sumarDiez = crearSumador(10);
console.log(sumarDiez(20));
//ESTO IMPRIME LO MISMO
//console.log(crearSumador(10)(20)); 



//Pregunta 1:
// Las funciones en JavaScript forman lo que se llama un closure, que es una combinación de una función y el entorno léxico en el que se creó. Esto significa que una función interna tiene acceso a las variables y parámetros de su función externa, incluso después de que la función externa haya terminado de ejecutarse. Esto es posible porque las funciones en JavaScript llevan consigo el entorno en el que fueron creadas.

//Pregunta 2:
//Cada closure que se crea tiene su propio entorno único, lo que significa que cada uno tiene su propio conjunto de variables. Esto puede llevar a un mayor uso de la memoria, especialmente si se crean muchas instancias de funciones con closures. Sin embargo, en la mayoría de los casos, este uso adicional de la memoria no es un problema. Solo en casos extremos, donde se crean miles o millones de closures, podría ser un problema.
