let isMouseDown = false;
let isRandomColor = false; 

document.body.onload = () => addElement(); // Se ejecuta al cargar la página

function addElement() {
    const inputNumber = document.getElementById("input");
    let valueUser = inputNumber.value.trim(); // Obtener el valor actual del input
    let size = valueUser ? valueUser * valueUser : 256;

    const divContainer = document.getElementById("divContainer");

    // Limpiar el contenedor antes de agregar nuevos elementos
    cleanSquare();

    for (let i = 0; i < size; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("square");

        if (!valueUser) {
            // newDiv.innerText = i + 1; // Solo numerar si es el caso por defecto
        } else {
            newDiv.style.height = `calc(100% / ${valueUser})`;
            newDiv.style.width = `calc(100% / ${valueUser})`;
        }

        divContainer.appendChild(newDiv);
        color(newDiv);
    }
}

document.addEventListener("mouseup", () => {
    isMouseDown = false; // Se desactiva el arrastre
});

function color(newDiv) {
    newDiv.addEventListener("mousedown", () => {
        isMouseDown = true;
        applyColor(newDiv); // Cambia el color al hacer clic
    });

    newDiv.addEventListener("mouseover", () => {
        if (isMouseDown) {
            applyColor(newDiv); // Cambia el color al arrastrar
        }
    });
}

document.getElementById("toggleRandom").addEventListener("click", () => {
    isRandomColor = !isRandomColor; // Alterna el estado
    const btn = document.getElementById("toggleRandom");
    btn.textContent = isRandomColor ? "Desactivar Colores Aleatorios" : "Activar Colores Aleatorios";
});

function applyColor(div) {
    div.style.backgroundColor = isRandomColor ? getRandomColor() : "blue"; // Usa color aleatorio si está activado
}

// Genera un color aleatorio en formato RGB
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}



function cleanSquare() {
    const divContainer = document.getElementById("divContainer");
    while (divContainer.firstChild) {
        divContainer.removeChild(divContainer.firstChild);
    }
}

// Evento para actualizar la cuadrícula cuando cambia el input
document.getElementById("input").addEventListener("input", addElement);
