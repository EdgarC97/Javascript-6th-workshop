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

const showRooms = (rooms,roomTypes,seeAvaliable = false , seeCapacity = 0) => {
  let avaliablesRooms = [];
  if (seeAvaliable && !seeCapacity) {
    avaliablesRooms = rooms.filter ((room) => {
      return room.availability === true;}
    )
    return [(avaliablesRooms.map((room) => {
      return `Habitación numero: ${room.number} (${roomTypes.find ((type) => type.id === room.roomTypeId).name})`
    }).join(",")),avaliablesRooms]
  }
  else if (seeAvaliable && seeCapacity) {
    avaliablesRooms = rooms.filter((room) =>{
      if (roomTypes.find((type) => type.id === room.roomTypeId).capacity >= seeCapacity && room.availability) {
        return true;
      };
    }
  )
  return [(avaliablesRooms.map((room) => {
    return `\nHabitación numero: ${room.number} (${roomTypes.find((type) => 
      type.id === room.roomTypeId).name})`
  }).join(", ")
  ),avaliablesRooms]
  }
  else{
		avaliablesRooms = rooms;
		return[(rooms.map((room) => {
			return `\nHabitacion numero: ${room.number} (${roomTypes.find((type) => type.id === room.roomTypeId).name}), estado: ${room.availability ? 'disponible':'ocupada'}`
			}).join(", ")
		), avaliablesRooms]
	}
}

const makeReservation = (rooms, roomTypes, generarId) => {
  const peopleNumber = prompt("Ingrese el numero de huespedes");
  if (!peopleNumber) {
    console.error("valor ingresado no valido");
    return;
  }

  const filteredRooms = showRooms(rooms, roomTypes, true, peopleNumber);
  if (filteredRooms[1].length === 0) {
    console.error("No hay habitaciones disponibles que puedan acomodar al número de huéspedes suministrado.");
    return;
  }

  const roomNumberToReserve = prompt("Ingrese el numero de la habitación a reservar: " + filteredRooms[0]);
  if (!roomNumberToReserve) {
    console.error("valor ingresado no valido");
    return;
  }

  const room = filteredRooms[1].find(room => room.number === Number(roomNumberToReserve));
  if (!room) {
    console.error("Numero de habitación inválido");
    return;
  }

  if (!room.availability) {
    console.error("Habitacion no disponible");
    return;
  }

  alert(" !! Habitacion disponible !!");
  const fechaInicio = solicitarFecha("Ingrese la fecha de inicio de la reserva (dd-mm-aaaa):");
  const fechaFin = solicitarFecha("Ingrese la fecha de fin de la reserva (dd-mm-aaaa):");
  const huesped = prompt("¿A nombre de quien desea hacer la reserva?");

  if (!huesped) {
    return;
  }

  const id = generarId();
  const reserva = {
    id,
    huesped,
    date1: fechaInicio,
    date2: fechaFin,
    room: room.number
  }

  const confirmation = confirm("¿Estás seguro de que quieres realizar esta reserva?");
  if (!confirmation) {
    console.warn("Reserva cancelada.");
    return;
  }

  room.availability = false;
  bookings.push(reserva);
  console.log("***RESERVA EXITOSA***");
  console.log(`ID de reserva: ${id}`);
  console.log(`Número de habitación: ${room.number}`);
  console.log(`Fecha de inicio: ${fechaInicio}`);
  console.log(`Fecha de fin: ${fechaFin}`);
  console.log(`Huésped: ${huesped}`);
  console.log(`Número de personas: ${peopleNumber}`);
}

const showBookings = (huesped, rooms, roomTypes) => {
	const bookingsList = [];
	bookings.filter(e => {
		if(e.huesped.toLowerCase() === huesped.toLowerCase()){
			bookingsList.push(e);
		}
	});

  if (bookingsList.length > 0) {
    const bookingDetails = bookingsList.map(book => {
      const roomType = roomTypes.find((type) => type.id === rooms.find(room => room.number === book.room).roomTypeId).name;
      return `\nId de reserva: ${book.id}\nFecha de entrada: ${book.date1}\nFecha de salida: ${book.date2}\nHabitación numero: ${book.room} (${roomType})`;
    });
  
    return [`Estimado ${huesped},sus reservas son: ${bookingDetails}`, bookingsList];
  } else {
    return ["No se encontraron reservas asociadas", bookingsList];
  }
}  

const editBooking = (bookingId) => {
  // Convertir bookingId a un número
  const bookingIdNumber = Number(bookingId);
  // Visualización de Reservas
  const reserva = bookings.find((reserva) => reserva.id === bookingIdNumber);
  if (!reserva) {
    console.error("Reserva no encontrada");
    return;
  }
  console.log(`***Reserva encontrada***\nReserva actual: \nID de reserva: ${reserva.id}\nNúmero de habitación: ${reserva.room}\nHuésped: ${reserva.huesped}\nFecha de inicio: ${reserva.date1}\nFecha de fin: ${reserva.date2}`);

  // Edición de Reserva
  const fechaInicio = solicitarFecha("Ingrese la nueva fecha de inicio de la reserva (dd-mm-aaaa):");
  const fechaFin = solicitarFecha("Ingrese la nueva fecha de fin de la reserva (dd-mm-aaaa):");

  // Actualizar la reserva en el array de reservas con los nuevos detalles
  reserva.date1 = fechaInicio;
  reserva.date2 = fechaFin;

  console.log("***RESERVA ACTUALIZADA***");
  console.log(`ID de reserva: ${reserva.id}`);
  console.log(`Número de habitación: ${reserva.room}`);
  console.log(`Huésped: ${reserva.huesped}`);
  console.log(`Fecha de inicio: ${reserva.date1}`);
  console.log(`Fecha de fin: ${reserva.date2}`);
};

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
        // Código para cancelar reserva
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
bucleMenu();
