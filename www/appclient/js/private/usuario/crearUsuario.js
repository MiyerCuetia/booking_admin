function cargarTipoIdentificacion() {
    httpConnect("http://192.168.137.1:88/tipid", null, "GET", function (r) {
        for (var i = 0; i < r.data.length; i++) {
            var o = r.data[i];
            var tmpOpt = "<option value='" + o.tidId + "'>" + o.tipNombre + "</option>";
            $("#fkTipoIdentificacion").append(tmpOpt);
        }
    }, function (r) {

        console.log("Error de peticion");
        console.log(r);
    });
}

function cargarGenero() {
    var genero = ['M', 'F', 'O'];
    for (var i = 0; i < genero.length; i++) {
        var tmpOpt = "<option value='" + genero[i] + "'>" + genero[i] + "</option>";
        $("#usuGenero").append(tmpOpt);
    }

}
//Validaciones de los formularios
function deleteNecesario() {
    $(".necesario").change(function () {
        $(this).removeClass("error");
    });
}

$(function () {
    cargarGenero();
    cargarTipoIdentificacion();
    deleteNecesario();
    
    $("#btnCrearUsuario").click(function () {
        var correcto = true;
        $(".necesario").each(function (i) {
            if ($(this).val() === "" || !$(this).val()) {
                $(this).addClass("error");
                correcto = false;
            } else {
                $(this).removeClass("error");
            }
        });
 
        var usuario = new Object();
        usuario.usuIdentificacion = $("#usuIdentificacion").val();
        usuario.usuNombres = $("#usuNombres").val();       
        usuario.usuGenero = $("#usuGenero").val();       
        usuario.usuCorreo = $("#usuCorreo").val();
        usuario.usuTelefono = $("#usuTelefono").val();
        usuario.usuAvatar = $("#usuAvatar").val();
        
        usuario.fkTipoIdentificacion = {
            tidId: $("#fkTipoIdentificacion").val()
        };

        var jusuario = JSON.stringify(usuario);

        httpConnect("http://192.168.137.1:88/usuario", jusuario, "POST", function (r) {
            M.toast({html: r.message}, 2000);            
            $("button[type=reset]").click();
        });

        return false;
    });
});