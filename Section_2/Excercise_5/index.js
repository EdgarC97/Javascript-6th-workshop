function manejarAsincronia(callback, promesa) {
  // Creamos una promesa que se resuelve o se rechaza después de 2 segundos
  promesa = new Promise((resolve, reject) => {
    setTimeout(() => {
      let todoOk = Math.random() > 0.5; // Simulamos un resultado aleatorio
      if (todoOk) {
        resolve("¡Promesa cumplida!");
      } else {
        reject("Algo salió mal");
      }
    }, 2000);
  });

  promesa
    .then((message) => {
      // Ejecutamos el callback con el mensaje de resolución
      callback(null, message);
    })
    .catch((error) => {
      // Ejecutamos el callback con el error
      callback(error, null);
    });
}

// Definimos el callback
let callback = function (error, message) {
  if (error) {
    console.log(
      "Error:",
      error
    );
  } else {
    console.log(message + " ¡Callback ejecutado!");
  }
};

// Invocamos la función
manejarAsincronia(callback);

//5.5
//¿Qué sucede si cambias el tiempo de resolución de la promesa a 5 segundos o a 1 segundo?
//Answer: Si cambio el tiempo de resolución de la promesa a 5 segundos o a 1 segundo, el callback se ejecutará después de ese tiempo. Esto se debe a que el callback solo se ejecuta una vez que la promesa se resuelve, y la promesa se resuelve después del tiempo especificado en setTimeout.

//- ¿Cómo se comporta la función si la promesa es rechazada en lugar de resuelta?
//Answer: Si la promesa es rechazada en lugar de resuelta, la función manejarAsincronia manejará el rechazo en el bloque .catch de la promesa. En este bloque, se llama al callback con el error como primer argumento y se imprimirá el mensaje de error en la consola.

//- ¿Puedes modificar la función para que el callback maneje diferentes tipos de información dependiendo del resultado de la promesa?
//Answer: Si,Para hacer esto, puedo pasar la información como argumento al callback cuando lo llamo en el bloque then de la promesa. Por ejemplo, si la promesa se resuelve con un valor, puedo pasar ese valor al callback. Si la promesa se rechaza con un error, puedo pasar ese error al callback.
