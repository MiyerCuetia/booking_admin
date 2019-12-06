function detalle(target) {
    var id = $(target).data("id");
    window.location.replace("?p=reserva/detalleReserva&id=" + id);
}

function eliminar(target) {
    var id = $(target).data("id");
    httpConnect("http://192.168.137.1:88/reserva/" + id, null, "DELETE",
            function (r) {
                alert(r.message);
                cargarDatos();
            });
}


function cargarDatos() {
    httpConnect("http://192.168.137.1:88/reserva", null, "GET", function (r) {
        var html = "";
        for (var i = 0; i < r.data.length; i++) {
            var reserva = r.data[i];
            html += "<tr>";
            html += "<td>" + reserva.resFechaRegistro + "</td>";
            html += "<td>" + reserva.resFechaLlegada + "</td>";
            html += "<td>" + reserva.resFechaSalida + "</td>";
            html += "<td>" + reserva.resFechaChecking + "</td>";
            html += "<td>" + reserva.resFechaCheckout + "</td>";
            html += "<td>" + reserva.resEstado + "</td>";
            html += "<td>" + reserva.resPago + "</td>";
            html += "<td>" + reserva.fkCliente.usuNombres + "</td>";
            html += "<td>" + reserva.fkAlojamiento.aloCodigo + "</td>";
            /*fkUsuarioChecking*/
            html += "<td>" + reserva.fkCliente.usuNombres + "</td>";
            /*fkUsuarioCheckout*/
            html += "<td>" + reserva.fkCliente.usuNombres + "</td>";

            //html += "<td>" + reserva.fkUsuarioChecking.usuNombres + "</td>";
            //html += "<td>" + reserva.fkUsuarioCheckout.usuNombres + "</td>";

            html += "<td>";
            html += "<div data-id='" + reserva.resId + "' class='material-icons delete' style='color:red'>delete</div>";
            html += "<div data-id='" + reserva.resId + "' class='material-icons edit' style='color:green'>edit</div>";
            html += "</td>";
            html += "</tr>";
        }
        $("tbody").html(html);

        $(".delete").click(function () {
            if (confirm("Desea eliminar el recurso?")) {
                eliminar(this);
            }
        });
        $(".edit").click(function () {
            detalle(this);
        });

    });
}

$(function () {
    cargarDatos();
});