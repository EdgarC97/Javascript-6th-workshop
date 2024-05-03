alert("Bienvenido a las reservas del hotel");
  // Ruta del archivo data.json  
const url = "data.json"; // Cambiar por la ruta correcta
const reservas = [] ;
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
  // Llamar a la función para cargar y mostrar el contenido de data.json
cargarYMostrarData()
  .then((data) => {
    // Mostrar el contenido de las habitaciones después de cargar los datos
    bucleMenu(data);
  })
  .catch((error) => {
    console.error("Error al manejar la promesa:", error);
  });

function bucleMenu(data) {
  let flag = true;

function generarGeneradorId() {
  let id = 0; // Variable id se inicializa fuera de la función interna
  return function () {
    return id++; // Cada vez que se llama a la función, se incrementa id y se devuelve
  };
}
const generarId = generarGeneradorId(); 


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
        // Función para validar la fecha
        const validarFecha = fecha => /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)\d\d$/.test(fecha);

        // Función para solicitar una fecha al usuario
        const solicitarFecha = mensaje => {
        let fecha = prompt(mensaje);
        while (!validarFecha(fecha)) fecha = prompt(`Formato incorrecto. ${mensaje}`);
        return fecha;
  }
        //Funciones para Reversa de habitaciones
        // Filtrar las habitaciones disponibles que satisfagan la capacidad requerida y disponibilidad
        const huesped = prompt("¿A nombre de quien desea hacer la reserva?")
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
        const selectedRoom = data.rooms.find(room => room.number === Number(prompt("Ingrese el numero de habitacion a reservar:")));

        if (selectedRoom) {
          const fechaInicio = solicitarFecha("Ingrese la fecha de inicio de la reserva (dd-mm-aaaa):");
          const fechaFin = solicitarFecha("Ingrese la fecha de fin de la reserva (dd-mm-aaaa):");
      
          const crearReserva = (selectedRoom, fechaInicio, fechaFin, huesped, peopleNumber) => {
            const idReserva = generarId();  // Aquí generamos un nuevo ID para la reserva
            console.log("***RESERVA EXITOSA***");
            console.log(`ID de reserva: ${idReserva}`);
            console.log(`Número de habitación: ${selectedRoom}`);
            console.log(`Fecha de inicio: ${fechaInicio}`);
            console.log(`Fecha de fin: ${fechaFin}`);
            console.log(`Huésped: ${huesped}`);
            console.log(`Número de personas: ${peopleNumber}`);
            return idReserva;
          }
          let idReserva = crearReserva(selectedRoom.number, fechaInicio, fechaFin, huesped, peopleNumber);
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
