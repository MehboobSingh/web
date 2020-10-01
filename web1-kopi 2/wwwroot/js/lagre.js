

function validerOgLagreStrekning() {
    const fraOK = validerFra($("#fra").val());
    const tilOK = validerTil($("#til").val());
    const datefraOK = validerDateFra($("#datefra").val());
    const datereturOK = validerDateRetur($("#dateretur").val());
    //const priceOK = validerType($("#price").val());

    const typeOK = validerType($("#type").val());





   
    if (fraOK && tilOK && datefraOK && datereturOK && typeOK  ) {
        lagreStrekning();
    }
}

function lagreStrekning() {
    const strekning = {
        fra: $("#fra").val(),
        til: $("#til").val(),
        datefra: $("#datefra").val(),
        dateretur: $("#dateretur").val(),
        price: $("#price").val(),
        type: $("#type").val(),
        
    }
    const url = "Home/Lagre";
    $.post(url, strekning, function () {
        window.location.href = 'index.html';
    })
    .fail(function () {
        $("#feil").html("Feil på server - prøv igjen senere");
    });
};