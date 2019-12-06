function cargarDetalle() {
    var id = getParameterByName("id");
    httpConnect("http://10.75.199.57:88/usuario/" + id, null, "GET",function(r){
        if(r.status!==200){
            alert(r.message);
            window.location.replace("?p=usuario/listarUsuario");
        }
        
        $("#usuIdentificacion").val(r.data.usuIdentificacion);
        $("#usuNombres").val(r.data.usuNombres);
        cargarGenero();
        $("#usuCorreo").val(r.data.usuCorreo);
        $("#usuTelefono").val(r.data.usuTelefono);
        $("#usuAvatar").val(r.data.usuAvatar);
        cargarTipoIdentificacion();
        
        $("#id").val(id);
    },function(e){
        alert(e);
        window.location.replace("?p=usuario/listarUsuario");
    });
}

function cargarTipoIdentificacion() {
    httpConnect("http://10.75.199.57:88/tipid", null, "GET", function (r) {
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
    deleteNecesario();
    cargarDetalle();
    $("#btnUpdateUsuario").click(function(){
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

        var jentidad = JSON.stringify(usuario);
        var id = $("#id").val();
        
        httpConnect("http://10.75.199.57:88/usuario/"+id,jentidad,"PUT",function(r){
            alert(r.message+"-"+r.data.nombre);
            window.location.replace("?p=usuario/listarUsuario");
        });
        return false;
    });
});