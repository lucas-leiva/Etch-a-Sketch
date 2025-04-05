// Estado global
let isMouseDown = false;
let isRandomColor = false;
let isDeleteActive = false;

// Elementos del DOM
const inputNumber = document.getElementById("input");
const label = document.getElementById("label");
const divContainer = document.getElementById("divContainer");
const deleteButton = document.getElementById("deleteONESquare");
const sketchContainer = document.getElementById("divContainer");
const toggleRandomBtn = document.getElementById("toggleRandom");

// Cargar al iniciar la página
document.body.onload = () => addElement();

// Evento para crear una nueva cuadrícula al cambiar el input
inputNumber.addEventListener("input", addElement);

// Evento para finalizar el arrastre al soltar el mouse
document.addEventListener("mouseup", () => {
    isMouseDown = false;
});

// Evento para alternar modo aleatorio
toggleRandomBtn.addEventListener("click", () => {
    isRandomColor = !isRandomColor;
    toggleRandomBtn.textContent = isRandomColor
        ? "UNRANDOMIZED COLOR"
        : "RANDOMIZED COLOR";
        toggleRandomBtn.classList.toggle("deleteActive");
});

// Evento para activar/desactivar el modo borrar
deleteButton.addEventListener("click", () => {
    isDeleteActive = !isDeleteActive;
    deleteButton.classList.toggle("deleteActive");
});

// Evento para borrar un cuadro al hacer clic (si el modo borrar está activo)
sketchContainer.addEventListener("click", (e) => {
    if (isDeleteActive && e.target !== sketchContainer) {
        e.target.style.backgroundColor = "#fcf4f1"; // Color blanco original
    }
});

// FUNCIONES -------------------------

function addElement() {
    let valueUser = inputNumber.value.trim();
    let size = valueUser ? valueUser * valueUser : 256;
    
    label.innerHTML = valueUser ? `${valueUser} x` : "16 x";

    // Limpiar contenido anterior
    cleanSquare();
    deleteSquare();

    if (size !== 0) {
        for (let i = 0; i < size; i++) {
            const newDiv = document.createElement("div");
            newDiv.classList.add("square");

            if (valueUser) {
                newDiv.style.height = `calc(100% / ${valueUser})`;
                newDiv.style.width = `calc(100% / ${valueUser})`;
            }

            divContainer.appendChild(newDiv);
            enableColoring(newDiv);
        }
    }
}

function enableColoring(div) {
    div.addEventListener("mousedown", () => {
        if (!isDeleteActive) {
            isMouseDown = true;
            applyColor(div);
        }
    });

    div.addEventListener("mouseover", () => {
        if (!isDeleteActive && isMouseDown) {
            applyColor(div);
        }
    });
}

function applyColor(div) {
    div.style.backgroundColor = isRandomColor ? getRandomColor() : "#212121";
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function cleanSquare() {
    const squares = document.getElementsByClassName("square");
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = "#fcf4f1";
    }
}

function deleteSquare() {
    while (divContainer.firstChild) {
        divContainer.removeChild(divContainer.firstChild);
    }
}
