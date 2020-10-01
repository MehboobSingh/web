


const fra = document.getElementById("fra");
const fraInput = document.getElementById("fraInput")
const til = document.getElementById("til");
const datoType = document.getElementById("datoType");
const checkbox = document.getElementById('checkbox');
const checkout = document.getElementById('checkout-button');



function turTil() {

    if (fra !== null) {

        til.style.display = "initial";


    }
}


  function datoDisplay() {

        if (til !== null) {

            datoType.style.display = "initial";
        }
    }


function returDato() {
   

    if (checkbox.checked === true) {


        const div = document.getElementById("checkbox");
        const dato = document.createElement('input');
        dato.setAttribute("type", "date");
        dato.addEventListener('change', () => {
            div.appendChild(dato);
        })
       
    }
}
