const cell = document.querySelector(".cell-block");

setTimeout(() => cell.style.height = `${500}px`, 200)

console.log(window.getComputedStyle(cell).getPropertyValue("height"))
console.log(document.cookie)

setTimeout(() => console.log(window.getComputedStyle(cell).getPropertyValue("height")), 2500)