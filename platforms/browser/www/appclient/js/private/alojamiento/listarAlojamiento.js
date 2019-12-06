function detalle(target){
    var id = $(target).data("id");
    window.location.replace("?p=alojamiento/detalleAlojamiento&id="+id);
}

function eliminar(target) {
    var id = $(target).data("id");
    httpConnect("http://192.168.0.9:88/alojamiento/" + id, null, "DELETE",
            function (r) {
                alert(r.message);
                cargarDatos();
            });
}

function cargarDatos() {
    httpConnect("http://192.168.0.9:88/alojamiento", null, "GET", function (r) {
        var html = "";
        for (var i = 0; i < r.data.length; i++) {
            var alojamiento = r.data[i];
            html += "<tr>";
            html += "<td>" + alojamiento.aloCodigo + "</td>";
            html += "<td>" + alojamiento.aloCapacidad + "</td>";
            html += "<td>" + alojamiento.aloPrecio + "</td>";
            html += "<td>" + alojamiento.aloDescripcion + "</td>";
            html += "<td>" + alojamiento.fkLugar.lugNombre + "</td>";
            html += "<td>" + alojamiento.fkTipoAlojamiento.talNombre + "</td>";            
            html += "<td>";
            html += "<div data-id='" + alojamiento.aloId + "' class='material-icons delete' style='color:red'>delete</div>";
            html += "<div data-id='" + alojamiento.aloId + "' class='material-icons edit' style='color:green'>edit</div>";
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