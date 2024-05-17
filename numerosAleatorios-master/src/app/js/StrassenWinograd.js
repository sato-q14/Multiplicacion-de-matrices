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

// Definir una función para sumar dos matrices
function sumarMatrices(matriz1, matriz2) {
    let n = matriz1.length;
    let resultado = [];
    for (let i = 0; i < n; i++) {
      resultado[i] = [];
      for (let j = 0; j < n; j++) {
        resultado[i][j] = matriz1[i][j] + matriz2[i][j];
      }
    }
    return resultado;
  }
  
  // Definir una función para restar dos matrices
  function restarMatrices(matriz1, matriz2) {
    let n = matriz1.length;
    let resultado = [];
    for (let i = 0; i < n; i++) {
      resultado[i] = [];
      for (let j = 0; j < n; j++) {
        resultado[i][j] = matriz1[i][j] - matriz2[i][j];
      }
    }
    return resultado;
  }
  
  // Definir una función para multiplicar dos matrices utilizando el algoritmo StrassenWinograd
  function multiplicarMatricesStrassenWinograd(matriz1, matriz2) {
    let n = matriz1.length;
    // Si las matrices son de tamaño 1, multiplicarlas de manera trivial
    if (n === 1) {
      return [[matriz1[0][0] * matriz2[0][0]]];
    }
    // Dividir las matrices en submatrices
    let m = Math.floor(n / 2);
    let a11 = [];
    let a12 = [];
    let a21 = [];
    let a22 = [];
    let b11 = [];
    let b12 = [];
    let b21 = [];
    let b22 = [];
    for (let i = 0; i < m; i++) {
      a11[i] = matriz1[i].slice(0, m);
      a12[i] = matriz1[i].slice(m, n);
      a21[i] = matriz1[i + m].slice(0, m);
      a22[i] = matriz1[i + m].slice(m, n);
      b11[i] = matriz2[i].slice(0, m);
      b12[i] = matriz2[i].slice(m, n);
      b21[i] = matriz2[i + m].slice(0, m);
      b22[i] = matriz2[i + m].slice(m, n);
    }
    // Calcular las matrices auxiliares para el algoritmo Winograd
    let d1 = restarMatrices(b12, b22);
    let d2 = restarMatrices(a21, a11);
    let d3 = sumarMatrices(a11, a12);
    let d4 = sumarMatrices(b21, b22);
    let d5 = restarMatrices(a12, a22);
    let d6 = sumarMatrices(b21, b11);
    let d7 = restarMatrices(d3, a22);
    let d8 = restarMatrices(d4, b11);
    let d9 = sumarMatrices(d5, d7);
    let d10 = sumarMatrices(d6, d8);
    
    // Calcular las cuatro submatrices del resultado final
    let p1 = multiplicarMatricesStrassenWinograd(a11, d1);
    let p2 = multiplicarMatricesStrassenWinograd(d2, b22);
    let p3 = multiplicarMatricesStrassenWinograd(d3, b11);
    let p4 = multiplicarMatricesStrassenWinograd(a22, d4);
    let p5 = multiplicarMatricesStrassenWinograd(d5, d6);
    let p6 = multiplicarMatricesStrassenWinograd(d7, d8);
    let p7 = multiplicarMatricesStrassenWinograd(d9, d10);
    // Calcular las cuatro submatrices del resultado final
    let c11 = sumarMatrices(restarMatrices(sumarMatrices(p5, p4), p2), p6);
    let c12 = sumarMatrices(p1, p2);
    let c21 = sumarMatrices(p3, p4);
    let c22 = restarMatrices(restarMatrices(sumarMatrices(p5, p1), p3), p7);
    // Unir las cuatro submatrices en la matriz resultado
    let resultado = [];
    for (let i = 0; i < n; i++) {
        resultado[i] = [];
        for (let j = 0; j < n; j++) {
        if (i < m && j < m) {
            resultado[i][j] = c11[i][j];
        } else if (i < m && j >= m) {
            resultado[i][j] = c12[i][j - m];
        } else if (i >= m && j < m) {
            resultado[i][j] = c21[i - m][j];
        } else {
            resultado[i][j] = c22[i - m][j - m];
        }
        }
    }
    return resultado;
    }

