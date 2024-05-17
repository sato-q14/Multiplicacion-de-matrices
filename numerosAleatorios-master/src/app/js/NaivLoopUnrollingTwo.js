import { tiempos } from "./main.js";
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

// Definir una función para multiplicar dos matrices utilizando el algoritmo NaivLoopUnrollingTwo
function multiplicarMatricesNaivLoopUnrollingTwo(matriz1, matriz2) {
    let n = matriz1.length;
    let resultado = [];
    for (let i = 0; i < n; i++) {
      resultado[i] = [];
      for (let j = 0; j < n; j++) {
        let suma1 = 0;
        let suma2 = 0;
        for (let k = 0; k < n; k += 2) {
          suma1 += matriz1[i][k] * matriz2[k][j] + matriz1[i][k + 1] * matriz2[k + 1][j];
          suma2 += matriz1[i][k] * matriz2[k + 1][j] - matriz1[i][k + 1] * matriz2[k][j];
        }
        resultado[i][j] = suma1 + suma2;
      }
    }
    return resultado;
  }
  
  // Definir una función para ejecutar el algoritmo NaivLoopUnrollingTwo con un tamaño de matriz dado y medir el tiempo de ejecución
  function ejecutarNaivLoopUnrollingTwo(n) {
    let matriz1 = generarMatriz(n);
    let matriz2 = generarMatriz(n);
    let inicio = performance.now();
    let resultado = multiplicarMatricesNaivLoopUnrollingTwo(matriz1, matriz2);
    let fin = performance.now();
    let tiempoEjecucion = fin - inicio;
    console.log(`Tamaño de matrices: ${n}x${n}, tiempo de ejecución: ${tiempoEjecucion} ms`);
    return tiempoEjecucion;
  }
  
   // Ejecutar la función para generar 12 casos de prueba con matrices de tamaño n x n, donde n es factor de 2^n
   let tiempo10_NaivLoopUnrollingTwo = [];
   for (let i = 1; i <= tiempos; i++) {
     let n = Math.pow(2, i);
     tiempo10_NaivLoopUnrollingTwo.push(ejecutarNaivLoopUnrollingTwo(n));
   }
   
   // Calcular el promedio de los tiempos de ejecución
   let promedio_NaivLoopUnrollingTwo = tiempo10_NaivLoopUnrollingTwo.reduce((total, tiempo) => total + tiempo, 0) / tiempo10_NaivLoopUnrollingTwo.length;
   console.log(`Promedio de tiempo de ejecución: ${promedio_NaivLoopUnrollingTwo} ms`);
   
   let suma_NaivLoopUnrollingTwo = tiempo10_NaivLoopUnrollingTwo.reduce((total, tiempo) => total + tiempo, 0);
   console.log(`Total de tiempos de ejecución: ${suma_NaivLoopUnrollingTwo} ms`);
   

     // Calcular la desviación estándar, el rango_NaivLoopUnrollingTwo y la varianza_NaivLoopUnrollingTwo de los tiempos de ejecución
 
     let varianza_NaivLoopUnrollingTwo = tiempo10_NaivLoopUnrollingTwo.reduce((total, tiempo) => total + Math.pow(tiempo - promedio_NaivLoopUnrollingTwo, 2), 0) / tiempo10_NaivLoopUnrollingTwo.length;
     console.log(`varianza_NaivLoopUnrollingTwo: ${varianza_NaivLoopUnrollingTwo} ms^2`);
 
     let desviacion_NaivLoopUnrollingTwo = Math.sqrt(varianza_NaivLoopUnrollingTwo);
     console.log(`desviacion_NaivLoopUnrollingTwo: ${desviacion_NaivLoopUnrollingTwo} ms`);
 
     let rango_NaivLoopUnrollingTwo = Math.max(...tiempo10_NaivLoopUnrollingTwo) - Math.min(...tiempo10_NaivLoopUnrollingTwo);
     console.log(`rango_NaivLoopUnrollingTwo: ${rango_NaivLoopUnrollingTwo} ms`);
 
 
     document.getElementById("rango_NaivLoopUnrollingTwo").innerHTML = rango_NaivLoopUnrollingTwo;
     document.getElementById("media_NaivLoopUnrollingTwo").innerHTML = promedio_NaivLoopUnrollingTwo.toFixed(2); // Actualiza el promedio de la primera fila
     document.getElementById("desviacion_NaivLoopUnrollingTwo").innerHTML = desviacion_NaivLoopUnrollingTwo;
     document.getElementById("varianza_NaivLoopUnrollingTwo").innerHTML = varianza_NaivLoopUnrollingTwo;


   document.getElementById("tiempo10_NaivLoopUnrollingTwo").innerHTML = tiempo10_NaivLoopUnrollingTwo[9];  // Actualiza el tiempo de la primera fila
   document.getElementById("promedio_NaivLoopUnrollingTwo").innerHTML = promedio_NaivLoopUnrollingTwo.toFixed(2); // Actualiza el promedio_NaivLoopUnrollingTwo de la primera fila
   document.getElementById("suma_NaivLoopUnrollingTwo").innerHTML = suma_NaivLoopUnrollingTwo; // Actualiza la suma_NaivLoopUnrollingTwo de la primera fila