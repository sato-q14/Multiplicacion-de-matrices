onmessage = e => {
    if (e.data.type === 'init') {
      let blockSize = e.data.blockSize;
      let matriz1 = e.data.matriz1;
      let matriz2 = e.data.matriz2;
      let resultado = e.data.resultado;
      let startRow = e.data.startRow;
      let numRows = e.data.numRows;
      for (let i = startRow; i < startRow + numRows; i += blockSize) {
        for (let j = 0; j < matriz2[0].length; j += blockSize) {
          for (let k = 0; k < matriz1[0].length; k += blockSize) {
            // Multiplicar bloques de la matriz
            for (let i2 = i; i2 < Math.min(i + blockSize, startRow + numRows); i2++) {
              for (let j2 = j; j2 < Math.min(j + blockSize, matriz2[0].length); j2++) {
                let suma = 0;
                for (let k2 = k; k2 < Math.min(k + blockSize, matriz1[0].length); k2++) {
                  suma += matriz1[i2][k2] * matriz2[k2][j2];
                }
                resultado[i2][j2] += suma;;
                }
            }
        }
    }
}
}
}
