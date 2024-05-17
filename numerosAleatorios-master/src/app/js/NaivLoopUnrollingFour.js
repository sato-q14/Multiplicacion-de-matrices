import { tiempos } from "./main.js";

window.tiempo10_NaivLoopUnrollingFour;
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
  
  // Definir una función para multiplicar dos matrices utilizando el algoritmo NaivLoopUnrollingFour
  function multiplicarMatricesNaivLoopUnrollingFour(matriz1, matriz2) {
    let n = matriz1.length;
    let resultado = [];
    for (let i = 0; i < n; i++) {
      resultado[i] = [];
      for (let j = 0; j < n; j++) {
        resultado[i][j] = 0;
      }
    }
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j += 4) {
        let suma_NaivLoopUnrollingFour1 = 0;
        let suma_NaivLoopUnrollingFour2 = 0;
        let suma_NaivLoopUnrollingFour3 = 0;
        let suma_NaivLoopUnrollingFour4 = 0;
        for (let k = 0; k < n; k++) {
          suma_NaivLoopUnrollingFour1 += matriz1[i][k] * matriz2[k][j];
          suma_NaivLoopUnrollingFour2 += matriz1[i][k] * matriz2[k][j + 1];
          suma_NaivLoopUnrollingFour3 += matriz1[i][k] * matriz2[k][j + 2];
          suma_NaivLoopUnrollingFour4 += matriz1[i][k] * matriz2[k][j + 3];
        }
        resultado[i][j] += suma_NaivLoopUnrollingFour1;
        resultado[i][j + 1] += suma_NaivLoopUnrollingFour2;
        resultado[i][j + 2] += suma_NaivLoopUnrollingFour3;
        resultado[i][j + 3] += suma_NaivLoopUnrollingFour4;
      }
    }
    return resultado;
  }
  
  // Definir una función para ejecutar el algoritmo NaivLoopUnrollingFour con un tamaño de matriz dado y medir el tiempo de ejecución
  function ejecutarNaivLoopUnrollingFour(n) {
    let matriz1 = generarMatriz(n);
    let matriz2 = generarMatriz(n);
    let inicio = performance.now();
    let resultado = multiplicarMatricesNaivLoopUnrollingFour(matriz1, matriz2);
    let fin = performance.now();
    let tiempoEjecucion = fin - inicio;
    console.log(`Tamaño de matrices: ${n}x${n}, tiempo de ejecución: ${tiempoEjecucion} ms`);
    return tiempoEjecucion;
  }
  
  // Ejecutar la función para generar 12 casos de prueba con matrices de tamaño n x n, donde n es factor de 2^n
  let tiempo10_NaivLoopUnrollingFour = [];
  for (let i = 1; i <= tiempos; i++) {
    let n = Math.pow(2, i);
    tiempo10_NaivLoopUnrollingFour.push(ejecutarNaivLoopUnrollingFour(n));
  }
  
  // Calcular el promedio de los tiempo10_NaivLoopUnrollingFour de ejecución
  let promedio_NaivLoopUnrollingFour = tiempo10_NaivLoopUnrollingFour.reduce((total, tiempo) => total + tiempo, 0) / tiempo10_NaivLoopUnrollingFour.length;
  console.log(`Promedio de tiempo de ejecución: ${promedio_NaivLoopUnrollingFour} ms`);

  let suma_NaivLoopUnrollingFour = tiempo10_NaivLoopUnrollingFour.reduce((total, tiempo) => total + tiempo, 0)
    console.log(`Total de tiempos de ejecución: ${suma_NaivLoopUnrollingFour} ms`);

  // Calcular la desviación estándar, el rango_NaivLoopUnrollingFour y la varianza_NaivLoopUnrollingFour de los tiempos de ejecución
 
  let varianza_NaivLoopUnrollingFour = tiempo10_NaivLoopUnrollingFour.reduce((total, tiempo) => total + Math.pow(tiempo - promedio_NaivLoopUnrollingFour, 2), 0) / tiempo10_NaivLoopUnrollingFour.length;
  console.log(`varianza_NaivLoopUnrollingFour: ${varianza_NaivLoopUnrollingFour} ms^2`);

  let desviacion_NaivLoopUnrollingFour = Math.sqrt(varianza_NaivLoopUnrollingFour);
  console.log(`desviacion_NaivLoopUnrollingFour: ${desviacion_NaivLoopUnrollingFour} ms`);

  let rango_NaivLoopUnrollingFour = Math.max(...tiempo10_NaivLoopUnrollingFour) - Math.min(...tiempo10_NaivLoopUnrollingFour);
  console.log(`rango_NaivLoopUnrollingFour: ${rango_NaivLoopUnrollingFour} ms`);

  document.getElementById("desviacion_NaivLoopUnrollingFour").innerHTML = desviacion_NaivLoopUnrollingFour;
  document.getElementById("rango_NaivLoopUnrollingFour").innerHTML = rango_NaivLoopUnrollingFour;
  document.getElementById("varianza_NaivLoopUnrollingFour").innerHTML = varianza_NaivLoopUnrollingFour;
  document.getElementById("media_NaivLoopUnrollingFour").innerHTML = promedio_NaivLoopUnrollingFour.toFixed(2); // Actualiza el promedio de la primera fila
  
  document.getElementById("tiempo10_NaivLoopUnrollingFour").innerHTML = tiempo10_NaivLoopUnrollingFour[9];  // Actualiza el tiempo de la primera fila
  document.getElementById("promedio_NaivLoopUnrollingFour").innerHTML = promedio_NaivLoopUnrollingFour.toFixed(2); // Actualiza el promedio de la primera fila
  document.getElementById("suma_NaivLoopUnrollingFour").innerHTML = suma_NaivLoopUnrollingFour; // Actualiza la suma_NaivLoopUnrollingFour de la primera fila