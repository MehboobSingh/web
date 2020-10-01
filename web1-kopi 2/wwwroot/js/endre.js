$(function () {
     const id = window.location.search.substring(1);
    const url = "Home/hentEnBillet?" + SId;
    $.get(url, function (strekning) {
        $("#SId").val(strekning.SId); 
        $("#fra").val(strekning.fra);
        $("#til").val(strekning.til);
        $("#datefra").val(strekning.datefra);
        $("#dateretur").val(strekning.dateretur);
        $("#price").val(strekning.price);
        $("#type").val(strekning.type);



       

       
    }); 
});

function validerOgEndreStrekning() {
    const fraOK = validerFra($("#fra").val());
    const tilOK = validerTil($("#til").val());
    const datefraOK = validerDateFra($("#datefra").val());
    const datereturOK = validerDateRetur($("#dateretur").val());
    const typeOK = validerType($("#type").val());
    const priceOK = valider($("#price").val());



    if (fraOK && tilOK && datefraOK && datereturOK && typeOK && priceOK) {
        endreStrekning();
    }
}

function endreStrekning() {
    const strekning = {
        SId: $("#SId").val(), 
        fra: $("#fra").val(),
        til: $("#til").val(),
        datefra: $("#datefra").val(),
        dateretur: $("#dateretur").val(),
        type: $("#type").val(),
        price: $("#price").val(),



    };
    $.post("Home/Endre", strekning, function () {
        window.location.href = 'index.html';
    })
    .fail(function () {
        $("#feil").html("Feil på server - prøv igjen senere");
    });
}