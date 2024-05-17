import { tiempos } from "./main.js";
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
  
  // Definir una función para multiplicar dos matrices utilizando el algoritmo NaivStandard
  function multiplicarMatricesNaivStandard(matriz1, matriz2) {
    let n = matriz1.length;
    let resultado = [];
    for (let i = 0; i < n; i++) {
      resultado[i] = [];
      for (let j = 0; j < n; j++) {
        let suma = 0;
        for (let k = 0; k < n; k++) {
          suma += matriz1[i][k] * matriz2[k][j];
        }
        resultado[i][j] = suma;
      }
    }
    return resultado;
  }
  
  // Definir una función para ejecutar el algoritmo NaivStandard con un tamaño de matriz dado y medir el tiempo de ejecución
  function ejecutarNaivStandard(n) {
    let matriz1 = generarMatriz(n);
    let matriz2 = generarMatriz(n);
    let inicio = performance.now();
    let resultado = multiplicarMatricesNaivStandard(matriz1, matriz2);
    let fin = performance.now();
    let tiempoEjecucion = fin - inicio;
    console.log(`Tamaño de matrices: ${n}x${n}, tiempo de ejecución: ${tiempoEjecucion} ms`);
    return tiempoEjecucion;
  }

    // Ejecutar la función para generar 12 casos de prueba con matrices de tamaño n x n, donde n es factor de 2^n
    let tiempo10_NaivStandard = [];
    for (let i = 1; i <= tiempos; i++) {
      let n = Math.pow(2, i);
      tiempo10_NaivStandard.push(ejecutarNaivStandard(n));
    }
    
    // Calcular el promedio de los tiempos de ejecución
    let promedio_NaivStandard = tiempo10_NaivStandard.reduce((total, tiempo) => total + tiempo, 0) / tiempo10_NaivStandard.length;
    console.log(`Promedio de tiempo de ejecución: ${promedio_NaivStandard} ms`);
    
    let suma_NaivStandard = tiempo10_NaivStandard.reduce((total, tiempo) => total + tiempo, 0);
    console.log(`Total de tiempos de ejecución: ${suma_NaivStandard} ms`);
    
    // Calcular la desviación estándar, el rango_NaivStandar y la varianza_NaivStandar de los tiempos de ejecución
 
    let varianza_NaivStandar = tiempo10_NaivStandard.reduce((total, tiempo) => total + Math.pow(tiempo - promedio_NaivStandard, 2), 0) / tiempo10_NaivStandard.length;
    console.log(`varianza_NaivStandar: ${varianza_NaivStandar} ms^2`);

    let desviacion_NaivStandar = Math.sqrt(varianza_NaivStandar);
    console.log(`desviacion_NaivStandar: ${desviacion_NaivStandar} ms`);

    let rango_NaivStandar = Math.max(...tiempo10_NaivStandard) - Math.min(...tiempo10_NaivStandard);
    console.log(`rango_NaivStandar: ${rango_NaivStandar} ms`);


    document.getElementById("rango_NaivStandar").innerHTML = rango_NaivStandar;
    document.getElementById("media_NaivStandar").innerHTML = promedio_NaivStandard.toFixed(2); // Actualiza el promedio de la primera fila
    document.getElementById("desviacion_NaivStandar").innerHTML = desviacion_NaivStandar;
    document.getElementById("varianza_NaivStandar").innerHTML = varianza_NaivStandar;
  
 
  

  document.getElementById("tiempo10_NaivStandard").innerHTML = tiempo10_NaivStandard[9];  // Actualiza el tiempo de la primera fila

    document.getElementById("promedio_NaivStandard").innerHTML = promedio_NaivStandard.toFixed(2); // Actualiza el promedio_NaivStandard de la primera fila
    document.getElementById("suma_NaivStandard").innerHTML = suma_NaivStandard; // Actualiza la suma_NaivStandard de la primera fila