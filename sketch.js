let cellSize = 5;

//guarda as matrizes
let matrix;
let matrixAux1 = [];

// Variavel para guardar a quantidade de celulas na vertical e horizontal
let tamX;
let tamY;

let gen = 0;

let geracoes = 0;
function setup() {
    frameRate();

    createCanvas(windowWidth, windowHeight);

    //Pega a quantidade do grid
    tamX = int(width/cellSize);
    tamY = int(height/cellSize);
    
    //matrix principal
    matrix = make2DArray(tamX,tamY);
    
    //preenchendo a matriz principal
    for (let i = 0; i < tamX; i++) {
        for (let j = 0; j < tamY; j++) {
            let num = int(random(1,10));
            if(num < 2){
                matrix[i][j] =1;
            }else{
                matrix[i][j] =0
            }
    
        }
    }
}


function draw() {
    background(0);
    
    drawMatrix(matrix);

    if (gen == 0){
        matrixAux1 = JSON.stringify(matrix);
        //console.log("copia da matrix original")
    }

     //cria a matrix para a proxima geração
     let proxMatrix = make2DArray(tamX,tamY);

    // Faz a analise e gera a proxima geração
    for (let x = 0; x < tamX; x++) { //para cada X
        for (let y = 0; y < tamY; y++) { // Para cada Y dentro de X
        let estado = matrix[x][y];
        // Count live neighbors!
        let vizinhos = countNeighbors(matrix, x, y);

        if (estado == 0 && vizinhos == 3) {
            proxMatrix[x][y] = 1;
        } else if (estado == 1 && (vizinhos < 2 || vizinhos > 3)) {
            proxMatrix[x][y] = 0;
        } else {
            proxMatrix[x][y] = estado;
        }

        }
    }

    if(gen == 1){
        //console.log("Verificar")
        //console.log(matrixAux1==JSON.stringify(proxMatrix))
        if(matrixAux1==JSON.stringify(proxMatrix)){
            textSize(16);
            fill(148, 255, 0)
            text("Gerações: "+geracoes,10,30)
            noLoop();
        }
    }

    //Depois da análise torna a matrix principal
    matrix = proxMatrix;
    gen ++;
    gen = gen%2
    geracoes ++;
}


function drawMatrix(matrix) {
   for (let x = 0; x < tamX; x++) {
    for (let y = 0; y < tamY; y++) {
      let px = x * cellSize;
      let py = y * cellSize;

      if (matrix[x][y] == 1) {
        stroke(0);
        /*=====*/
        let vizinhos = countNeighbors(matrix,x,y);
        if(vizinhos == 3 ){
            fill(224, 206, 44)
        }else if(vizinhos >=  1 && vizinhos <  3){
            fill(87, 180, 204)
        }else{
            fill(255);
        }
        /*=====*/
        rect(px, py, cellSize - 1, cellSize - 1);
      }
    }
  }
}

//pego do Dan
function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + tamX) % tamX;
        let row = (y + j + tamY) % tamY;
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;
}

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
}

