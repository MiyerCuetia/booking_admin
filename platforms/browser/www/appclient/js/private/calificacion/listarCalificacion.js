function detalle(target){
    var id = $(target).data("id");
    window.location.replace("?p=calificacion/detalleCalificacion&id="+id);
}

function eliminar(target) {
    var id = $(target).data("id");
    httpConnect("http://10.75.199.57:88/calificacion/" + id, null, "DELETE",
            function (r) {
                alert(r.message);
                load();
            });
}

function cargarDatos() {
    httpConnect("http://10.75.199.57:88/calificacion", null, "GET", function (r) {
        var html = "";
        for (var i = 0; i < r.data.length; i++) {
            var calificacion = r.data[i];
            html += "<tr>";
            html += "<td>" + calificacion.calValoracion + "</td>";
            html += "<td>" + calificacion.calComentario + "</td>";
            html += "<td>" + calificacion.fkAlojamiento.aloCodigo + "</td>";
            html += "<td>" + calificacion.fkUsuario.usuNombres + "</td>";
            html += "<td>";
            html += "<div data-id='" + calificacion.calId + "' class='material-icons delete' style='color:red'>delete</div>";
            html += "<div data-id='" + calificacion.calId + "' class='material-icons edit' style='color:green'>edit</div>";
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

