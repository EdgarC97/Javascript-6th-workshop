alert("Bienvenido a  Domina las Web APIs con Promesas y Fetch")
// Definimos la función userInput que devuelve una promesa
function userInput() {
    return new Promise((resolve, reject) => {
        // Solicitamos al usuario que ingrese un número de segundos
        let n = prompt("Por favor, ingresa el número de segundos:");
        // Si el usuario no ingresa un número válido, rechazamos la promesa con un mensaje de error
        if (n === "" || n === null) {
            reject('Debes ingresar un número.');
        }else if (isNaN(n)) {
            reject('Debes ingresar un número válido.');
        } else {
            // Si el usuario ingresa un número válido, resolvemos la promesa después del número de segundos ingresado, se multiplica x1000 para pasarla el setTimeout a segundos
            setTimeout(() => {
                resolve(`Han pasado ${n} segundos.`);
            }, n * 1000);
        }
    });
}

// Llamamos a la función userInput y encadenamos las promesas
userInput()
    .then(message => {
         // Cuando la promesa userInput se resuelve, mostramos el mensaje en la consola
        console.log(message);
        // Luego, realizamos una solicitud fetch a la URL proporcionada
        return fetch('https://jsonplaceholder.typicode.com/posts');
    })
    .then(response => {
        // Si la respuesta de la solicitud fetch no es exitosa, rechazamos la promesa con un mensaje de error personalizado
        if (!response.ok) {
            return Promise.reject(`HTTP error! status: ${response.status}`);
        }
        // Si la respuesta de la solicitud fetch es exitosa, devolvemos la respuesta como JSON
        return response.json();
    })
    .then(json => {
        // Cuando la promesa de la respuesta JSON se resuelve, mostramos los datos en la consola
        console.log(json);
    })
    .catch(error => {
        // Si ocurre algún error en cualquier punto de la cadena de promesas, lo manejamos aquí y mostramos un mensaje de error en la consola
        console.log('Hubo un problema: ' + error);
    });
