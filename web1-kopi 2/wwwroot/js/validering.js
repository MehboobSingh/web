
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

    }
}



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
    HentalleBilleter();

    var currentFocus;
 
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
     
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
      
        this.parentNode.appendChild(a);
     
        for (i = 0; i < arr.length; i++) {
         
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
    
                b = document.createElement("DIV");
              
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
              
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                
                b.addEventListener("click", function (e) {
                   
                    inp.value = this.getElementsByTagName("input")[0].value;
                   
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
 
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
         
            currentFocus++;
          
            addActive(x);
        } else if (e.keyCode == 38) { 
            currentFocus--;
       
            addActive(x);
        } else if (e.keyCode == 13) {
   
            e.preventDefault();
            if (currentFocus > -1) {
              
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
   
        if (!x) return false;
  
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
      
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
       
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("fraInput"), ruter);
autocomplete(document.getElementById("tilInput"), ruter);




function validerFraogTiltur(fra) {

   

    let gyldigInput = fra.charAt(0).toUpperCase() + fra.slice(1);
    var backendOK = ruter.find(() => gyldigInput);

    let regexp = /^[a-zA-ZæøåÆØÅ\.\ \-]{2,20}$/;
    let ok = regexp.test(fra);
    if (backendOK == null) {
        $("feilFra").html("Vi har ingen rute fra denne byen");
        return false;
    }else if (!ok) {


        $("#feilFra").html("Tur start må bestå av 2 til 20 bokstaver og være gyldig rute");


        return false;

    } else {
        document.getElementById("feilFra").innerHTML = "";
        document.getElementById("til").style.display = "initial";
        return true;
    }

}

function validerFra(fra) {
    const regexp = /^[a-zA-ZæøåÆØÅ\.\ \-]{2,20}$/;
    const ok = regexp.test(fra);

    if (!ok) {
        $("#feilFra").html("Fra må bestå av 2 til 20 bokstaver");
        return false;
    }
    else {
        $("#feilFra").html("");
        return true;
    }
}

function validerTil(til) {

    let gyldigTilInput = til.charAt(0).toUpperCase() + til.slice(1);
    var backendTilOK = ruter.find(() => gyldigTilInput);
    const regexp = /^[a-zA-ZæøåÆØÅ\.\ \-]{2,20}$/;
    const ok = regexp.test(til);
    if (backendTilOK == null) {
        document.getElementById("feilTil").innerHTML = "Vi har ingen rute fra denne byen";
        return false;
    } else if (!ok) {
        $("#feilTil").html("Til må bestå av 2 til 20 bokstaver");
        return false;
    }
    else {
        $("#feilTil").html("");
        return true;
    }
}

function validerTurTil(til) {
    
       const regexp = /^[a-zA-ZæøåÆØÅ\.\ \-]{2,20}$/;
        let turTilVerdi = document.getElementById("tilInput").value;
        let gyldigTilInput = turTilVerdi.charAt(0).toUpperCase() + turTilVerdi.slice(1);
        var ok = regexp.test(ruter.find(() => gyldigTilInput));
    if (!ok) {
        $("#feilTil").html("Tur start  må velges");
        return false;
    } else {
        document.getElementById("feilTil").innerHTML = "";
        document.getElementById("datoType").style.display = "initial";

        return true;
    }
}



function validerDato(dateretur) {

    var regexp = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    var ok = regexp.test(dateretur);
    if (!ok) {
      
        $("#feilDateRetur").html("dato er ikke gyldig");
        return false;
    } else {
        $("#feilDateRetur").html("");
        return true;
    }

}

function validerType(type) {

    var regexp = /^[a-zA-ZÆØÅæøå]{2,30}$/ ;
    var ok = regexp.test(type);
    if (!ok) {
        $("#feilType").html("ikke gyldig");
        return false;
    } else {
        $("#feilType").html("");
        return true;
    }

}


function validerPrice(price) {

   var regexp = /^[a-zA-ZÆØÅæøå]{2,30}$/;
    var ok = regexp.test(price);
    if (!ok) {
        $("#feilPrice").html("ikke gyldig");
        return false;
    } else {
        $("#feilPrice").html("");
        return true;
    }

}





