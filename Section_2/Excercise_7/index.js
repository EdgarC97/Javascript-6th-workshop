// Explicación al usuario
alert(
  "A continuación, te mostraré un script con el cual realizaremos un pequeño quiz para predecir el orden en que se mostrarán los mensajes en consola.\n "
);

console.log(`console.log("Inicio del script");

setTimeout(() => {
  console.log("Primer setTimeout");
}, 10);

setTimeout(() => {
  console.log("Segundo setTimeout");
}, 0);

Promise.resolve("Promesa resuelta").then(console.log);

console.log("Fin del script");
`);
let flag = true;
while (flag) {
  const userChoose = prompt(
    "Elige entre las siguientes opciones el orden adecuado:\n\n" +
      "A. \n- Inicio del script\n- Promesa resuelta\n- Fin del script\n- Primer setTimeout\n- Segundo setTimeout.\n\n" +
      "B. \n- Inicio del script\n- Fin del script\n- Primer setTimeout\n- Promesa resuelta\n- Segundo setTimeout.\n\n" +
      "C. \n- Inicio del script\n- Fin del script \n- Promesa resuelta \n- Primer setTimeout\n- Segundo setTimeout.\n\n" +
      "D. \n- Inicio del script\n- Fin del script \n- Promesa resuelta \n- Segundo setTimeout\n- Primer setTimeout."
  ).toUpperCase();

  const realOrder = "D";
  const validOptions = ["A", "B", "C", "D"];

  // Comprueba la respuesta del usuario y proporciona retroalimentación
  if (validOptions.includes(userChoose)) {
    if (userChoose === realOrder) {
      alert("¡Felicitaciones! Has acertado el orden. \n\nEsto se debe a que los console.log por ser sincronos se ejecutan inmediatamente, despues viene la salida de la promesa resuelta que se ejecuta antes que los temporizadores porque la cola de trabajos tiene una prioridad más alta que la cola de temporizadores, por ultimo se ejecutan los temporizadores o (setTimeOuts) ya que estos se procesan en el orden en que se agregaron a la cola de temporizadores");
      break;
    } else {
      const explanations = {
        "A": "ERROR ! \n\nEn JavaScript, las operaciones síncronas se ejecutan primero, luego las promesas resueltas, y finalmente los temporizadores.",
        "B": "ERROR ! \n\nEn JavaScript,los temporizadores no pueden ejecutarse antes que las promesas resueltas",
        "C": "ERROR ! \n\nEn JavaScript,los temporizadores con mas tiempo no pueden ejecutarse antes que los temporizadores con menos tiempo.",
      };
      console.error(`La opción ${userChoose} es incorrecta. ${explanations[userChoose]}`);
    }
  } else {
    alert("ERROR, INGRESA UNA OPCION VALIDA");
  }
}


