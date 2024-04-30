```javascript
console.log("Inicio del script");

// Macrotarea: setTimeout
setTimeout(() => {
  console.log("Macrotarea 1 second (setTimeout)");
}, 1000);

setTimeout(() => {
  console.log("Macrotarea 0 seconds (setTimeout)");
}, 0);

// Microtarea: Promesa
Promise.resolve()
  .then(() => {
    setTimeout(() => {
      console.log("Macrotarea (setTimeout) inside Microtarea 1");
      return "from micro 1";
    }, 0);
  })
  .then((message) => {
    console.log("Microtarea 2 (Promesa)");
  });

// Microtarea: Promesa
Promise.resolve()
  .then(() => {
    console.log("Microtarea 3 (Promesa)");
  })
  .then(() => {
    console.log("Microtarea 4 (Promesa)");
  });

console.log("Fin del script");
```

//- ¿Qué tareas se consideran macrotareas y cuáles son microtareas?
//Answer:  En JavaScript, las tareas se dividen en dos categorías: macrotareas y microtareas. Las macrotareas incluyen tareas como eventos de UI, red, setTimeout, setInterval, setImmediate y requestAnimationFrame. Las microtareas incluyen tareas como process.nextTick, promesas, Object.observe, MutationObserver.

//  - ¿Cómo se relacionan las macrotareas y microtareas con el event loop?
//Answer: El Event Loop tiene una cola de macrotareas y una cola de microtareas. En cada ciclo del Event Loop, se procesa una macrotarea de la cola de macrotareas. Luego, antes de pasar al siguiente ciclo, se procesan todas las microtareas en la cola de microtareas. Esto significa que las microtareas siempre tienen prioridad sobre las macrotareas y se ejecutan antes que las macrotareas que se agreguen durante la ejecución de las microtareas.

//- ¿Qué sucede cuando una microtarea genera una nueva macrotarea dentro de ella?
//Answer:  Cuando una microtarea genera una nueva macrotarea, la nueva macrotarea se agrega a la cola de macrotareas. Sin embargo, no se ejecutará hasta que se hayan procesado todas las microtareas y se inicie el próximo ciclo del Event Loop.

//  - ¿Cómo se manejan las promesas y los setTimeout en relación con el event loop?
//Answer:  Las promesas y setTimeout se manejan de manera diferente en relación con el Event Loop. Cuando se resuelve una promesa, la función .then correspondiente se agrega a la cola de microtareas y se ejecutará antes del próximo ciclo del Event Loop. Por otro lado, cuando se llama a setTimeout, la función de callback se agrega a la cola de macrotareas y se ejecutará en un ciclo futuro del Event Loop, después de que se hayan procesado todas las microtareas.