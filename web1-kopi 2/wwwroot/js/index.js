﻿
var ruter = [];
function HentalleBilleter() {
    $.get("Home/HentalleStrekninger", function (strekninger) {
        hentEnStekning(strekninger);
    })
        .fail(function () {
            $("#feil").html("Feil på server - prøv igjen senere");
        });
}


function hentEnStekning(strekninger) {
    for (let strekning of strekninger) {
        ruter.push(strekning.fra);
        console.log(strekning.fra);

    }
}


/*function formaterStrekninger(strekninger) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Fra</th><th>Til</th><th>DateFra</th><th>DateRetur</th><th>Type</th><th>Price</th><th></th><th></th>" +
        "</tr>";
    for (let strekning of strekninger) {
        ut += "<tr>" +
            "<td>" + strekning.fra + "</td>" +
            "<td>" + strekning.til + "</td>" +
            "<td>" + strekning.datefra + "</td>" +
            "<td>" + strekning.dateretur + "</td>" +
            "<td>" + strekning.price + "</td>" +
            "<td>" + strekning.type + "</td>" +

            "<td> <a class='btn btn-primary' href='endre.html?id=" + strekning.id + "'>Endre</a></td>" +
            "<td> <button class='btn btn-danger' onclick='slettBillet(" + strekning.id + ")'>Slett</button></td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#billetene").html(ut);
}
*/
function slettBillet(SId) {
    const url = "Home/slettBillet?id=" + SId;

    $.get(url, function () {
        window.location.href = 'index.html';
    })
        .fail(function () {
            $("#feil").html("Feil på server - prøv igjen senere");
        });
}








function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}


autocomplete(document.getElementById("fraInput"), ruter);
autocomplete(document.getElementById("tilInput"), ruter);


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
