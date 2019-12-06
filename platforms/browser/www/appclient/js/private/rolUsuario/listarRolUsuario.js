function detalle(target){
    var id = $(target).data("id");
    window.location.replace("?p=rolUsuario/detalleRolUsuario&id="+id);
}

function eliminar(target) {
    var id = $(target).data("id");
    httpConnect("http://10.75.199.57:88/rol/" + id, null, "DELETE",
            function (r) {
                alert(r.message);
                load();
            });
}

function cargarDatos() {
    httpConnect("http://10.75.199.57:88/rolUsuario", null, "GET", function (r) {
        var html = "";
        for (var i = 0; i < r.data.length; i++) {
            var rol = r.data[i];
            html += "<tr>";
            html += "<td>" + rol.rolEstado + "</td>";
            html += "<td>" + rol.fkUsuario.usuNombres + "</td>";
            html += "<td>" + rol.fkRol.rolNombre + "</td>";            
            html += "<td>";
            html += "<div data-id='" + rol.ruId + "' class='material-icons delete' style='color:red'>delete</div>";
            html += "<div data-id='" + rol.ruId + "' class='material-icons edit' style='color:green'>edit</div>";
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

