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

// Definir una función para multiplicar dos matrices utilizando el algoritmo WinogradScaled
function multiplicarMatricesWinogradScaled(matriz1, matriz2) {
  let n = matriz1.length;
  let m = n / 2;
  let d = new Array(m);
  for (let i = 0; i < m; i++) {
    d[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      d[i][j] = matriz1[2*i][j] * matriz1[2*i+1][j];
    }
  }

  let b = new Array(m);
  for (let i = 0; i < m; i++) {
    b[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      b[i][j] = - matriz1[2*i][j] - matriz1[2*i+1][j] + matriz1[2*i][j+1] + matriz1[2*i+1][j+1];
    }
  }

  let c = new Array(m);
  for (let i = 0; i < m; i++) {
    c[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      c[i][j] = matriz2[j][2*i] * matriz2[j][2*i+1];
    }
  }

  let resultado = new Array(n);
  for (let i = 0; i < n; i++) {
    resultado[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      resultado[i][j] = 0;
      for (let k = 0; k < m; k++) {
        resultado[i][j] += (d[k][i] + b[k][i] + c[k][j]) * matriz2[j][2*k+1];
      }
    }
  }

  if (n % 2 == 1) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        resultado[i][j] += matriz1[n-1][j] * matriz2[j][n-1];
      }
    }
  }

  return resultado;
}

// Definir una función para ejecutar el algoritmo WinogradScaled con un tamaño de matriz dado y medir el tiempo de ejecución
function ejecutarWinogradScaled(n) {
  let matriz1 = generarMatriz(n);
  let matriz2 = generarMatriz(n);
  let inicio = performance.now();
  let resultado = multiplicarMatricesWinogradScaled(matriz1, matriz2);
  let fin = performance.now();
  let tiempoEjecucion = fin - inicio;
  console.log(`Tamaño de matrices: ${n}x${n}, tiempo de ejecución: ${tiempoEjecucion} ms`);
  return tiempoEjecucion;
  }

  // Ejecutar la función para generar 12 casos de prueba con matrices de tamaño n x n, donde n es factor de 2^n
  let tiempo10_WinogradScaled = [];
  for (let i = 1; i <= 10; i++) {
    let n = Math.pow(2, i);
    tiempo10_WinogradScaled.push(ejecutarWinogradScaled(n));
  }
  
  // Calcular el promedio_WinogradScaled de los tiempo10_WinogradScaled de ejecución
  let promedio_WinogradScaled = tiempo10_WinogradScaled.reduce((total, tiempo) => total + tiempo, 0) / tiempo10_WinogradScaled.length;
  console.log(`Promedio de tiempo10_WinogradScaled de ejecución: ${promedio_WinogradScaled} ms`);

  let suma_WinogradScaled = tiempo10_WinogradScaled.reduce((total, tiempo) => total + tiempo, 0)
    console.log(`total  de tiempo10_WinogradScaled de ejecución: ${suma_WinogradScaled} ms`);

  // Calcular la desviación estándar, el rango_WinogradScaled y la varianza_WinogradScaled de los tiempos de ejecución
 
  let varianza_WinogradScaled = tiempo10_WinogradScaled.reduce((total, tiempo) => total + Math.pow(tiempo - promedio_WinogradScaled, 2), 0) / tiempo10_WinogradScaled.length;
  console.log(`varianza_WinogradScaled: ${varianza_WinogradScaled} ms^2`);

  let desviacion_WinogradScaled = Math.sqrt(varianza_WinogradScaled);
  console.log(`desviacion_WinogradScaled: ${desviacion_WinogradScaled} ms`);

  let rango_WinogradScaled = Math.max(...tiempo10_WinogradScaled) - Math.min(...tiempo10_WinogradScaled);
  console.log(`rango_WinogradScaled: ${rango_WinogradScaled} ms`);


  document.getElementById("rango_WinogradScaled").innerHTML = rango_WinogradScaled;
  document.getElementById("media_WinogradScaled").innerHTML = promedio_WinogradScaled.toFixed(2); // Actualiza el promedio de la primera fila
  document.getElementById("desviacion_WinogradScaled").innerHTML = desviacion_WinogradScaled;
  document.getElementById("varianza_WinogradScaled").innerHTML = varianza_WinogradScaled;
  
  document.getElementById("tiempo10_WinogradScaled").innerHTML = tiempo10_WinogradScaled[9];  // Actualiza el tiempo de la primera fila
  document.getElementById("promedio_WinogradScaled").innerHTML = promedio_WinogradScaled.toFixed(2); // Actualiza el promedio_WinogradScaled de la primera fila
  document.getElementById("suma_WinogradScaled_WinogradScaled").innerHTML = suma_WinogradScaled; // Actualiza la suma_WinogradScaled de la primera fila