function detalle(target){
    var id = $(target).data("id");
    window.location.replace("?p=rol/detalleRol&id="+id);
}

function eliminar(target) {
    var id = $(target).data("id");
    httpConnect("http://192.168.137.1:88/rol/" + id, null, "DELETE",
            function (r) {
                alert(r.message);
                load();
            });
}

function cargarDatos() {
    httpConnect("http://192.168.137.1:88/rol", null, "GET", function (r) {
        var html = "";
        for (var i = 0; i < r.data.length; i++) {
            var rol = r.data[i];
            html += "<tr>";
            html += "<td>" + rol.rolNombre + "</td>";
            html += "<td>";
            html += "<div data-id='" + rol.rolId + "' class='material-icons delete' style='color:red'>delete</div>";
            html += "<div data-id='" + rol.rolId + "' class='material-icons edit' style='color:green'>edit</div>";
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

