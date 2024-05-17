import { tiempos } from "./main.js";

function generarMatriz(n) {
    let matriz = [];
    for (let i = 0; i < n; i++) {
        matriz[i] = [];
        for (let j = 0; j < n; j++) {
            matriz[i][j] = Math.floor(Math.random() * 9000 + 1000); // Generar número aleatorio de 6 dígitos
        }
    }
    return matriz;
}

function multiplicarBloque(resultado, B, C, n, blockSize, i1, j1, k1) {
    for (let i = i1; i < Math.min(i1 + blockSize, n); i++) {
        for (let j = j1; j < Math.min(j1 + blockSize, n); j++) {
            for (let k = k1; k < Math.min(k1 + blockSize, n); k++) {
                resultado[i][j] += B[i][k] * C[k][j];
            }
        }
    }
}

function multiplicarMatricesParalelo(B, C, blockSize) {
    let n = B.length;
    let resultado = Array.from({ length: n }, () => Array(n).fill(0));

    let tasks = [];
    for (let i1 = 0; i1 < n; i1 += blockSize) {
        for (let j1 = 0; j1 < n; j1 += blockSize) {
            for (let k1 = 0; k1 < n; k1 += blockSize) {
                tasks.push([resultado, B, C, n, blockSize, i1, j1, k1]);
            }
        }
    }

    tasks.forEach(task => {
        multiplicarBloque(...task);
    });

    return resultado;
}

function ejecutarMultiplicacionParalela(n, blockSize) {
    let matriz1 = generarMatriz(n);
    let matriz2 = generarMatriz(n);
    let inicio = performance.now();
    let resultado = multiplicarMatricesParalelo(matriz1, matriz2, blockSize);
    let fin = performance.now();
    let tiempoEjecucion = fin - inicio;
    console.log(`Tamaño de matrices: ${n}x${n}, tiempo de ejecución: ${tiempoEjecucion} ms`);
    return tiempoEjecucion;
}

// Ejecutar la función para generar casos de prueba con matrices de tamaño n x n
let tiempoMultiplicacionParalela = [];
let blockSize = 32;

for (let i = 1; i <= tiempos; i++) {
    let n = Math.pow(2, i);
    tiempoMultiplicacionParalela.push(ejecutarMultiplicacionParalela(n, blockSize));
}

// Calcular el promedio de los tiempos de ejecución
let promedioMultiplicacionParalela = tiempoMultiplicacionParalela.reduce((total, tiempo) => total + tiempo, 0) / tiempoMultiplicacionParalela.length;
console.log(`Promedio de tiempo de ejecución: ${promedioMultiplicacionParalela} ms`);

let sumaMultiplicacionParalela = tiempoMultiplicacionParalela.reduce((total, tiempo) => total + tiempo, 0);
console.log(`Total de tiempos de ejecución: ${sumaMultiplicacionParalela} ms`);

// Calcular la varianza, desviación estándar y rango de los tiempos de ejecución
let varianzaMultiplicacionParalela = tiempoMultiplicacionParalela.reduce((total, tiempo) => total + Math.pow(tiempo - promedioMultiplicacionParalela, 2), 0) / tiempoMultiplicacionParalela.length;
console.log(`Varianza Multiplicación Paralela: ${varianzaMultiplicacionParalela} ms^2`);

let desviacionMultiplicacionParalela = Math.sqrt(varianzaMultiplicacionParalela);
console.log(`Desviación estándar Multiplicación Paralela: ${desviacionMultiplicacionParalela} ms`);

let rangoMultiplicacionParalela = Math.max(...tiempoMultiplicacionParalela) - Math.min(...tiempoMultiplicacionParalela);
console.log(`Rango Multiplicación Paralela: ${rangoMultiplicacionParalela} ms`);

// Actualizar los elementos del documento con los resultados del método 5
document.getElementById("tiempo10_5Paralelo").innerHTML = tiempoMultiplicacionParalela[9];
document.getElementById("promedio_5Paralelo").innerHTML = promedioMultiplicacionParalela.toFixed(2);
document.getElementById("suma_5Paralelo").innerHTML = sumaMultiplicacionParalela;
document.getElementById("rango_5Paralelo").innerHTML = rangoMultiplicacionParalela;
document.getElementById("varianza_5Paralelo").innerHTML = varianzaMultiplicacionParalela;
document.getElementById("desviacion_5Paralelo").innerHTML = desviacionMultiplicacionParalela;
document.getElementById("media_5Paralelo").innerHTML = desviacionMultiplicacionParalela;

