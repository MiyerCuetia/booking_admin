
function cargarEstado() {

    var estado = [0,1,2];

    for (var i = 0; i < estado.length; i++) {
        var tmpOpt = "<option value='" + estado[i] + "'>" + estado[i] + "</option>";
        $("#rolEstado").append(tmpOpt);
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
function cargarRol() {

    httpConnect("http://192.168.137.1:88/rol", null, "GET", function (r) {
        for (var i = 0; i < r.data.length; i++) {
            var o = r.data[i];
            var tmpOpt = "<option value='" + o.rolId + "'>" + o.rolNombre + "</option>";
            $("#fkRol").append(tmpOpt);
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
    cargarEstado();
    cargarUsuario();
    cargarRol();
    deleteNecesario();
    $("#btnCrearRolUsuario").click(function () {
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
        
        entidad.rolEstado = $("#rolEstado").val();
                        
        entidad.fkUsuario={
            "usuId":$("#fkUsuario").val()
        };
        entidad.fkRol={
            "rolId":$("#fkRol").val()
        };
        
        var jentidad = JSON.stringify(entidad);

        httpConnect("http://192.168.137.1:88/rolUsuario", jentidad, "POST", function (r) {
            M.toast({html: r.message}, 2000);
            $("button[type=reset]").click();
        });

        return false;
    });
});