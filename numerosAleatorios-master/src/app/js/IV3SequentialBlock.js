import { tiempos } from "./main.js";
// Definir una función para multiplicar dos matrices utilizando el algoritmo IV.3 Sequential block
function multiplicarMatricesIV3SequentialBlock(matriz1, matriz2, blockSize) {
    let n = matriz1.length;
    let resultado = [];
    for (let i = 0; i < n; i++) {
      resultado[i] = [];
      for (let j = 0; j < n; j++) {
        resultado[i][j] = 0;
      }
    }

    // Definir una función para multiplicar dos matrices utilizando el algoritmo
    for (let i = 0; i < n; i += blockSize) {
      for (let j = 0; j < n; j += blockSize) {
        for (let k = 0; k < n; k += blockSize) {
          // Multiplicar bloques de la matriz
          for (let i2 = i; i2 < Math.min(i + blockSize, n); i2++) {
            for (let j2 = j; j2 < Math.min(j + blockSize, n); j2++) {
              let suma1 = 0;
              let suma2 = 0;
              let suma3 = 0;
              let suma4 = 0;
              for (let k2 = k; k2 < Math.min(k + blockSize, n); k2++) {
                suma1 += matriz1[i2][k2] * matriz2[k2][j2];
                suma2 += matriz1[i2][k2] * matriz2[k2][j2 + 1];
                suma3 += matriz1[i2][k2] * matriz2[k2][j2 + 2];
                suma4 += matriz1[i2][k2] * matriz2[k2][j2 + 3];
              }
              resultado[i2][j2] += suma1;
              resultado[i2][j2 + 1] += suma2;
              resultado[i2][j2 + 2] += suma3;
              resultado[i2][j2 + 3] += suma4;
            }
          }
        }
      }
    }
    return resultado;
  }

  //Definir una función para ejecutar el algoritmo IV3SequentialBlock con un tamaño de matriz dado y medir el tiempo de ejecución
  function ejecutarIV3SequentialBlock(n) {
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
  let tiempo10_IV3SequentialBlock = [];
  for (let i = 1; i <= tiempos; i++) {
    let n = Math.pow(2, i);
    tiempo10_IV3SequentialBlock.push(ejecutarIV3SequentialBlock(n));
  }
  
  // Calcular el promedio de los tiempos de ejecución
  let promedio_IV3SequentialBlock = tiempo10_IV3SequentialBlock.reduce((total, tiempo) => total + tiempo, 0) / tiempo10_IV3SequentialBlock.length;
  console.log(`Promedio de tiempo de ejecución: ${promedio_IV3SequentialBlock} ms`);
  
  let suma_IV3SequentialBlock = tiempo10_IV3SequentialBlock.reduce((total, tiempo) => total + tiempo, 0);
  console.log(`Total de tiempos de ejecución: ${suma_IV3SequentialBlock} ms`);
  
         // Calcular la desviación estándar, el rango_IV3SequentialBlock y la varianza_IV3SequentialBlock de los tiempos de ejecución
 
         let varianza_IV3SequentialBlock = tiempo10_IV3SequentialBlock.reduce((total, tiempo) => total + Math.pow(tiempo - promedio_IV3SequentialBlock, 2), 0) / tiempo10_IV3SequentialBlock.length;
         console.log(`varianza_IV3SequentialBlock: ${varianza_IV3SequentialBlock} ms^2`);
     
         let desviacion_IV3SequentialBlock = Math.sqrt(varianza_IV3SequentialBlock);
         console.log(`desviacion_IV3SequentialBlock: ${desviacion_IV3SequentialBlock} ms`);
     
         let rango_IV3SequentialBlock = Math.max(...tiempo10_IV3SequentialBlock) - Math.min(...tiempo10_IV3SequentialBlock);
         console.log(`rango_IV3SequentialBlock: ${rango_IV3SequentialBlock} ms`);
     
     
         document.getElementById("rango_IV3SequentialBlock").innerHTML = rango_IV3SequentialBlock;
         document.getElementById("media_IV3SequentialBlock").innerHTML = promedio_IV3SequentialBlock.toFixed(2); // Actualiza el promedio de la primera fila
         document.getElementById("desviacion_IV3SequentialBlock").innerHTML = desviacion_IV3SequentialBlock;
         document.getElementById("varianza_IV3SequentialBlock").innerHTML = varianza_IV3SequentialBlock;
    
    document.getElementById("tiempo10_IV3SequentialBlock").innerHTML = tiempo10_IV3SequentialBlock[9];  // Actualiza el tiempo de la primera fila
    document.getElementById("promedio_IV3SequentialBlock").innerHTML = promedio_IV3SequentialBlock.toFixed(2); // Actualiza el promedio_IV3SequentialBlock de la primera fila
    document.getElementById("suma_IV3SequentialBlock").innerHTML = suma_IV3SequentialBlock; // Actualiza la suma_IV3SequentialBlock de la primera fila
