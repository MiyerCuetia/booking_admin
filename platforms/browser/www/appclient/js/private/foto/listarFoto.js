function detalle(target){
    var id = $(target).data("id");
    window.location.replace("?p=foto/detalleFoto&id="+id);
}

function eliminar(target) {
    var id = $(target).data("id");
    httpConnect("http://192.168.0.5:88/foto/" + id, null, "DELETE",
            function (r) {
                alert(r.message);
                cargarDatos();
            });
}

function cargarDatos() {
    httpConnect("http://192.168.0.5:88/foto", null, "GET", function (r) {
        var html = "";
        for (var i = 0; i < r.data.length; i++) {
            var foto = r.data[i];
            html += "<tr>";
            html += "<td>" + foto.fotRuta + "</td>";
            html += "<td>" + foto.fotLabel + "</td>";
            html += "<td>" + foto.fotDescripcion + "</td>";
            html += "<td>" + foto.fkLugar.lugNombre + "</td>";
            //html += "<td>" + foto.fkAlojamiento.aloCodigo + "</td>";            
            html += "<td>";
            html += "<div data-id='" + foto.fotId + "' class='material-icons delete' style='color:red'>delete</div>";
            html += "<div data-id='" + foto.fotId + "' class='material-icons edit' style='color:green'>edit</div>";
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