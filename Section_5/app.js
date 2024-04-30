alert("Bienvenido a las reservas del hotel");
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

let flag = true;
function crearReserva(numeroHabitacion, fechaInicio, fechaFin, huesped) {
  function generarGeneradorId() {
    let id = 1; // Variable id se inicializa fuera de la función interna

    return function () {
      return id++; // Cada vez que se llama a la función, se incrementa id y se devuelve
    };
  }

  const generarId = generarGeneradorId(); // Se obtiene la función interna generarId()

  // Pruebas
  console.log(generarId()); // 1
  console.log(generarId()); // 2
  console.log(generarId()); // 3
  console.log(generarId()); // 4
  console.log(generarId()); // 5
}
while (flag) {
  let option = prompt(`Por favor ingresa una de las siguientes opciones:
        1. Reservar habitación
        2. Verificar disponibilidad
        3. Ver reservas actuales
        4. Cancelar reserva
        5. Editar reserva
        6. Salir`);

  if (option === null || option.trim() === "") {
    alert("Por favor, ingresa una opción válida.");
    continue;
  }

  switch (option) {
    case "1":
      // Código para reservar habitación
      let peopleNumber = prompt("Cuantas personas se alojarán?");
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
      flag = false;
      break;
    default:
      alert("Por favor, elige una opción válida.");
  }
}

console.log("Gracias por usar nuestro sistema de reservas. ¡Hasta pronto!");
