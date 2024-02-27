const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let field;
let freeSpace = 9;
let currentSymbol = CROSS;
let determinedWinner = EMPTY;

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
    initField(3);
}

function initField(x) {
    field = []
    for (let i = 0; i < x; i++) {
        let subArray = [];
        for (let j = 0; j < x; j++) {
            subArray.push(EMPTY);
        }
        field.push(subArray);
    }
}

function flipCurrentSymbol() {
    if (currentSymbol === CROSS) {
        currentSymbol = ZERO;
    } else if (currentSymbol === ZERO) {
        currentSymbol = CROSS;
    }
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (field[row][col] !== EMPTY || determinedWinner !== EMPTY) {
        return;
    }


    field[row][col] = currentSymbol;
    renderSymbolInCell(currentSymbol, row, col);
    let possibleWinner = checkWinner();
    if (possibleWinner === currentSymbol) {
        alert(`${currentSymbol === CROSS ? "Крестики" : "Нолики"} выиграли!`);
        determinedWinner = possibleWinner;
        return;
    }
    freeSpace -= 1;

    if (freeSpace === 0) {
        alert("Ничья!");
        return;
    }

    flipCurrentSymbol();
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    initField(3);
    renderGrid(3);
    freeSpace = 9;
    determinedWinner = EMPTY;
    currentSymbol = CROSS;
    console.log('reset!');
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (field[i][0] === field[i][1] && field[i][1] === field[i][2]) {
            return field[i][0];
        }
        if (field[0][i] === field[1][i] && field[1][i] === field[2][i]) {
            return field[0][i];
        }
    }
    if (field[0][0] === field[1][1] && field[1][1] === field[2][2]) {
        return field[0][0];
    }
    if (field[2][0] === field[1][1] && field[1][1] === field[0][2]) {
        return field[2][0];
    }
    return EMPTY;
}

function colorIfWin (symb, fieldSize) {
    for (let i = 0; i < fieldSize; i++) {
        for (let j = 0; j < fieldSize; j++) {
            if (field[i][j] === symb) {
                renderSymbolInCell(EMPTY, i, j, '#f00');
            }
        }
    }
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
