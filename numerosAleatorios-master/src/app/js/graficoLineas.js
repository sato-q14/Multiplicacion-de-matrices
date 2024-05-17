
// Obtener el elemento canvas y su contexto
let ctx = document.getElementById('myChart').getContext('2d');

// Llamar a la función update del objeto Chart para actualizar los datos del gráfico

let tamaños = [2, 4, 8, 16, 32, 64, 128, 256, 512];


let tiemposNaivOnArray = tamaños.map(n => ejecutarNaivOnArray(n));
let tiemposNaivLoopUnrollingTwo = tamaños.map(n => ejecutarNaivLoopUnrollingTwo(n));
let tiemposNaivLoopUnrollingFour = tamaños.map(n => ejecutarNaivLoopUnrollingFour(n));
let tiemposWinogradOriginal = tamaños.map(n => ejecutarWinogradOriginal(n));
let tiemposWinogradScaled = tamaños.map(n => ejecutarWinogradScaled(n));
let tiemposStrassenNaiv = tamaños.map(n => ejecutarStrassenNaiv(n));
let tiemposStrassenWinograd = tamaños.map(n => ejecutarStrassenWinograd(n));
let tiemposIII3Sequentialblock = tamaños.map(n => ejecutarIII3Sequentialblock(n));
let tiemposIII4ParallelBlock = tamaños.map(n => ejecutarIII4ParallelBlock(n));
let tiemposIII5EnhancedParallelBlock = tamaños.map(n => ejecutarIII5EnhancedParallelBlock(n));
let tiemposIV4ParallelBlock = tamaños.map(n => ejecutarIV4ParallelBlock(n));
let tiemposIV3SequentialBlock = tamaños.map(n => ejecutarIV3SequentialBlock(n));
let tiemposV3Sequentialblock = tamaños.map(n => ejecutarV3Sequentialblock(n));
let tiemposV4ParallelBlock = tamaños.map(n => ejecutarV4ParallelBlock(n));

// Crear un objeto Chart
 let myChart = new Chart(ctx, {
    type: 'line',  // Tipo de gráfico
    data: {
        labels: tamaños,  // Etiquetas del eje X (tamaños de matriz)
        datasets: [{
            label: 'NaivOnArray',  // Etiqueta de la línea
            data: tiemposNaivOnArray,  // Datos de la línea
            backgroundColor: 'rgba(54, 162, 235, 0.2)',  // Color de fondo de la línea
            borderColor: 'rgba(54, 162, 235, 1)',  // Color de la línea
            borderWidth: 1  // Ancho de la línea
            
        }, {
            label: 'NaivLoopUnrollingTwo',  // Etiqueta de la línea
            data: tiemposNaivLoopUnrollingTwo,  // Datos de la línea
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1  // Ancho de la línea
            
        }, {
            label: 'NaivLoopUnrollingFour',  // Etiqueta de la línea
            data: tiemposNaivLoopUnrollingFour,  // Datos de la línea
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1  // Ancho de la línea
            
        }, {
            label: 'WinogradOriginal',  // Etiqueta de la línea
            data: tiemposWinogradOriginal,  // Datos de la línea
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 1  // Ancho de la línea
            
        }, {
            label: 'WinogradScaled',  // Etiqueta de la línea
            data: tiemposWinogradScaled,  // Datos de la línea
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
borderColor: 'rgba(0, 255, 0, 1)',
            borderWidth: 1  // Ancho de la línea
            
        }, {
            label: 'StrassenNaiv',  // Etiqueta de la línea
            data: tiemposStrassenNaiv,  // Datos de la línea
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
borderColor: 'rgba(0, 0, 255, 1)',
            borderWidth: 1  // Ancho de la línea
            
        }, {
            label: 'StrassenWinograd',  // Etiqueta de la línea
            data: tiemposStrassenWinograd,  // Datos de la línea
            backgroundColor: 'rgba(255, 0, 255, 0.2)',
            borderColor: 'rgba(255, 0, 255, 1)',
            borderWidth: 1  // Ancho de la línea
            
        }, {
            label: 'III3Sequentialblock',  // Etiqueta de la línea
            data: tiemposIII3Sequentialblock,  // Datos de la línea
            backgroundColor: 'rgba(0, 255, 255, 0.2)',
            borderColor: 'rgba(0, 255, 255, 1)',
            borderWidth: 1  // Ancho de la línea
            
        }, {
            label: 'III4ParallelBlock',  // Etiqueta de la línea
            data: tiemposIII4ParallelBlock,  // Datos de la línea
            backgroundColor: 'rgba(128, 128, 128, 0.2)',
            borderColor: 'rgba(128, 128, 128, 1)',
            borderWidth: 1  // Ancho de la línea
            
        },{
            label: 'III5EnhancedParallelBlock',  // Etiqueta de la línea
            data: tiemposIII5EnhancedParallelBlock,  // Datos de la línea
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1  // Ancho de la línea
            
        }, {
            label: 'IV3SequentialBlock',  // Etiqueta de la línea
            data: tiemposIV3SequentialBlock,  // Datos de la línea
            backgroundColor: 'rgba(255, 192, 203, 0.2)',
            borderColor: 'rgba(255, 192, 203, 1)',
            borderWidth: 1  // Ancho de la línea
            
        }, {
            label: 'IV4ParallelBlock',  // Etiqueta de la línea
            data: tiemposIV4ParallelBlock,  // Datos de la línea
            backgroundColor: 'rgba(32, 178, 170, 0.2)',
            borderColor: 'rgba(32, 178, 170, 1)',
            borderWidth: 1  // Ancho de la línea
            
        }, {
            label: 'V3Sequentialblock',  // Etiqueta de la línea
            data: tiemposV3Sequentialblock,  // Datos de la línea
            backgroundColor: 'rgba(165, 42, 42, 0.2)',
            borderColor: 'rgba(165, 42, 42, 1)',
            borderWidth: 1  // Ancho de la línea
            
        }, {
            label: 'V4ParallelBlock',  // Etiqueta de la línea
            data: tiemposV4ParallelBlock,  // Datos de la línea
            backgroundColor: 'rgba(255, 99, 132, 0.2)', 
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1  // Ancho de la línea
            
        }
    
    ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true  // Escala del eje Y comienza en 0
                }
            }]
        }
    }
});
