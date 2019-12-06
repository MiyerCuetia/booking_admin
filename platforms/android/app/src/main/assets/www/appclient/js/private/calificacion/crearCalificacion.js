
function cargarValoracion() {

    var valoracion = [1, 2, 3, 4, 5];


    for (var i = 0; i < valoracion.length; i++) {
        var tmpOpt = "<option value='" + valoracion[i] + "'>" + valoracion[i] + "</option>";
        $("#calValoracion").append(tmpOpt);
    }

}
function cargarUsuario() {

    httpConnect("http://192.168.137.1:88/usuario", null, "GET", function (r) {
        for (var i = 0; i < r.data.length; i++) {
            var o = r.data[i];
            var tmpOpt = "<option value='" + o.usuId + "'>" + o.usuNombres + "</option>";
            $("#fkUsuario").append(tmpOpt);
        }
    }, function (r) {

        console.log("Error de peticion");
        console.log(r);
    });
}
function cargarAlojamiento() {

    httpConnect("http://192.168.137.1:88/alojamiento", null, "GET", function (r) {
        for (var i = 0; i < r.data.length; i++) {
            var o = r.data[i];
            var tmpOpt = "<option value='" + o.aloId + "'>" + o.aloCodigo + "</option>";
            $("#fkAlojamiento").append(tmpOpt);
        }
    }, function (r) {

        console.log("Error de peticion");
        console.log(r);
    });
}
//Validaciones de los formularios
function deleteNecesario() {
    $(".necesario").change(function () {
        $(this).removeClass("error");
    });
}
$(function () {
    cargarValoracion();
    cargarUsuario();
    cargarAlojamiento();
    deleteNecesario();
    $("#btnCrearCalificacion").click(function () {
        var correcto = true;
        $(".necesario").each(function (i) {
            if ($(this).val() === "" || !$(this).val()) {
                $(this).addClass("error");
                correcto = false;
            } else {
                $(this).removeClass("error");
            }
        });
        
        var entidad = new Object();
        
        entidad.calValoracion = $("#calValoracion").val();
        entidad.calComentario = $("#calComentario").val();
        
        entidad.fkAlojamiento={
            "aloId": $("#fkAlojamiento").val()
        };
        
        entidad.fkUsuario={
            "usuId":$("#fkUsuario").val()
        };
        
        var jentidad = JSON.stringify(entidad);

        httpConnect("http://192.168.137.1:88/calificacion", jentidad, "POST", function (r) {
            M.toast({html: r.message}, 2000);
            $("button[type=reset]").click();
        });

        return false;
    });
});