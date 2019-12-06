function detalle(target) {
    var id = $(target).data("id");
    window.location.replace("?p=reserva/detalleReserva&id=" + id);
}
function cargarDatos() {
    httpConnect("http://192.168.137.1:88/reserva", null, "GET", function (r) {

        for (var i = 0; i < r.data.length; i++) {

            var reserva = r.data[i];
            var html = "<li>\
                <div class='collapsible-header' style='display: inherit;'>\
                    <img style='width: 30px; height: auto; margin-right: 20px' src='appclient/assets/blogger.png'/>\
                    <b>" + reserva.fkAlojamiento.fkLugar.lugNombre + "</b> - Reservado: " + reserva.resFechaRegistro + " <br> <b>Reservado por: </b>" + reserva.fkCliente.usuNombres + "</div> <div class='collapsible-body card orange'><div class='row'><div class='card-content'> <span class='card-title white-text'>" + reserva.fkAlojamiento.fkLugar.lugNombre + " Title</span>\
                            <p class='white-text'>" + reserva.fkAlojamiento.fkLugar.lugDescripcion + "I am a very simple card. I am good at containing small bits of information.I am convenient because I require little markup to use effectively.</p>\
                        </div>\
                        <div data-id='" + reserva.resId + "' class='card-action orange darken-4 card-title'><a  href='#'>Editar - Confirmacion Reserva</a></div></div></div></li> ";

            $("#listaReserva").append(html);

        }
        $(".card-action").click(function () {
            detalle(this);
        });
    });
}

$(function () {
    cargarDatos();
    window.setTimeout(function () {
        M.AutoInit();
        $('.sidenav').sidenav();
        $(".dropdown-trigger").dropdown();
    }, 1000);
});
