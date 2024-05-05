alert("Bienvenido a las reservas del hotel");
// Ruta del archivo data.json
const url = "data.json"; // Cambiar por la ruta correcta
const bookings = [];
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
    // Se ntenta hacer una solicitud a la URL especificada y espera una respuesta
    const response = await fetch(url);
    // Verifica si la respuesta es exitosa (código de estado 200-299)
    if (response.ok) {
      // Si la respuesta es exitosa, convierte el cuerpo de la respuesta en formato JSON y espera su procesamiento
      const data = await response.json();
      // Devuelve los datos obtenidos de la respuesta
      return data;
    } else {
      // Si la respuesta no es exitosa (código de estado diferente a 200-299), lanza un error con un mensaje específico
      throw new Error("Error al cargar los datos");
    }
  } catch (error) {
    // Captura cualquier error que ocurra durante el procesamiento de la solicitud o la conversión de datos
    // Muestra un mensaje de error en la consola indicando el tipo de error y su descripción
    console.error("Error al manejar la promesa:", error);
  }
};

// Función generadora de IDs para las reservas
function generarGeneradorId() {
  let id = 1; // Variable id se inicializa fuera de la función interna
  return function () {
    return id++; // Cada vez que se llama a la función, se incrementa id y se devuelve
  };
}

// Función para mostrar las habitaciones y su estado
const showRooms = (rooms, roomTypes, seeAvaliable = false, seeCapacity = 0) => {
  // Inicialización de un arreglo para almacenar las habitaciones disponibles
  let avaliablesRooms = [];

  // Verificación de parámetros para filtrar las habitaciones según su disponibilidad y capacidad
  if (seeAvaliable && !seeCapacity) {
    // Filtrado de habitaciones disponibles
    avaliablesRooms = rooms.filter((room) => {
      return room.availability === true;
    });
    // Creación de una cadena de texto con detalles de las habitaciones disponibles y su tipo con formato específico
    return [
      (avaliablesRooms.map((room) => {
        return `Habitación numero: ${room.number} (${roomTypes.find((type) => type.id === room.roomTypeId).name})`;
      }).join(",")),
      // Arreglo de habitaciones disponibles
      avaliablesRooms
    ];
  }
  // Verificación de parámetros para filtrar habitaciones disponibles según su capacidad y disponibilidad
  else if (seeAvaliable && seeCapacity) {
    // Filtrado de habitaciones disponibles que cumplen con la capacidad requerida
    avaliablesRooms = rooms.filter((room) => {
      // Verificación de capacidad y disponibilidad de la habitación
      if (roomTypes.find((type) => type.id === room.roomTypeId).capacity >= seeCapacity && room.availability) {
        return true;
      }
    });
    // Creación de una cadena de texto con detalles de las habitaciones disponibles y su tipo con formato específico
    return [
      (avaliablesRooms.map((room) => {
        return `\nHabitación numero: ${room.number} (${roomTypes.find((type) => type.id === room.roomTypeId).name})`;
      }).join(", ")),
      // Arreglo de habitaciones disponibles
      avaliablesRooms
    ];
  }
  // Si no se especifica ninguna condición, se muestran todas las habitaciones con su estado (disponible u ocupada)
  else {
    // Copia de todas las habitaciones (disponibles y ocupadas)
    avaliablesRooms = rooms;
    // Creación de una cadena de texto con detalles de todas las habitaciones y su estado
    return [
      (rooms.map((room) => {
        return `\nHabitación numero: ${room.number} (${roomTypes.find((type) => type.id === room.roomTypeId).name}), estado: ${room.availability ? 'disponible' : 'ocupada'}`;
      }).join(", ")),
      // Arreglo de todas las habitaciones
      avaliablesRooms
    ];
  }
};

