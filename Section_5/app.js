alert("Bienvenido a las reservas del hotel");
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
    }, 1000);
  });
}

cargarYMostrarData()
  .then((data) => {
    // Mostrar el contenido de las habitaciones después de cargar los datos
    bucleMenu(data);
  })
  .catch((error) => {
    console.error("Error al manejar la promesa:", error);
  });

function bucleMenu(data) {
  // Ruta del archivo data.json

  let flag = true;

  // Llamar a la función para cargar y mostrar el contenido de data.json
function generarGeneradorId() {
  let id = 0; // Variable id se inicializa fuera de la función interna

  return function () {
    return id++; // Cada vez que se llama a la función, se incrementa id y se devuelve
  };
}

  function crearReserva(numeroHabitacion, fechaInicio, fechaFin, huesped,numeroPersonas) {
    const idReserva = generarId();

    
  }

  while (flag) {
    let option = prompt(`Por favor ingresa una de las siguientes opciones:
        1. Reservar habitación
        2. Verificar disponibilidad
        3. Ver reservas actuales
        4. Cancelar reserva
        5. Editar reserva
        6. Salir`);
    const generarId = generarGeneradorId(); // Se obtiene la función interna generarId()
    if (option === null || option.trim() === "") {
      alert("Por favor, ingresa una opción válida.");
      continue;
    }
    switch (option) {
      case "1":
        //Funciones para Reversa de habitaciones
        // Filtrar las habitaciones disponibles que satisfagan la capacidad requerida y disponibilidad
        const peopleNumber = Number(prompt("Cuantas personas se alojarán?"));
        const habitacionesDisponibles = data.rooms.filter((room) => {
          const roomType = data.roomTypes.find((type) => type.id === room.roomTypeId);
          return roomType.capacity >= peopleNumber && room.availability;
        });

        // Mostrar las habitaciones disponibles en la consola
        habitacionesDisponibles.forEach((habitacion) => {
          const roomType = data.roomTypes.find((type) => type.id === habitacion.roomTypeId);
          console.log(`Habitación ${habitacion.number}: ${roomType.name}`);
        });
        const roomNumber = Number(prompt("Ingrese el numero de habitacion a reservar:"));

        const selectedRoom = data.rooms.find((room) => room.number === roomNumber);
        if (selectedRoom) {
          console.log(selectedRoom);
          // Llamar a la función para crear la reserva
          let idReserva = crearReserva(generarId(), selectedRoom.number, new Date(), new Date(), huesped, peopleNumber);
          console.log("Reserva exitosa. ID de reserva:", idReserva);
        } else {
          console.log("Habitación no encontrada.");
        }
        break;
      case "2":
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
}
