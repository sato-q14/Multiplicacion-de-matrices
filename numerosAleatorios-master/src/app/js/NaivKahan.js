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
  
  // Definir una función para multiplicar dos matrices utilizando el algoritmo NaivKahan
  function multiplicarMatricesNaivKahan(matriz1, matriz2) {
    let n = matriz1.length;
    let resultado = [];
    for (let i = 0; i < n; i++) {
      resultado[i] = [];
      for (let j = 0; j < n; j++) {
        let suma_NaivKahan = 0;
        let c = 0;
        for (let k = 0; k < n; k++) {
          let y = matriz1[i][k] * matriz2[k][j] - c;
          let t = suma_NaivKahan + y;
          c = (t - suma_NaivKahan) - y;
          suma_NaivKahan = t;
        }
        resultado[i][j] = suma_NaivKahan;
      }
    }
    return resultado;
  }
  
  // Definir una función para ejecutar el algoritmo NaivKahan con un tamaño de matriz dado y medir el tiempo de ejecución
  function ejecutarNaivKahan(n) {
    let matriz1 = generarMatriz(n);
    let matriz2 = generarMatriz(n);
    let inicio = performance.now();
    let resultado = multiplicarMatricesNaivKahan(matriz1, matriz2);
    let fin = performance.now();
    let tiempoEjecucion = fin - inicio;
    console.log(`Tamaño de matrices: ${n}x${n}, tiempo de ejecución: ${tiempoEjecucion} ms`);
    return tiempoEjecucion;
  }
  
 // Ejecutar la función para generar 12 casos de prueba con matrices de tamaño n x n, donde n es factor de 2^n
let tiempo10_NaivKahan = [];
for (let i = 1; i <= tiempos; i++) {
  let n = Math.pow(2, i);
  tiempo10_NaivKahan.push(ejecutarNaivKahan(n));
}

// Calcular el promedio_NaivKahan de los tiempos de ejecución
let promedio_NaivKahan = tiempo10_NaivKahan.reduce((total, tiempo) => total + tiempo, 0) / tiempo10_NaivKahan.length;
console.log(`Promedio de tiempos de ejecución: ${promedio_NaivKahan} ms`);

// Calcular la suma_NaivKahan de los tiempos de ejecución
let suma_NaivKahan = tiempo10_NaivKahan.reduce((total, tiempo) => total + tiempo, 0)
console.log(`Total de tiempos de ejecución: ${suma_NaivKahan} ms`);

      // Calcular la desviación estándar, el rango_NaivKahan y la varianza_NaivKahan de los tiempos de ejecución
 
      let varianza_NaivKahan = tiempo10_NaivKahan.reduce((total, tiempo) => total + Math.pow(tiempo - promedio_NaivKahan, 2), 0) / tiempo10_NaivKahan.length;
      console.log(`varianza_NaivKahan: ${varianza_NaivKahan} ms^2`);
  
      let desviacion_NaivKahan = Math.sqrt(varianza_NaivKahan);
      console.log(`desviacion_NaivKahan: ${desviacion_NaivKahan} ms`);
  
      let rango_NaivKahan = Math.max(...tiempo10_NaivKahan) - Math.min(...tiempo10_NaivKahan);
      console.log(`rango_NaivKahan: ${rango_NaivKahan} ms`);
  
  
      document.getElementById("rango_NaivKahan").innerHTML = rango_NaivKahan;
      document.getElementById("media_NaivKahan").innerHTML = promedio_NaivKahan.toFixed(2); // Actualiza el promedio de la primera fila
      document.getElementById("desviacion_NaivKahan").innerHTML = desviacion_NaivKahan;
      document.getElementById("varianza_NaivKahan").innerHTML = varianza_NaivKahan;

// Actualizar los valores en la tabla HTML
document.getElementById("tiempo10_NaivKahan").innerHTML = tiempo10_NaivKahan[9]; // Actualiza el tiempo de la primera fila
document.getElementById("promedio_NaivKahan").innerHTML = promedio_NaivKahan.toFixed(2); // Actualiza el promedio_NaivKahan de la primera fila
document.getElementById("suma_NaivKahan").innerHTML = suma_NaivKahan; // Actualiza la suma_NaivKahan de la primera fila
