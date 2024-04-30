alert("Bienvenido al contador Magia con Closures")

// Se solicita al usuario que ingrese el valor inicial del contador
let valorInicial = Number(prompt("Por favor, ingresa el valor inicial del contador"));
console.log(`El valor actual del contador es: ${valorInicial}`);

function contador(valorInicial) {
    // Se inicializa el valor del contador con el valor proporcionado por el usuario
    let valorContador = valorInicial;
    //// Se retorna una función anonima que incrementa el valor del contador y muestra su valor actual (closure)
    return function() { 
        valorContador++;
        console.log(`El valor actual del contador es: ${valorContador}`);
    };
}

// Llamada a la función con un argumento que se utiliza para establecer el valor inicial del contador.
let miContador = contador(valorInicial);

//- Se utiliza un bucle while para preguntar al usuario si desea incrementar el contador o salir.
while (true) {
    let respuesta = confirm("¿Deseas incrementar el contador?\n-Acepta para incrementar\n-Cancela para salir)");
    if (respuesta) {
        miContador();
    } else {
        alert("Gracias por usar el contador, vuelve pronto");
        break;
    }
}
