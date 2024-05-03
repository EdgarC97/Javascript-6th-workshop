alert("Bienvenido a las reservas del hotel");
// Ruta del archivo data.json
const url = "data.json"; // Cambiar por la ruta correcta
const reservas = [];
// Función para validar la fecha
const validarFecha = (fecha) =>
  /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)\d\d$/.test(fecha);

// Función para solicitar una fecha al usuario
const solicitarFecha = (mensaje) => {
  let fecha = prompt(mensaje);
  while (!validarFecha(fecha))
    fecha = prompt(`Formato incorrecto. ${mensaje}`);
  return fecha;
};
// Función para cargar y mostrar el contenido de data.json
const cargarDatos = async () => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error al cargar los datos");
    }
  } catch (error) {
    console.error("Error al manejar la promesa:", error);
  }
};

function generarGeneradorId() {
  let id = 1; // Variable id se inicializa fuera de la función interna
  return function () {
    return id++; // Cada vez que se llama a la función, se incrementa id y se devuelve
  };
}
const makeReservation = (data, generarId) => {
  const huesped = prompt("¿A nombre de quien desea hacer la reserva?");
  const peopleNumber = Number(prompt("Cuantas personas se alojarán?"));

  // Filtrar las habitaciones disponibles que satisfagan la capacidad requerida y disponibilidad
  const habitacionesDisponibles = data.rooms.filter((room) => {
    const roomType = data.roomTypes.find((type) => type.id === room.roomTypeId);
    return roomType.capacity >= peopleNumber && room.availability;
  });

  // Mostrar las habitaciones disponibles en la consola
  habitacionesDisponibles.forEach((habitacion) => {
    const roomType = data.roomTypes.find(
      (type) => type.id === habitacion.roomTypeId
    );
    console.log(`Habitación ${habitacion.number}: ${roomType.name}`);
  });

  // Habitación elegida por el usuario
  const selectedRoom = data.rooms.find(
    (room) =>
      room.number ===
      Number(prompt("Ingrese el numero de habitacion a reservar:"))
  );

  if (selectedRoom) {
    const fechaInicio = solicitarFecha(
      "Ingrese la fecha de inicio de la reserva (dd-mm-aaaa):"
    );
    const fechaFin = solicitarFecha(
      "Ingrese la fecha de fin de la reserva (dd-mm-aaaa):"
    );

    const idReserva = generarId(); // Aquí generamos un nuevo ID para la reserva
    // Crear un objeto de reserva con todos los detalles
    const reserva = {
      idReserva,
      numeroHabitacion: selectedRoom,
      fechaInicio,
      fechaFin,
      huesped,
      numeroPersonas: peopleNumber,
    };
    // Confirmar con el usuario antes de agregar la reserva
    const confirmacion = confirm(
      "¿Estás seguro de que quieres realizar esta reserva?"
    );

    // Agregar la reserva al array de reservas
    if (confirmacion) {
      reservas.push(reserva);
      console.log("***RESERVA EXITOSA***");
      console.log(`ID de reserva: ${idReserva}`);
      console.log(`Número de habitación: ${selectedRoom.number}`);
      console.log(`Fecha de inicio: ${fechaInicio}`);
      console.log(`Fecha de fin: ${fechaFin}`);
      console.log(`Huésped: ${huesped}`);
      console.log(`Número de personas: ${peopleNumber}`);
      console.log("Reserva exitosa. ID de reserva:", idReserva);
    } else {
      console.log("Habitación no encontrada.");
    }
  }
};


const bucleMenu = async () => {
  let { rooms, roomTypes } = await cargarDatos();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const generarId = generarGeneradorId();
  let flag = true;

  while (flag) {
    const option = prompt(`Por favor ingresa una de las siguientes opciones:
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
        makeReservation({ rooms, roomTypes }, generarId);
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
};
bucleMenu();
