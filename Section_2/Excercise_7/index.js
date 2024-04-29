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

const userChoose = prompt(
  "Elige entre las siguientes opciones el orden adecuado:\n\n" +
    "A. \n- Inicio del script\n- Fin del script\n- Primer setTimeout\n- Segundo setTimeout\n- Promesa resuelta.\n\n" +
    "B. \n- Promesa resuelta\n- Inicio del script\n- Fin del script\n- Primer setTimeout\n- Segundo setTimeout.\n\n" +
    "C. \n- Inicio del script\n- Promesa resuelta\n- Fin del script\n- Primer setTimeout\n- Segundo setTimeout.\n\n" +
    "D. \n- Inicio del script\n- Fin del script\n- Primer setTimeout\n- Promesa resuelta\n- Segundo setTimeout.\n\n" +
    "E. \n- Inicio del script\n- Fin del script \n- Promesa resuelta \n- Primer setTimeout\n- Segundo setTimeout.\n\n" +
    "F. \n- Inicio del script\n- Fin del script \n- Promesa resuelta \n- Segundo setTimeout\n- Primer setTimeout."
);

// Orden real de los mensajes
const realOrder = "F";

// Comprueba la respuesta del usuario y proporciona retroalimentación
if (userChoose === realOrder) {
  alert("¡Felicitaciones! Has acertado el orden. El orden correcto es: Inicio del script > Fin del script > Promesa resuelta > Primer setTimeout > Segundo setTimeout. Esto se debe a que las promesas resueltas se ejecutan antes que los setTimeout en JavaScript.");
} else {
  const explanations = {
    "A": "El script no puede terminar antes de que comience y los setTimeout y las promesas no pueden resolverse antes de que el script termine.",
    "B": "Las promesas no pueden resolverse antes de que el script comience y los setTimeout no pueden ejecutarse antes de que el script termine.",
    "C": "Los setTimeout no pueden ejecutarse antes de que el script termine.",
    "D": "El primer setTimeout no puede ejecutarse antes de que la promesa se resuelva.",
    "E": "El segundo setTimeout no puede ejecutarse antes de que el primer setTimeout y la promesa se resuelvan."
  };
  alert(`La opción ${userChoose} es incorrecta. ${explanations[userChoose]}`);
}