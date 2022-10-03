const matrixGrid = document.querySelector(".matrix");
const avatar = document.querySelector(".avatar");
const rangeRows = document.querySelector(".range-rows");
const rangeRowsLabel = document.querySelector("label[for='range-rows']");
const rangeCols = document.querySelector(".range-cols");
const rangeColsLabel = document.querySelector("label[for='range-cols']");
const colorMain = document.querySelector(".color-main");
const colorBackA = document.querySelector(".color-back-a");
const colorBackB = document.querySelector(".color-back-b");

[rangeCols, rangeRows].forEach(e => e.addEventListener("input", refreshMatrix));
[colorMain, colorBackA, colorBackB].forEach(e => e.addEventListener("input", setColor));

function getMatrix(cols, rows) {
    function getLine(cols) {
        const firstHalf = Array.from({ length: Math.ceil(cols / 2) }, () => Math.round(Math.random()));
        const secondHalf = firstHalf.slice(0, Math.floor(cols / 2)).reverse();
        return firstHalf.concat(secondHalf);
    }
    return Array.from({ length: rows }, () => getLine(cols)).flat(1);
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
    matrix.forEach((e, i) => e ? matrixCells[i].classList.add("colored") : void (0));
    setColor();
}

function getRanges() {
    rangeRowsLabel.textContent = `${rangeRows.value}`;
    rangeColsLabel.textContent = `${rangeCols.value}`;
}

function changeGrid() {
    matrixGrid.style.gridTemplateColumns = `repeat(${rangeCols.value}, 1fr)`;
    matrixGrid.style.gridTemplateRows = `repeat(${rangeRows.value}, 1fr)`;
}

function setColor() {
    const coloreds = document.querySelectorAll(".colored");
    coloreds.forEach(e => e.style.setProperty("background-color", `${colorMain.value}`));
    avatar.style.setProperty("background-image", `linear-gradient(to bottom, ${colorBackA.value}, ${colorBackB.value})`);
}

function refreshMatrix() {
    removeCells();
    changeGrid();
    init();
    setColor();
}

const saveButton = document.querySelector(".save-button");
saveButton.addEventListener("click", convert);

function convert() {
    const avatar = document.querySelector(".avatar");
    html2canvas(avatar).then(canvas => saveImage(canvas));
}

function saveImage(canvas) {
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), "avatar.png");
    }
    else {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = canvas.toDataURL("image/png");
        a.download = "avatar.png";
        a.click();
        a.remove();
    }
}

window.onload = init();

//2520