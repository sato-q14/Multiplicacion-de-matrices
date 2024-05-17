// Obtener el elemento canvas donde se mostrará el diagrama
let miDiagrama = document.getElementById('miDiagrama').getContext('2d');

// Crear un arreglo con los promedios de ejecución de ambos algoritmos
let promedios = [
  { algoritmo: 'NaivOnArray', promedio: promedio_NaivOnArray },
  { algoritmo: 'NaivLoopUnrollingTwo', promedio: promedio_NaivLoopUnrollingTwo },
  { algoritmo: 'NaivLoopUnrollingFour', promedio: promedio_NaivLoopUnrollingFour },
  { algoritmo: 'WinogradOriginal', promedio: promedio_WinogradOriginal },
  { algoritmo: 'WinogradScaled', promedio: promedio_WinogradScaled },
  { algoritmo: 'StrassenNaiv', promedio: promedio_StrassenNaiv },
  { algoritmo: 'StrassenWinograd', promedio: promedio_StrassenWinograd },
  { algoritmo: 'III3Sequentialblock', promedio: promedio_III3Sequentialblock },
  { algoritmo: 'III4ParallelBlock ', promedio: promedio_III4ParallelBlock },
  { algoritmo: 'III5EnhancedParallelBlock', promedio: promedio_5Paralelo },
  { algoritmo: 'IV3SequentialBlock ', promedio: promedio_IV3SequentialBlock },
  { algoritmo: 'IV4ParallelBlock ', promedio: promedio_IV4ParallelBlock },
  { algoritmo: 'V3Sequentialblock ', promedio: promedio_V3Sequentialblock },
  { algoritmo: 'V4ParallelBloc ', promedio: promedio_V4ParallelBlock }
];

// Crear un arreglo con los nombres de los algoritmos
let nombres = promedios.map(objeto => objeto.algoritmo);

// Crear un arreglo con los promedios de ejecución
let valores = promedios.map(objeto => objeto.promedio);

// Crear el diagrama
let diagrama = new Chart(miDiagrama, {
  type: 'bar',
  data: {
    labels: nombres,
    datasets: [{
      label: 'Promedio de ejecución (ms)',
      data: valores,
      backgroundColor: ['#FF6384', '#36A2EB'], // Colores de fondo de las barras
      borderColor: ['#FF6384', '#36A2EB'], // Colores del borde de las barras
      borderWidth: 1 // Ancho del borde de las barras
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true // Iniciar en cero en el eje y
        }
      }]
    }
  }
});
