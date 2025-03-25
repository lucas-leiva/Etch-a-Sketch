let isMouseDown = false;

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
    isMouseDown = false;
}); 

function color(newDiv) {   
    newDiv.addEventListener("mousedown", () => {
        newDiv.classList.toggle("square-change");
        isMouseDown = true;
    });

    newDiv.addEventListener("mouseover", () => {
        if (isMouseDown) {
            newDiv.style.backgroundColor = "blue";
        }
    });

}

function cleanSquare() {
    const divContainer = document.getElementById("divContainer");
    while (divContainer.firstChild) {
        divContainer.removeChild(divContainer.firstChild);
    }
}

// Evento para actualizar la cuadrícula cuando cambia el input
document.getElementById("input").addEventListener("input", addElement);
