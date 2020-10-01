

function validerOgLagreStrekning() {
    const fraOK = validerFra($("#fraInput").val());
    const tilOK = validerTil($("#tilInput").val());
    const datefraOK = validerDato($("#datepicker").val());
    const datereturOK = validerDato($("#datepicker2").val());
    //const priceOK = validerType($("#price").val());

    const typeOK = validerType($("#type").val());





   
    if (fraOK && tilOK && datefraOK && datereturOK && typeOK  ) {
        lagreStrekning();
    }
}

function lagreStrekning() {
    const strekning = {
        fra: $("#fraInput").val(),
        til: $("#tilInput").val(),
        datefra: $("#datepicker").val(),
        dateretur: $("#datepicker2").val(),
       // price: $("#price").val(),
        type: $("#type").val(),
        
    }
    const url = "Home/Lagre";
    $.post(url, strekning, function () {
        window.location.href = 'paymentCard.html';
    })
    .fail(function () {
        $("#feil").html("Feil på server - prøv igjen senere");
    });
};