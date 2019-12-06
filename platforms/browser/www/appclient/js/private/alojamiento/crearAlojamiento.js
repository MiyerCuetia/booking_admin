
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
    cargarLugar();
    cargarTipoAlojamiento();
    deleteNecesario();

    $("#btnCrearAlojamiento").click(function () {
        var correcto = true;
        $(".necesario").each(function (i) {
            if ($(this).val() === "" || !$(this).val()) {
                $(this).addClass("error");
                correcto = false;
            } else {
                $(this).removeClass("error");
            }                                  
        });
        var entity = new Object();
        entity.aloCodigo = $("#aloCodigo").val();
        entity.aloCapacidad = $("#aloCapacidad").val();
        entity.aloPrecio = $("#aloPrecio").val();
        entity.aloDescripcion = $("#aloDescripcion").val();

        entity.fkLugar = {
            "lugId": $("#fkLugar").val()
        };
        entity.fkTipoAlojamiento = {
            "talId": $("#fkTipoAlojamiento").val()
        };

        var jentidad = JSON.stringify(entity);

        httpConnect("http://192.168.0.9:88/alojamiento", jentidad, "POST", function (r) {
            M.toast({html: r.message}, 2000);
            $("button[type=reset]").click();
        });
        return false;
        
    });

});