console.log("Mensaje 1: Inmediatamente");

setTimeout(() => {
  console.log("Mensaje 2: Con timeout de 0 segundos");
}, 0);

setTimeout(() => {
  console.log("Mensaje 3: Con timeout de 1 segundo");
}, 1000);

//¿Por qué "Mensaje 2: Con timeout de 0 segundos" no se muestra inmediatamente después de "Mensaje 1: Inmediatamente", a pesar de tener un retardo de 0 segundos?

//Answer: Mensaje 2: Con timeout de 0 segundos” no se muestra inmediatamente después de “Mensaje 1: Inmediatamente” debido a la forma en que JavaScript maneja las tareas asíncronas y el event loop. Aunque setTimeout con un retardo de 0 segundos esencialmente programa la tarea para ejecutarse tan pronto como sea posible, no garantiza que se ejecute inmediatamente. Esto se debe a que JavaScript tiene un solo hilo de ejecución, y el event loop debe esperar a que se complete el código actualmente en ejecución antes de poder ejecutar la tarea programada con setTimeout.

//¿Que nos dicen este comportamiento sobre el event loop, las macro y micro tareas, y la forma en que JavaScript maneja las operaciones asíncronas?

//Answer: Este comportamiento nos dice que el event loop en JavaScript maneja las operaciones de entrada/salida y las tareas asíncronas de una manera particular. El event loop tiene una cola de tareas que se ejecutan una tras otra. Cuando se programa una tarea asíncrona como una función setTimeout, se agrega a la cola de tareas. Sin embargo, esta tarea no se ejecutará hasta que todas las tareas anteriores en la cola (incluido todo el código síncrono) se hayan completado. Esto es cierto incluso si el retardo para setTimeout se establece en 0 segundos.

//Además, vale la pena mencionar que JavaScript distingue entre macrotareas y microtareas. Las macrotareas incluyen cosas como eventos de UI, red, setTimeout, setInterval, etc. Las microtareas son tareas más pequeñas que se programan para ejecutarse después de que se complete la macrotarea actual y antes de que el navegador realice cualquier otra tarea o renderizado. Las promesas, por ejemplo, se consideran microtareas. En tu código, setTimeout es una macrotarea, por lo que se agrega a la cola de macrotareas del event loop.