// Función para realizar una reserva de habitación
const makeReservation = (rooms, roomTypes, generarId) => {
  // Solicitar el número de huéspedes
  const peopleNumber = prompt("Ingrese el numero de huespedes");
  // Validar si se ingresó un valor válido para el número de huéspedes
  if (!peopleNumber) {
    console.error("valor ingresado no valido");
    return;
  }

  // Filtrar las habitaciones disponibles según el número de huéspedes
  const filteredRooms = showRooms(rooms, roomTypes, true, peopleNumber);
  // Verificar si no hay habitaciones disponibles que puedan acomodar al número de huéspedes
  if (filteredRooms[1].length === 0) {
    console.error("No hay habitaciones disponibles que puedan acomodar al número de huéspedes suministrado.");
    return;
  }

  // Solicitar el número de la habitación a reservar
  const roomNumberToReserve = prompt("Ingrese el numero de la habitación a reservar: " + filteredRooms[0]);
  // Validar si se ingresó un valor válido para el número de habitación
  if (!roomNumberToReserve) {
    console.error("valor ingresado no valido");
    return;
  }

  // Encontrar la habitación seleccionada para la reserva
  const room = filteredRooms[1].find(room => room.number === Number(roomNumberToReserve));
  // Verificar si la habitación seleccionada es válida
  if (!room) {
    console.error("Numero de habitación inválido");
    return;
  }

  // Verificar la disponibilidad de la habitación seleccionada
  if (!room.availability) {
    console.error("Habitacion no disponible");
    return;
  }

  // Mostrar un mensaje de alerta indicando que la habitación está disponible
  alert(" !! Habitacion disponible !!");
  // Solicitar la fecha de inicio de la reserva
  const fechaInicio = solicitarFecha("Ingrese la fecha de inicio de la reserva (dd-mm-aaaa):");
  // Solicitar la fecha de fin de la reserva
  const fechaFin = solicitarFecha("Ingrese la fecha de fin de la reserva (dd-mm-aaaa):");
  // Solicitar el nombre del huésped para la reserva
  const huesped = prompt("¿A nombre de quien desea hacer la reserva?");

  // Verificar si se ingresó un nombre de huésped válido
  if (!huesped) {
    return;
  }

  // Generar un ID único para la reserva utilizando la función generadora
  const id = generarId();
  // Crear el objeto reserva con los detalles ingresados
  const reserva = {
    id,
    huesped,
    date1: fechaInicio,
    date2: fechaFin,
    room: room.number
  }

  // Solicitar confirmación al usuario para realizar la reserva
  const confirmation = confirm("¿Estás seguro de que quieres realizar esta reserva?");
  // Verificar si se confirmó la reserva
  if (!confirmation) {
    console.warn("Reserva cancelada.");
    return;
  }

  // Marcar la habitación como no disponible
  room.availability = false;
  // Agregar la reserva al array de reservas
  bookings.push(reserva);
  // Mostrar un mensaje de éxito con los detalles de la reserva
  console.log("***RESERVA EXITOSA***");
  console.log(`ID de reserva: ${id}`);
  console.log(`Número de habitación: ${room.number}`);
  console.log(`Fecha de inicio: ${fechaInicio}`);
  console.log(`Fecha de fin: ${fechaFin}`);
  console.log(`Huésped: ${huesped}`);
  console.log(`Número de personas: ${peopleNumber}`);
}

// Función para mostrar las reservas de un huésped específico
const showBookings = (huesped, rooms, roomTypes) => {
  // Array para almacenar las reservas del huésped específico
  const bookingsList = [];
  // Filtrar las reservas para encontrar las del huésped específico (ignorando mayúsculas y minúsculas)
  bookings.filter(e => {
    if (e.huesped.toLowerCase() === huesped.toLowerCase()) {
      bookingsList.push(e); // Agregar la reserva al array si coincide el nombre del huésped
    }
  });

  // Verificar si se encontraron reservas para el huésped específico
  if (bookingsList.length > 0) {
    // Obtener los detalles de cada reserva del huésped específico
    const bookingDetails = bookingsList.map(book => {
      // Encontrar el tipo de habitación de cada reserva
      const roomType = roomTypes.find((type) => type.id === rooms.find(room => room.number === book.room).roomTypeId).name;
      // Crear una cadena con los detalles de la reserva
      return `\nId de reserva: ${book.id}\nFecha de entrada: ${book.date1}\nFecha de salida: ${book.date2}\nHabitación numero: ${book.room} (${roomType})`;
    });

    // Crear un mensaje de éxito con los detalles de las reservas del huésped específico
    return [`Estimado ${huesped}, sus reservas son: ${bookingDetails}`, bookingsList];
  } else {
    // Crear un mensaje indicando que no se encontraron reservas para el huésped específico
    return ["No se encontraron reservas asociadas", bookingsList];
  }
}

