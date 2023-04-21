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
  
  // Definir una función para multiplicar dos matrices utilizando el algoritmo NaivOnArray
  function multiplicarMatricesNaivOnArray(matriz1, matriz2) {
    let n = matriz1.length;
    let resultado = new Array(n);
    for (let i = 0; i < n; i++) {
      resultado[i] = new Array(n).fill(0);
      for (let j = 0; j < n; j++) {
        for (let k = 0; k < n; k++) {
          resultado[i][j] += matriz1[i][k] * matriz2[k][j];
        }
      }
    }
    return resultado;
  }
  
  // Definir una función para ejecutar el algoritmo NaivOnArray con un tamaño de matriz dado y medir el tiempo de ejecución
  function ejecutarNaivOnArray(n) {
    let matriz1 = generarMatriz(n);
    let matriz2 = generarMatriz(n);
    let inicio = performance.now();
    let resultado = multiplicarMatricesNaivOnArray(matriz1, matriz2);
    let fin = performance.now();
    let tiempoEjecucion = fin - inicio;
    console.log(`Tamaño de matrices: ${n}x${n}, tiempo de ejecución: ${tiempoEjecucion} ms`);
    return tiempoEjecucion;
  }
  
    // Ejecutar la función para generar 12 casos de prueba con matrices de tamaño n x n, donde n es factor de 2^n
    let tiempo10_NaivOnArray = [];
    for (let i = 1; i <= 10; i++) {
      let n = Math.pow(2, i);
      tiempo10_NaivOnArray.push(ejecutarNaivOnArray(n));
    }
    
    // Calcular el promedio de los tiempos de ejecución
    let promedio_NaivOnArray = tiempo10_NaivOnArray.reduce((total, tiempo) => total + tiempo, 0) / tiempo10_NaivOnArray.length;
    console.log(`Promedio de tiempo de ejecución: ${promedio_NaivOnArray} ms`);
    
    let suma_NaivOnArray = tiempo10_NaivOnArray.reduce((total, tiempo) => total + tiempo, 0);
    console.log(`Total de tiempos de ejecución: ${suma_NaivOnArray} ms`);
    
      // Calcular la desviación estándar, el rango_NaivOnArray y la varianza_NaivOnArray de los tiempos de ejecución
 
      let varianza_NaivOnArray = tiempo10_NaivOnArray.reduce((total, tiempo) => total + Math.pow(tiempo - promedio_NaivOnArray, 2), 0) / tiempo10_NaivOnArray.length;
      console.log(`varianza_NaivOnArray: ${varianza_NaivOnArray} ms^2`);
  
      let desviacion_NaivOnArray = Math.sqrt(varianza_NaivOnArray);
      console.log(`desviacion_NaivOnArray: ${desviacion_NaivOnArray} ms`);
  
      let rango_NaivOnArray = Math.max(...tiempo10_NaivOnArray) - Math.min(...tiempo10_NaivOnArray);
      console.log(`rango_NaivOnArray: ${rango_NaivOnArray} ms`);
  
  
      document.getElementById("rango_NaivOnArray").innerHTML = rango_NaivOnArray;
      document.getElementById("media_NaivOnArray").innerHTML = promedio_NaivOnArray.toFixed(2); // Actualiza el promedio de la primera fila
      document.getElementById("desviacion_NaivOnArray").innerHTML = desviacion_NaivOnArray;
      document.getElementById("varianza_NaivOnArray").innerHTML = varianza_NaivOnArray;


    document.getElementById("tiempo10_NaivOnArray").innerHTML = tiempo10_NaivOnArray[9];  // Actualiza el tiempo de la primera fila
    

    document.getElementById("promedio_NaivOnArray").innerHTML = promedio_NaivOnArray.toFixed(2); // Actualiza el promedio_NaivOnArray de la primera fila
    document.getElementById("suma_NaivOnArray").innerHTML = suma_NaivOnArray; // Actualiza la suma_NaivOnArray de la primera fila

    