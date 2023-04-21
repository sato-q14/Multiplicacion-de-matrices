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

// Definir una función para multiplicar dos matrices utilizando el algoritmo NaivLoopUnrollingThree
function multiplicarMatricesNaivLoopUnrollingThree(matriz1, matriz2) {
  let n = matriz1.length;
  let resultado = [];
  for (let i = 0; i < n; i++) {
    resultado[i] = [];
    for (let j = 0; j < n; j++) {
      resultado[i][j] = 0; // inicializar con valor 0
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j+=3) { // loop unrolling de 3
      let suma1 = 0, suma2 = 0, suma3 = 0;
      for (let k = 0; k < n; k++) {
        suma1 += matriz1[i][k] * matriz2[k][j];
        suma2 += matriz1[i][k] * matriz2[k][j+1];
        suma3 += matriz1[i][k] * matriz2[k][j+2];
      }
      resultado[i][j] += suma1;
      resultado[i][j+1] += suma2;
      resultado[i][j+2] += suma3;
    }
  }
  return resultado;
}


// Definir una función para ejecutar el algoritmo NaivLoopUnrollingThree con un tamaño de matriz dado y medir el tiempo de ejecución
function ejecutarNaivLoopUnrollingThree(n) {
  let matriz1 = generarMatriz(n);
  let matriz2 = generarMatriz(n);
  let inicio = performance.now();
  let resultado = multiplicarMatricesNaivLoopUnrollingThree(matriz1, matriz2);
  let fin = performance.now();
  let tiempoEjecucion = fin - inicio;
  console.log(`Tamaño de matrices: ${n}x${n}, tiempo de ejecución: ${tiempoEjecucion} ms`);
  return tiempoEjecucion;
}

   // Ejecutar la función para generar 12 casos de prueba con matrices de tamaño n x n, donde n es factor de 2^n
   let tiempo10_NaivLoopUnrollingThree = [];
   for (let i = 1; i <= 10; i++) {
     let n = Math.pow(2, i);
     tiempo10_NaivLoopUnrollingThree.push(ejecutarNaivLoopUnrollingThree(n));
   }
   
   // Calcular el promedio de los tiempos de ejecución
   let promedio_NaivLoopUnrollingThree = tiempo10_NaivLoopUnrollingThree.reduce((total, tiempo) => total + tiempo, 0) / tiempo10_NaivLoopUnrollingThree.length;
   console.log(`Promedio de tiempo de ejecución: ${promedio_NaivLoopUnrollingThree} ms`);
   
   let suma_NaivLoopUnrollingThree = tiempo10_NaivLoopUnrollingThree.reduce((total, tiempo) => total + tiempo, 0);
   console.log(`Total de tiempos de ejecución: ${suma_NaivLoopUnrollingThree} ms`);
   

       // Calcular la desviación estándar, el rango_NaivLoopUnrollingThree y la varianza_NaivLoopUnrollingThree de los tiempos de ejecución
 
       let varianza_NaivLoopUnrollingThree = tiempo10_NaivLoopUnrollingThree.reduce((total, tiempo) => total + Math.pow(tiempo - promedio_NaivLoopUnrollingThree, 2), 0) / tiempo10_NaivLoopUnrollingThree.length;
       console.log(`varianza_NaivLoopUnrollingThree: ${varianza_NaivLoopUnrollingThree} ms^2`);
   
       let desviacion_NaivLoopUnrollingThree = Math.sqrt(varianza_NaivLoopUnrollingThree);
       console.log(`desviacion_NaivLoopUnrollingThree: ${desviacion_NaivLoopUnrollingThree} ms`);
   
       let rango_NaivLoopUnrollingThree = Math.max(...tiempo10_NaivLoopUnrollingThree) - Math.min(...tiempo10_NaivLoopUnrollingThree);
       console.log(`rango_NaivLoopUnrollingThree: ${rango_NaivLoopUnrollingThree} ms`);
   
   
       document.getElementById("rango_NaivLoopUnrollingThree").innerHTML = rango_NaivLoopUnrollingThree;
       document.getElementById("media_NaivLoopUnrollingThree").innerHTML = promedio_NaivLoopUnrollingThree.toFixed(2); // Actualiza el promedio de la primera fila
       document.getElementById("desviacion_NaivLoopUnrollingThree").innerHTML = desviacion_NaivLoopUnrollingThree;
       document.getElementById("varianza_NaivLoopUnrollingThree").innerHTML = varianza_NaivLoopUnrollingThree;
  

   document.getElementById("tiempo10_NaivLoopUnrollingThree").innerHTML = tiempo10_NaivLoopUnrollingThree[9];  // Actualiza el tiempo de la primera fila
   document.getElementById("promedio_NaivLoopUnrollingThree").innerHTML = promedio_NaivLoopUnrollingThree.toFixed(2); // Actualiza el promedio_NaivLoopUnrollingThree de la primera fila
   document.getElementById("suma_NaivLoopUnrollingThree").innerHTML = suma_NaivLoopUnrollingThree; // Actualiza la suma_NaivLoopUnrollingThree de la primera fila