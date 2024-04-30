alert("Bienvenido a las reservas del hotel")
// Ruta del archivo data.json
const url = "data.json"; // Cambiar por la ruta correcta

// Función para cargar y mostrar el contenido de data.json
function cargarYMostrarData() {
  // Retorna una nueva promesa que se resuelve después del setTimeout
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Realiza la solicitud fetch dentro del setTimeout
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al cargar los datos.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Habitaciones:", data.rooms);
          console.log("Tipos de Habitaciones:", data.roomTypes);
          resolve(data); // Resuelve la promesa con los datos cargados
        })
        .catch((error) => {
          console.error(error);
          reject(error); // Rechaza la promesa si hay un error
        });
    }, 3000);
  });
}


// Llamar a la función para cargar y mostrar el contenido de data.json
cargarYMostrarData()
  .then(({ rooms, roomTypes }) => {
    // Mostrar el contenido de las habitaciones después de cargar los datos
    const userInput = prompt(
      "Ingrese el numero de habitacion a reservar: " +
        rooms
          .map((room) => {
            return `\nRoom Number: ${room.number} (${
              roomTypes.find((type) => type.id === room.type).name
            })`;
          })
          .join(", ")
    );
    // ... Continuar con la lógica de la app
  })
  .catch((error) => {
    console.error("Error al manejar la promesa:", error);
  });

  //---------------------------------

  let salir = false;

while (!salir) {
  console.log("Bienvenido al Sistema de Reservas de Hotel");
  console.log("1. Reservar habitación");
  console.log("2. Verificar disponibilidad");
  console.log("3. Ver reservas actuales");
  console.log("4. Cancelar reserva");
  console.log("5. Editar reserva");
  console.log("6. Salir");

  let opcion = prompt("Por favor, elige una opción:");

  if (opcion === null || opcion.trim() === "") {
    console.log("Por favor, ingresa una opción válida.");
    continue;
  }

  switch (opcion) {
    case "1":
      // Código para reservar habitación
      break;
    case "2":
      // Código para verificar disponibilidad
      break;
    case "3":
      // Código para ver reservas actuales
      break;
    case "4":
      // Código para cancelar reserva
      break;
    case "5":
      // Código para editar reserva
      break;
    case "6":
      salir = true;
      break;
    default:
      console.log("Por favor, elige una opción válida.");
  }
}

console.log("Gracias por usar nuestro sistema de reservas. ¡Hasta pronto!");
