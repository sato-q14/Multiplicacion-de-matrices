import { tiempos } from "./main.js";
// Definir una función para multiplicar dos matrices utilizando el algoritmo V.3 Sequential block
function multiplicarMatricesV3Sequentialblock(matriz1, matriz2, blockSize) {
    let n = matriz1.length;
    let resultado = [];
    for (let i = 0; i < n; i++) {
      resultado[i] = [];
      for (let j = 0; j < n; j++) {
        resultado[i][j] = 0;
      }
    }
}

// Definir una función para multiplicar dos matrices utilizando el algoritmo V.3 Sequential block
function multiplicarMatricesV3SequentialBlock(matriz1, matriz2, blockSize) {
    let n = matriz1.length;
    let resultado = [];
    for (let i = 0; i < n; i += blockSize) {
      for (let j = 0; j < n; j += blockSize) {
        // Inicializar el bloque de resultado
        let bloqueResultado = [];
        for (let i2 = 0; i2 < blockSize; i2++) {
          bloqueResultado[i2] = Array(blockSize).fill(0);
        }
        // Multiplicar bloques de la matriz
        for (let k = 0; k < n; k += blockSize) {
          for (let i2 = 0; i2 < blockSize; i2++) {
            for (let j2 = 0; j2 < blockSize; j2++) {
              for (let k2 = 0; k2 < blockSize; k2++) {
                bloqueResultado[i2][j2] += matriz1[i + i2][k + k2] * matriz2[k + k2][j + j2];
              }
            }
          }
        }
        // Agregar el bloque de resultado al resultado global
        for (let i2 = 0; i2 < blockSize; i2++) {
          for (let j2 = 0; j2 < blockSize; j2++) {
            resultado[i + i2][j + j2] = bloqueResultado[i2][j2];
          }
        }
      }
    }
    return resultado;
  }

  //Definir una función para ejecutar el algoritmo V3Sequentialblock con un tamaño de matriz dado y medir el tiempo de ejecución
  function ejecutarV3Sequentialblock(n) {
    let matriz1 = generarMatriz(n);
    let matriz2 = generarMatriz(n);
    let inicio = performance.now();
    let resultado = multiplicarMatricesSequentialBlock(matriz1, matriz2, 32);
    let fin = performance.now();
    let tiempoEjecucion = fin - inicio;
    console.log(`Tamaño de matrices: ${n}x${n}, tiempo de ejecución: ${tiempoEjecucion} ms`);
    return tiempoEjecucion;
  }
  
  // Ejecutar la función para generar 12 casos de prueba con matrices de tamaño n x n, donde n es factor de 2^n
  let tiempo10_V3Sequentialblock = [];
  for (let i = 1; i <= tiempos; i++) {
    let n = Math.pow(2, i);
    tiempo10_V3Sequentialblock.push(ejecutarV3Sequentialblock(n));
  }
  
  // Calcular el promedio de los tiempos de ejecución
  let promedio_V3Sequentialblock = tiempo10_V3Sequentialblock.reduce((total, tiempo) => total + tiempo, 0) / tiempo10_V3Sequentialblock.length;
  console.log(`Promedio de tiempo de ejecución: ${promedio_V3Sequentialblock} ms`);
  
  let suma_V3Sequentialblock = tiempo10_V3Sequentialblock.reduce((total, tiempo) => total + tiempo, 0);
  console.log(`Total de tiempos de ejecución: ${suma_V3Sequentialblock} ms`);
  
         // Calcular la desviación estándar, el rango_V3Sequentialblock y la varianza_V3Sequentialblock de los tiempos de ejecución
 
         let varianza_V3Sequentialblock = tiempo10_V3Sequentialblock.reduce((total, tiempo) => total + Math.pow(tiempo - promedio_V3Sequentialblock, 2), 0) / tiempo10_V3Sequentialblock.length;
         console.log(`varianza_V3Sequentialblock: ${varianza_V3Sequentialblock} ms^2`);
     
         let desviacion_V3Sequentialblock = Math.sqrt(varianza_V3Sequentialblock);
         console.log(`desviacion_V3Sequentialblock: ${desviacion_V3Sequentialblock} ms`);
     
         let rango_V3Sequentialblock = Math.max(...tiempo10_V3Sequentialblock) - Math.min(...tiempo10_V3Sequentialblock);
         console.log(`rango_V3Sequentialblock: ${rango_V3Sequentialblock} ms`);
     
     
         document.getElementById("rango_V3Sequentialblock").innerHTML = rango_V3Sequentialblock;
         document.getElementById("media_V3Sequentialblock").innerHTML = promedio_V3Sequentialblock.toFixed(2); // Actualiza el promedio de la primera fila
         document.getElementById("desviacion_V3Sequentialblock").innerHTML = desviacion_V3Sequentialblock;
         document.getElementById("varianza_V3Sequentialblock").innerHTML = varianza_V3Sequentialblock;
    
    document.getElementById("tiempo10_V3Sequentialblock").innerHTML = tiempo10_V3Sequentialblock[9];  // Actualiza el tiempo de la primera fila
    document.getElementById("promedio_V3Sequentialblock").innerHTML = promedio_V3Sequentialblock.toFixed(2); // Actualiza el promedio_V3Sequentialblock de la primera fila
    document.getElementById("suma_V3Sequentialblock").innerHTML = suma_V3Sequentialblock; // Actualiza la suma_V3Sequentialblock de la primera fila
