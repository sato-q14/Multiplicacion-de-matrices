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
  
  // Definir una función para multiplicar dos matrices utilizando el algoritmo WinogradOriginal
  function multiplicarMatricesWinogradOriginal(matriz1, matriz2) {
    let n = matriz1.length;
    let m = matriz2[0].length;
    let k = matriz2.length;
  
    let d = Math.floor(n/2);
  
    let a = [];
    let b = [];
    let c = [];
  
    for (let i = 0; i < n; i++) {
      a[i] = matriz1[i].slice(0, d);
      b[i] = matriz1[i].slice(d, n);
    }
  
    for (let j = 0; j < m; j++) {
      c[j] = matriz2.map(row => row[j]);
    }
  
    let mul1 = [];
    for (let i = 0; i < n; i++) {
      mul1[i] = [];
      for (let j = 0; j < m; j++) {
        let sum = 0;
        for (let q = 0; q < d; q++) {
          sum += a[i][q] * c[j][q];
        }
        mul1[i][j] = sum;
      }
    }
  
    let mul2 = [];
    for (let i = 0; i < n; i++) {
      mul2[i] = [];
      for (let j = 0; j < m; j++) {
        let sum = 0;
        for (let q = 0; q < d; q++) {
          sum += b[i][q] * c[j][q];
        }
        mul2[i][j] = sum;
      }
    }
  
    let resultado = [];
    for (let i = 0; i < n; i++) {
      resultado[i] = [];
      for (let j = 0; j < m; j++) {
        resultado[i][j] = mul1[i][j] + mul2[i][j];
        for (let q = d; q < k; q++) {
          resultado[i][j] += a[i][q-d] * b[q][j];
        }
      }
    }
  
    return resultado;
  }
  
  // Definir una función para ejecutar el algoritmo WinogradOriginal con un tamaño de matriz dado y medir el tiempo de ejecución
  function ejecutarWinogradOriginal(n) {
    let matriz1 = generarMatriz(n);
    let matriz2 = generarMatriz(n);
    let inicio = performance.now();
    let resultado = multiplicarMatricesWinogradOriginal(matriz1, matriz2);
    let fin = performance.now();
    let tiempoEjecucion = fin - inicio;
    console.log(`Tamaño de matrices: ${n}x${n}, tiempo de ejecución: ${tiempoEjecucion} ms`);
    return tiempoEjecucion;
  }

   // Ejecutar la función para generar 12 casos de prueba con matrices de tamaño n x n, donde n es factor de 2^n
   let tiempo10_WinogradOriginal = [];
   for (let i = 1; i <= tiempos; i++) {
     let n = Math.pow(2, i);
     tiempo10_WinogradOriginal.push(ejecutarWinogradOriginal(n));
   }
   
   // Calcular el promedio de los tiempos de ejecución
   let promedio_WinogradOriginal = tiempo10_WinogradOriginal.reduce((total, tiempo) => total + tiempo, 0) / tiempo10_WinogradOriginal.length;
   console.log(`Promedio de tiempo de ejecución: ${promedio_WinogradOriginal} ms`);
   
   let suma_WinogradOriginal = tiempo10_WinogradOriginal.reduce((total, tiempo) => total + tiempo, 0);
   console.log(`Total de tiempos de ejecución: ${suma_WinogradOriginal} ms`);
   
    // Calcular la desviación estándar, el rango_WinogradOriginal y la varianza_WinogradOriginal de los tiempos de ejecución

    let varianza_WinogradOriginal = tiempo10_WinogradOriginal.reduce((total, tiempo) => total + Math.pow(tiempo - promedio_WinogradOriginal, 2), 0) / tiempo10_WinogradOriginal.length;
    console.log(`varianza_WinogradOriginal: ${varianza_WinogradOriginal} ms^2`);

    let desviacion_WinogradOriginal = Math.sqrt(varianza_WinogradOriginal);
    console.log(`desviacion_WinogradOriginal: ${desviacion_WinogradOriginal} ms`);

    let rango_WinogradOriginal = Math.max(...tiempo10_WinogradOriginal) - Math.min(...tiempo10_WinogradOriginal);
    console.log(`rango_WinogradOriginal: ${rango_WinogradOriginal} ms`);


    document.getElementById("rango_WinogradOriginal").innerHTML = rango_WinogradOriginal;
    document.getElementById("media_WinogradOriginal").innerHTML = promedio_WinogradOriginal.toFixed(2); // Actualiza el promedio de la primera fila
    document.getElementById("desviacion_WinogradOriginal").innerHTML = desviacion_WinogradOriginal;
    document.getElementById("varianza_WinogradOriginal").innerHTML = varianza_WinogradOriginal;

   document.getElementById("tiempo10_WinogradOriginal").innerHTML = tiempo10_WinogradOriginal[9];  // Actualiza el tiempo de la primera fila
   document.getElementById("promedio_WinogradOriginal").innerHTML = promedio_WinogradOriginal.toFixed(2); // Actualiza el promedio_WinogradOriginal de la primera fila
   document.getElementById("suma_WinogradOriginal").innerHTML = suma_WinogradOriginal; // Actualiza la suma_WinogradOriginal de la primera fila
 