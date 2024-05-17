import { tiempos } from "./main.js";

// Definir una función para multiplicar dos matrices utilizando el algoritmo IV.3 Sequential block
function multiplicarMatricesV4ParallelBlock(matriz1, matriz2, blockSize) {
    let n = matriz1.length;
    let resultado = [];
    for (let i = 0; i < n; i++) {
      resultado[i] = [];
      for (let j = 0; j < n; j++) {
        resultado[i][j] = 0;
      }
    }
}

// Definir una función para multiplicar dos matrices utilizando el algoritmo V.4 Parallel Block
function multiplicarMatricesV4ParallelBlock(matriz1, matriz2, blockSize) {
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
  
  //Definir una función para ejecutar el algoritmo V4ParallelBlock con un tamaño de matriz dado y medir el tiempo de ejecución
  function ejecutarV4ParallelBlock(n) {
    let matriz1 = generarMatriz(n);
    let matriz2 = generarMatriz(n);
    let inicio = performance.now();
    let resultado = multiplicarMatricesV4ParallelBlock(matriz1, matriz2, 32);
    let fin = performance.now();
    let tiempoEjecucion = fin - inicio;
    console.log(`Tamaño de matrices: ${n}x${n}, tiempo de ejecución: ${tiempoEjecucion} ms`);
    return tiempoEjecucion;
  }
  
  // Ejecutar la función para generar 12 casos de prueba con matrices de tamaño n x n, donde n es factor de 2^n
  let tiempo10_V4ParallelBlock = [];
  for (let i = 1; i <= tiempos; i++) {
    let n = Math.pow(2, i);
    tiempo10_V4ParallelBlock.push(ejecutarV4ParallelBlock(n));
  }
  
  // Calcular el promedio de los tiempos de ejecución
  let promedio_V4ParallelBlock = tiempo10_V4ParallelBlock.reduce((total, tiempo) => total + tiempo, 0) / tiempo10_V4ParallelBlock.length;
  console.log(`Promedio de tiempo de ejecución: ${promedio_V4ParallelBlock} ms`);
  
  let suma_V4ParallelBlock = tiempo10_V4ParallelBlock.reduce((total, tiempo) => total + tiempo, 0);
  console.log(`Total de tiempos de ejecución: ${suma_V4ParallelBlock} ms`);
  
      // Calcular la desviación estándar, el rango_V4ParallelBlock y la varianza_V4ParallelBlock de los tiempos de ejecución
 
      let varianza_V4ParallelBlock = tiempo10_V4ParallelBlock.reduce((total, tiempo) => total + Math.pow(tiempo - promedio_V4ParallelBlock, 2), 0) / tiempo10_V4ParallelBlock.length;
      console.log(`varianza_V4ParallelBlock: ${varianza_V4ParallelBlock} ms^2`);
  
      let desviacion_V4ParallelBlock = Math.sqrt(varianza_V4ParallelBlock);
      console.log(`desviacion_V4ParallelBlock: ${desviacion_V4ParallelBlock} ms`);
  
      let rango_V4ParallelBlock = Math.max(...tiempo10_V4ParallelBlock) - Math.min(...tiempo10_V4ParallelBlock);
      console.log(`rango_V4ParallelBlock: ${rango_V4ParallelBlock} ms`);
  
  
      document.getElementById("rango_V4ParallelBlock").innerHTML = rango_V4ParallelBlock;
      document.getElementById("media_V4ParallelBlock").innerHTML = promedio_V4ParallelBlock.toFixed(2); // Actualiza el promedio de la primera fila
      document.getElementById("desviacion_V4ParallelBlock").innerHTML = desviacion_V4ParallelBlock;
      document.getElementById("varianza_V4ParallelBlock").innerHTML = varianza_V4ParallelBlock;
 

  document.getElementById("tiempo10_V4ParallelBlock").innerHTML = tiempo10_V4ParallelBlock[9];  // Actualiza el tiempo de la primera fila
  document.getElementById("promedio_V4ParallelBlock").innerHTML = promedio_V4ParallelBlock.toFixed(2); // Actualiza el promedio_V4ParallelBlock de la primera fila
  document.getElementById("suma_V4ParallelBlock").innerHTML = suma_V4ParallelBlock; // Actualiza la suma_V4ParallelBlock de la primera fila

  