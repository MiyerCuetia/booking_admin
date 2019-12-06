function detalle(target){
    var id = $(target).data("id");
    window.location.replace("?p=tipoLugar/detalleTipoLugar&id="+id);
}

function eliminar(target) {
    var id = $(target).data("id");
    httpConnect("http://192.168.137.1:88/tipolugar/" + id, null, "DELETE",
            function (r) {
                alert(r.message);
                load();                
            });
}

function cargarDatos() {
    httpConnect("http://192.168.137.1:88/tipolugar", null, "GET", function (r) {
        var html = "";
        for (var i = 0; i < r.data.length; i++) {
            var tipolugar = r.data[i];
            html += "<tr>";
            html += "<td>" + tipolugar.tluNombre + "</td>";
            html += "<td>";
            html += "<div data-id='" + tipolugar.tluId + "' class='material-icons delete' style='color:red'>delete</div>";
            html += "<div data-id='" + tipolugar.tluId + "' class='material-icons edit' style='color:green'>edit</div>";
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

