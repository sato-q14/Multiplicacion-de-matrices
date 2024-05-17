import {tiempos}  from "./main.js";
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
  
  // Definir una función para multiplicar dos matrices utilizando el algoritmo III3Sequentialblock
  function multiplicarMatricesSequentialBlock(matriz1, matriz2, blockSize) {
    let n = matriz1.length;
    let resultado = [];
    for (let i = 0; i < n; i += blockSize) {
      for (let j = 0; j < n; j += blockSize) {
        for (let k = 0; k < n; k += blockSize) {
          // Multiplicar bloques de la matriz
          for (let i2 = i; i2 < Math.min(i + blockSize, n); i2++) {
            for (let j2 = j; j2 < Math.min(j + blockSize, n); j2++) {
              if (!resultado[i2]) {
                resultado[i2] = [];
              }
              resultado[i2][j2] = 0;
              for (let k2 = k; k2 < Math.min(k + blockSize, n); k2++) {
                resultado[i2][j2] += matriz1[i2][k2] * matriz2[k2][j2];
              }
            }
          }
        }
      }
    }
    return resultado;
  }
  
  // Definir una función para ejecutar el algoritmo III3Sequentialblock con un tamaño de matriz dado y medir el tiempo de ejecución
  function ejecutarIII3Sequentialblock(n) {
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
  let tiempo10_III3Sequentialblock = [];
  for (let i = 1; i <= tiempos; i++) {
    let n = Math.pow(2, i);
    tiempo10_III3Sequentialblock.push(ejecutarIII3Sequentialblock(n));
  }
  
  // Calcular el promedio de los tiempos de ejecución
  let promedio_III3Sequentialblock = tiempo10_III3Sequentialblock.reduce((total, tiempo) => total + tiempo, 0) / tiempo10_III3Sequentialblock.length;
  console.log(`Promedio de tiempo de ejecución: ${promedio_III3Sequentialblock} ms`);
  
  let suma_III3Sequentialblock = tiempo10_III3Sequentialblock.reduce((total, tiempo) => total + tiempo, 0);
  console.log(`Total de tiempos de ejecución: ${suma_III3Sequentialblock} ms`);
  
     // Calcular la desviación estándar, el rango_III3Sequentialblock y la varianza_III3Sequentialblock de los tiempos de ejecución
 
     let varianza_III3Sequentialblock = tiempo10_III3Sequentialblock.reduce((total, tiempo) => total + Math.pow(tiempo - promedio_III3Sequentialblock, 2), 0) / tiempo10_III3Sequentialblock.length;
     console.log(`varianza_III3Sequentialblock: ${varianza_III3Sequentialblock} ms^2`);
 
     let desviacion_III3Sequentialblock = Math.sqrt(varianza_III3Sequentialblock);
     console.log(`desviacion_III3Sequentialblock: ${desviacion_III3Sequentialblock} ms`);
 
     let rango_III3Sequentialblock = Math.max(...tiempo10_III3Sequentialblock) - Math.min(...tiempo10_III3Sequentialblock);
     console.log(`rango_III3Sequentialblock: ${rango_III3Sequentialblock} ms`);
 
 
     document.getElementById("rango_III3Sequentialblock").innerHTML = rango_III3Sequentialblock;
     document.getElementById("media_III3Sequentialblock").innerHTML = promedio_III3Sequentialblock.toFixed(2); // Actualiza el promedio de la primera fila
     document.getElementById("desviacion_III3Sequentialblock").innerHTML = desviacion_III3Sequentialblock;
     document.getElementById("varianza_III3Sequentialblock").innerHTML = varianza_III3Sequentialblock;
    
    document.getElementById("tiempo10_III3Sequentialblock").innerHTML = tiempo10_III3Sequentialblock[9];  // Actualiza el tiempo de la primera fila
    document.getElementById("promedio_III3Sequentialblock").innerHTML = promedio_III3Sequentialblock.toFixed(2); // Actualiza el promedio_III3Sequentialblock de la primera fila
    document.getElementById("suma_III3Sequentialblock").innerHTML = suma_III3Sequentialblock; // Actualiza la suma_III3Sequentialblock de la primera fila

  