// Función para cancelar una reserva
const cancelbooking = (rooms, bookingId) => {
  // Identificación de Reserva
  const reservaIndex = bookings.findIndex((reserva) => reserva.id === bookingId);
  // Verificar si se encontró la reserva
  reservaIndex === -1
  ? console.error("Reserva no encontrada") // Mostrar un error si la reserva no se encuentra
  : console.log("***RESERVA ENCONTRADA***"); // Mostrar un mensaje si la reserva se encuentra

  // Obtener la reserva
  const reserva = bookings[reservaIndex];
  // Mostrar un mensaje de confirmación y obtener la respuesta del usuario
  const confirmation = confirm("¿Estás seguro de que quieres cancelar esta reserva?");
  // Verificar la confirmación del usuario
  confirmation
    ? ( // Si el usuario confirma la cancelación
        bookings.splice(reservaIndex, 1), // Eliminar la reserva del array de reservas
        // Actualizar la disponibilidad de la habitación
        rooms.find(room => room.number === reserva.room).availability = true,
        console.log(`La reserva con ID ${bookingId} ha sido cancelada exitosamente.`) // Mostrar mensaje de cancelación exitosa
      )
    : console.warn("Ha cancelado el proceso."); // Mostrar mensaje si el usuario cancela el proceso de cancelación
};

// Función para editar una reserva
const editBooking = (bookingId) => {
  // Convertir bookingId a un número
  const bookingIdNumber = Number(bookingId);
  // Visualización de Reservas
  const reserva = bookings.find((reserva) => reserva.id === bookingIdNumber);
  // Verificar si la reserva existe
  if (!reserva) {
    console.error("Reserva no encontrada");
    return;
  }
  // Mostrar información de la reserva actual
  console.log(`***Reserva encontrada***\nReserva actual: \nID de reserva: ${reserva.id}\nNúmero de habitación: ${reserva.room}\nHuésped: ${reserva.huesped}\nFecha de inicio: ${reserva.date1}\nFecha de fin: ${reserva.date2}`);

  // Edición de Reserva
  const fechaInicio = solicitarFecha("Ingrese la nueva fecha de inicio de la reserva (dd-mm-aaaa):");
  const fechaFin = solicitarFecha("Ingrese la nueva fecha de fin de la reserva (dd-mm-aaaa):");

  // Actualizar la reserva en el array de reservas con los nuevos detalles
  reserva.date1 = fechaInicio;
  reserva.date2 = fechaFin;

  // Mostrar mensaje de reserva actualizada
  console.log("***RESERVA ACTUALIZADA***");
  console.log(`ID de reserva: ${reserva.id}`);
  console.log(`Número de habitación: ${reserva.room}`);
  console.log(`Huésped: ${reserva.huesped}`);
  console.log(`Fecha de inicio: ${reserva.date1}`);
  console.log(`Fecha de fin: ${reserva.date2}`);
};

// Función principal que maneja el bucle del menú
const bucleMenu = async () => {
  let { rooms, roomTypes } = await cargarDatos();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const generarId = generarGeneradorId();
  let flag = true;

  while (flag) {
    const option = prompt(`Por favor ingresa una de las siguientes opciones:
        1. Verificar disponibilidad de habitaciones
        2. Reservar habitación
        3. Ver reservas actuales
        4. Cancelar reserva
        5. Editar reserva
        6. Salir`);
    if (option === null || option.trim() === "") {
      console.error("Por favor, ingresa una opción válida.");
      continue;
    }
    switch (option) {
      case "1":
        alert("Habitaciones y su estado: " + showRooms(rooms, roomTypes)[0]);
        break;
      case "2":
        makeReservation(rooms, roomTypes, generarId);
        break;
      case "3":
          alert(showBookings(prompt("Ingrese a nombre de quien esta la reserva:"), rooms, roomTypes) [0]);
        break;
      case "4":
          const bookingIdToCancel = prompt("Ingrese el ID de la reserva que desea cancelar:");
          cancelbooking(rooms, parseInt(bookingIdToCancel));  
        break;
      case "5":
          const bookingId = prompt("Ingrese el ID de la reserva que desea editar:");
          editBooking(bookingId, rooms, roomTypes);
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
// Llamada a la función principal que maneja el menú
bucleMenu();
