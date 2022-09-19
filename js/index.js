const matrixGrid = document.querySelector(".matrix");
const rangeRows = document.querySelector(".range-rows");
const rangeRowsLabel = document.querySelector("label[for='range-rows']");
const rangeCols = document.querySelector(".range-cols");
const rangeColsLabel = document.querySelector("label[for='range-cols']");

[rangeCols, rangeRows].forEach(e => e.addEventListener("input", refreshMatrix));


function getMatrix(cols, rows) {
    function getLine(cols) {
        const firstHalf = Array.from({length: Math.ceil(cols / 2)}, () => Math.round(Math.random()));
        const secondHalf = firstHalf.slice(0, Math.floor(cols / 2)).reverse();
        return firstHalf.concat(secondHalf);
    }
    return Array.from({length: rows}, () => getLine(cols)).flat(1);
}

function createCells() {
    const n = rangeRows.value * rangeCols.value;
    for (let i = 0; i < n; i++) {
        const cell = document.createElement("div");
        cell.classList.add("matrix-cell");
        matrixGrid.appendChild(cell);
    }
}

function removeCells() {
    matrixGrid.innerHTML = null;
}

function init() {
    getRanges();
    createCells();
    const matrix = getMatrix(rangeCols.value, rangeRows.value);
    const matrixCells = document.querySelectorAll(".matrix-cell");
    matrix.forEach((e, i) => e ? matrixCells[i].classList.add("colored") : void(0));
}

function getRanges() {
    rangeRowsLabel.textContent = `строк: ${rangeRows.value}`;
    rangeColsLabel.textContent = `столбцов: ${rangeCols.value}`;
}

function changeGrid() {
    matrixGrid.style.gridTemplateColumns = `repeat(${rangeCols.value}, 1fr)`;
    matrixGrid.style.gridTemplateRows = `repeat(${rangeRows.value}, 1fr)`;
}

function refreshMatrix() {
    removeCells();
    changeGrid();
    init();
}

window.onload = init();