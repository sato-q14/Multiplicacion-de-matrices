// Definir una función para generar matrices aleatorias de tamaño n x n
function generarMatriz(n) {
  let matriz = [];
  for (let i = 0; i < n; i++) {
    matriz[i] = [];
    for (let j = 0; j < n; j++) {
      matriz[i][j] = Math.floor(Math.random() * 9000 + 1000); // Generar número aleatorio de 4 dígitos
    }
  }
  return matriz;
}

// Definir una función para multiplicar dos matrices utilizando el algoritmo III.4 Parallel Block
function multiplicarMatricesIII4ParallelBlock(matriz1, matriz2, blockSize) {
  let n = matriz1.length;
  let resultado = [];
  for (let i = 0; i < n; i++) {
    resultado[i] = new Array(n).fill(0);
  }
  let numWorkers = navigator.hardwareConcurrency || 4; // Obtener el número de núcleos de la CPU
  let workers = [];
  for (let i = 0; i < numWorkers; i++) {
    workers[i] = new Worker('worker.js'); // Crear un nuevo worker
  }
  let currentRow = 0;
  for (let i = 0; i < numWorkers; i++) {
    let numRows = Math.floor(n / numWorkers);
    if (i === numWorkers - 1) {
      numRows += n % numWorkers; // Ajustar la última sección para que incluya el resto de filas
    }
    workers[i].postMessage({
      type: 'init',
      blockSize: blockSize,
      matriz1: matriz1,
      matriz2: matriz2,
      resultado: resultado,
      startRow: currentRow,
      numRows: numRows
    });
    currentRow += numRows;
  }
  let promesas = workers.map(worker => new Promise(resolve => {
    worker.onmessage = e => {
      if (e.data.type === 'done') {
        resolve();
      }
    };
  }));
  return Promise.all(promesas).then(() => resultado);
}

// Definir una función para ejecutar el algoritmo III.4 Parallel Block con un tamaño de matriz dado y medir el tiempo de ejecución
function ejecutarIII4ParallelBlock(n) {
  let matriz1 = generarMatriz(n);
  let matriz2 = generarMatriz(n);
  let inicio = performance.now();
  let resultado = multiplicarMatricesIII4ParallelBlock(matriz1, matriz2, 32);
  let fin = performance.now();
  let tiempoEjecucion = fin - inicio;
  console.log(`Tamaño de matrices: ${n}x${n}, tiempo de ejecución: ${tiempoEjecucion} ms`);
  return tiempoEjecucion;
  } 
  
  // Ejecutar la función para generar 12 casos de prueba con matrices de tamaño n x n, donde n es factor de 2^n
  let tiempo10_III4ParallelBlock = [];
  for (let i = 1; i <= 10; i++) {
    let n = Math.pow(2, i);
    tiempo10_III4ParallelBlock.push(ejecutarIII4ParallelBlock(n));
  }
  
  // Calcular el promedio de los tiempos de ejecución
  let promedio_III4ParallelBlock = tiempo10_III4ParallelBlock.reduce((total, tiempo) => total + tiempo, 0) / tiempo10_III4ParallelBlock.length;
  console.log(`Promedio de tiempo de ejecución: ${promedio_III4ParallelBlock} ms`);
  
  let suma_III4ParallelBlock = tiempo10_III4ParallelBlock.reduce((total, tiempo) => total + tiempo, 0);
  console.log(`Total de tiempos de ejecución: ${suma_III4ParallelBlock} ms`);
  
       // Calcular la desviación estándar, el rango_III4ParallelBlock y la varianza_III4ParallelBlock de los tiempos de ejecución
 
       let varianza_III4ParallelBlock = tiempo10_III4ParallelBlock.reduce((total, tiempo) => total + Math.pow(tiempo - promedio_III4ParallelBlock, 2), 0) / tiempo10_III4ParallelBlock.length;
       console.log(`varianza_III4ParallelBlock: ${varianza_III4ParallelBlock} ms^2`);
   
       let desviacion_III4ParallelBlock = Math.sqrt(varianza_III4ParallelBlock);
       console.log(`desviacion_III4ParallelBlock: ${desviacion_III4ParallelBlock} ms`);
   
       let rango_III4ParallelBlock = Math.max(...tiempo10_III4ParallelBlock) - Math.min(...tiempo10_III4ParallelBlock);
       console.log(`rango_III4ParallelBlock: ${rango_III4ParallelBlock} ms`);
   
   
       document.getElementById("rango_III4ParallelBlock").innerHTML = rango_III4ParallelBlock;
       document.getElementById("media_III4ParallelBlock").innerHTML = promedio_III4ParallelBlock.toFixed(2); // Actualiza el promedio de la primera fila
       document.getElementById("desviacion_III4ParallelBlock").innerHTML = desviacion_III4ParallelBlock;
       document.getElementById("varianza_III4ParallelBlock").innerHTML = varianza_III4ParallelBlock;
    
    document.getElementById("tiempo10_III4ParallelBlock").innerHTML = tiempo10_III4ParallelBlock[9];  // Actualiza el tiempo de la primera fila
    document.getElementById("promedio_III4ParallelBlock").innerHTML = promedio_III4ParallelBlock.toFixed(2); // Actualiza el promedio_III4ParallelBlock de la primera fila
    document.getElementById("suma_III4ParallelBlock").innerHTML = suma_III4ParallelBlock; // Actualiza la suma_III4ParallelBlock de la primera fila
