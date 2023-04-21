// Obtener el elemento canvas donde se mostrará el diagrama
let grafico = document.getElementById('grafico').getContext('2d');

  // Crea los arrays para almacenar los tiempos de ejecución de cada algoritmo
  let tiempoEjecucion = [
    { algoritmo: 'NaivStandard', tiempo: suma_NaivStandard },
    { algoritmo: 'NaivOnArray', tiempo: suma_NaivOnArray },
    { algoritmo: 'NaivKahan', tiempo: suma_NaivKahan },
    { algoritmo: 'NaivLoopUnrollingTwo', tiempo: suma_NaivLoopUnrollingTwo },
    { algoritmo: 'NaivLoopUnrollingThree', tiempo: suma_NaivLoopUnrollingThree },
    { algoritmo: 'NaivLoopUnrollingFour', tiempo: suma_NaivLoopUnrollingFour },
    { algoritmo: 'WinogradOriginal', tiempo: suma_WinogradOriginal },
    { algoritmo: 'WinogradScaled', tiempo: suma_WinogradScaled },
    { algoritmo: 'StrassenNaiv', tiempo: suma_StrassenNaiv },
    { algoritmo: 'StrassenWinograd', tiempo: suma_StrassenWinograd },
    { algoritmo: 'III3Sequentialblock', tiempo: suma_III3Sequentialblock },
    { algoritmo: 'III4ParallelBlock ', tiempo: suma_III4ParallelBlock },
    { algoritmo: 'IV3SequentialBlock ', tiempo: suma_IV3SequentialBlock },
    { algoritmo: 'IV4ParallelBlock ', tiempo: suma_IV4ParallelBlock },
    { algoritmo: 'V3Sequentialblock ', tiempo: suma_V3Sequentialblock },
    { algoritmo: 'V4ParallelBloc ', tiempo: suma_V4ParallelBlock }
  ];


  tiempoEjecucion.sort((a, b) => a.tiempo - b.tiempo);




  // Crear un arreglo con los nombres de los algoritmos
  let nombresTiempos = tiempoEjecucion.map(objeto => objeto.algoritmo);

  // Crear un arreglo con los tiempos de ejecución
  let valoresTiempos = tiempoEjecucion.map(objeto => objeto.tiempo);

  // Crea un tercer array con la suma de los tiempos de ejecución en orden creciente
  //let tiemposSumados = [...tiemposKahan, ...tiemposLoopUnrollingFour].sort((a, b) => a - b);
  
  

  let diagramaTiempos = new Chart(grafico, {
    type: 'bar',
    data: {
      labels: nombresTiempos,
      datasets: [{
        label: 'Suma tiempos de ejecución en orden creciente',
        data: valoresTiempos,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  