// Definir una función para ejecutar el algoritmo StrassenWinograd con un tamaño de matriz dado y medir el tiempo de ejecución
function ejecutarStrassenWinograd(n) {
    let matriz1 = generarMatriz(n);
    let matriz2 = generarMatriz(n);
    let inicio = performance.now();
    let resultado = multiplicarMatricesStrassenWinograd(matriz1, matriz2);
    let fin = performance.now();
    let tiempoEjecucion = fin - inicio;
    console.log(`Tamaño de matrices: ${n}x${n}, tiempo de ejecución: ${tiempoEjecucion} ms`);
    return tiempoEjecucion;
    }
  
    // Ejecutar la función para generar 12 casos de prueba con matrices de tamaño n x n, donde n es factor de 2^n
    let tiempo10_StrassenWinograd = [];
    for (let i = 1; i <= tiempos; i++) {
      let n = Math.pow(2, i);
      tiempo10_StrassenWinograd.push(ejecutarStrassenWinograd(n));
    }
    
    // Calcular el promedio_StrassenWinograd de los tiempo10_StrassenWinograd de ejecución
    let promedio_StrassenWinograd = tiempo10_StrassenWinograd.reduce((total, tiempo) => total + tiempo, 0) / tiempo10_StrassenWinograd.length;
    console.log(`Promedio de tiempo10_StrassenWinograd de ejecución: ${promedio_StrassenWinograd} ms`);
  
    let suma_StrassenWinograd = tiempo10_StrassenWinograd.reduce((total, tiempo) => total + tiempo, 0)
      console.log(`total  de tiempo10_StrassenWinograd de ejecución: ${suma_StrassenWinograd} ms`);
  
     // Calcular la desviación estándar, el rango_StrassenWinograd y la varianza_StrassenWinograd de los tiempos de ejecución
 
     let varianza_StrassenWinograd = tiempo10_StrassenWinograd.reduce((total, tiempo) => total + Math.pow(tiempo - promedio_StrassenWinograd, 2), 0) / tiempo10_StrassenWinograd.length;
     console.log(`varianza_StrassenWinograd: ${varianza_StrassenWinograd} ms^2`);
 
     let desviacion_StrassenWinograd = Math.sqrt(varianza_StrassenWinograd);
     console.log(`desviacion_StrassenWinograd: ${desviacion_StrassenWinograd} ms`);
 
     let rango_StrassenWinograd = Math.max(...tiempo10_StrassenWinograd) - Math.min(...tiempo10_StrassenWinograd);
     console.log(`rango_StrassenWinograd: ${rango_StrassenWinograd} ms`);
 
 
     document.getElementById("rango_StrassenWinograd").innerHTML = rango_StrassenWinograd;
     document.getElementById("media_StrassenWinograd").innerHTML = promedio_StrassenWinograd.toFixed(2); // Actualiza el promedio de la primera fila
     document.getElementById("desviacion_StrassenWinograd").innerHTML = desviacion_StrassenWinograd;
     document.getElementById("varianza_StrassenWinograd").innerHTML = varianza_StrassenWinograd;
    
    document.getElementById("tiempo10_StrassenWinograd").innerHTML = tiempo10_StrassenWinograd[8];  // Actualiza el tiempo de la primera fila
    document.getElementById("promedio_StrassenWinograd").innerHTML = promedio_StrassenWinograd.toFixed(2); // Actualiza el promedio_StrassenWinograd de la primera fila
    document.getElementById("suma_StrassenWinograd").innerHTML = suma_StrassenWinograd; // Actualiza la suma_StrassenWinograd de la primera fila

  