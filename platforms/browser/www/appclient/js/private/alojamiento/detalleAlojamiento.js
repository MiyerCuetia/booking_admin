
function cargarDetalle() {
    var id = getParameterByName("id");
    httpConnect("http://192.168.0.9:88/alojamiento/" + id, null, "GET", function (r) {
        if (r.status !== 200) {
            alert(r.message);
            window.location.replace("?p=alojamiento/listarAlojamiento");
        }

        $("#aloCodigo").val(r.data.aloCodigo);
        $("#aloCapacidad").val(r.data.aloCapacidad);
        $("#aloPrecio").val(r.data.aloPrecio);
        $("#aloDescripcion").val(r.data.aloDescripcion);      
        cargarLugar();
        cargarTipoAlojamiento();           
        
        $("#id").val(id);

    }, function (e) {
        alert(e);
        window.location.replace("?p=alojamiento/listarAlojamiento");
    });
}

function cargarLugar() {    
    httpConnect("http://192.168.0.9:88/lugar", null, "GET", function (r) {
        for (var i = 0; i < r.data.length; i++) {
            var o = r.data[i];
            var tmpOpt = "<option value='" + o.lugId + "'>" + o.lugNombre + "</option>";
            $("#fkLugar").append(tmpOpt);
        }
    }, function (r) {

        console.log("Error de peticion");
        console.log(r);
    });
}

function cargarTipoAlojamiento() {
    httpConnect("http://192.168.0.9:88/tipoAlojamiento", null, "GET", function (r) {
        for (var i = 0; i < r.data.length; i++) {
            var o = r.data[i];
            var tmpOpt = "<option value='" + o.talId + "'>" + o.talNombre + "</option>";
            $("#fkTipoAlojamiento").append(tmpOpt);
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
    deleteNecesario();
    cargarDetalle();
    
    $("#btnUpdateAlojamiento").click(function () {
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
        
        entidad.aloCodigo = $("#aloCodigo").val();
        entidad.aloCapacidad = $("#aloCapacidad").val();
        entidad.aloPrecio = $("#aloPrecio").val();
        entidad.aloDescripcion = $("#aloDescripcion").val();

        entidad.fkLugar = {
            "lugId": $("#fkLugar").val()
        };
        entidad.fkTipoAlojamiento = {
            "talId": $("#fkTipoAlojamiento").val()
        };

        var jentidad = JSON.stringify(entidad);

        var id = $("#id").val();
        httpConnect("http://10.75.199.21:88/alojamiento/" + id, jentidad, "PUT", function (r) {
            M.toast({html: r.message}, 2000);
            $("button[type=reset]").click();
            window.location.replace("?p=alojamiento/listarAlojamiento");
        });
        return false;
    });
});