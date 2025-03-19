document.body.onload = addElement;

function addElement(){
    for (let i = 0; i < 256; i++) {
            
        // create a new div element
        const newDiv = document.createElement("div");
        newDiv.classList.add("square");

        // add the newly created element and its content into the DOM
        const divContainer = document.getElementById("divContainer");
        divContainer.appendChild(newDiv);
        //document.body.insertBefore(newDiv, currentDiv);
    }
}