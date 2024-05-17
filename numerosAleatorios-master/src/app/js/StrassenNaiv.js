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
  
  
// Definir una función para multiplicar dos matrices utilizando el algoritmo StrassenNaiv
function multiplicarMatricesStrassenNaiv(matriz1, matriz2) {
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
  // Calcular las siete multiplicaciones necesarias para la recursión
  let s1 = multiplicarMatricesStrassenNaiv(sumarMatrices(a11, a22), sumarMatrices(b11, b22));
  let s2 = multiplicarMatricesStrassenNaiv(sumarMatrices(a21, a22), b11);
  let s3 = multiplicarMatricesStrassenNaiv(a11, restarMatrices(b12, b22));
  let s4 = multiplicarMatricesStrassenNaiv(a22, restarMatrices(b21, b11));
  let s5 = multiplicarMatricesStrassenNaiv(sumarMatrices(a11, a12), b22);
  let s6 = multiplicarMatricesStrassenNaiv(restarMatrices(a21, a11), sumarMatrices(b11, b12));
  let s7 = multiplicarMatricesStrassenNaiv(restarMatrices(a12, a22), sumarMatrices(b21, b22));
  // Calcular las cuatro submatrices del resultado final
  let c11 = restarMatrices(sumarMatrices(s1, s4), sumarMatrices(s5, s7));
  let c12 = sumarMatrices(s3, s5);
  let c21 = sumarMatrices(s2, s4);
  let c22 = restarMatrices(sumarMatrices(s1, s3), sumarMatrices(s2, s6));
  // Unir las submatrices en una sola matriz y retornarla
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

// Definir una función para ejecutar el algoritmo StrassenNaiv con un tamaño de matriz dado y medir el tiempo de ejecución
function ejecutarStrassenNaiv(n) {
    let matriz1 = generarMatriz(n);
    let matriz2 = generarMatriz(n);
    let inicio = performance.now();
    let resultado = multiplicarMatricesStrassenNaiv(matriz1, matriz2);
    let fin = performance.now();
    let tiempoEjecucion = fin - inicio;
    console.log(`Tamaño de matrices: ${n}x${n}, tiempo de ejecución: ${tiempoEjecucion} ms`);
    return tiempoEjecucion;
    }
  
    // Ejecutar la función para generar 12 casos de prueba con matrices de tamaño n x n, donde n es factor de 2^n
    let tiempo10_StrassenNaiv = [];
    for (let i = 1; i <= tiempos; i++) {
      let n = Math.pow(2, i);
      tiempo10_StrassenNaiv.push(ejecutarStrassenNaiv(n));
    }
    
    // Calcular el promedio_StrassenNaiv de los tiempo10_StrassenNaiv de ejecución
    let promedio_StrassenNaiv = tiempo10_StrassenNaiv.reduce((total, tiempo) => total + tiempo, 0) / tiempo10_StrassenNaiv.length;
    console.log(`Promedio de tiempo10_StrassenNaiv de ejecución: ${promedio_StrassenNaiv} ms`);
  
    let suma_StrassenNaiv = tiempo10_StrassenNaiv.reduce((total, tiempo) => total + tiempo, 0)
      console.log(`total  de tiempo10_StrassenNaiv de ejecución: ${suma_StrassenNaiv} ms`);
  
       // Calcular la desviación estándar, el rango_StrassenNaiv y la varianza_StrassenNaiv de los tiempos de ejecución
 
       let varianza_StrassenNaiv = tiempo10_StrassenNaiv.reduce((total, tiempo) => total + Math.pow(tiempo - promedio_StrassenNaiv, 2), 0) / tiempo10_StrassenNaiv.length;
       console.log(`varianza_StrassenNaiv: ${varianza_StrassenNaiv} ms^2`);
   
       let desviacion_StrassenNaiv = Math.sqrt(varianza_StrassenNaiv);
       console.log(`desviacion_StrassenNaiv: ${desviacion_StrassenNaiv} ms`);
   
       let rango_StrassenNaiv = Math.max(...tiempo10_StrassenNaiv) - Math.min(...tiempo10_StrassenNaiv);
       console.log(`rango_StrassenNaiv: ${rango_StrassenNaiv} ms`);
   
   
       document.getElementById("rango_StrassenNaiv").innerHTML = rango_StrassenNaiv;
       document.getElementById("media_StrassenNaiv").innerHTML = promedio_StrassenNaiv.toFixed(2); // Actualiza el promedio de la primera fila
       document.getElementById("desviacion_StrassenNaiv").innerHTML = desviacion_StrassenNaiv;
       document.getElementById("varianza_StrassenNaiv").innerHTML = varianza_StrassenNaiv;
    
    document.getElementById("tiempo10_StrassenNaiv").innerHTML = tiempo10_StrassenNaiv[8];  // Actualiza el tiempo de la primera fila
    document.getElementById("promedio_StrassenNaiv").innerHTML = promedio_StrassenNaiv.toFixed(2); // Actualiza el promedio_StrassenNaiv de la primera fila
    document.getElementById("suma_StrassenNaiv").innerHTML = suma_StrassenNaiv; // Actualiza la suma_StrassenNaiv de la primera fila