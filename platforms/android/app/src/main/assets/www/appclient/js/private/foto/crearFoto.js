
function cargarLugar() {    
    httpConnect("http://192.168.0.5:88/lugar", null, "GET", function (r) {
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

function cargarAlojamiento() {
    httpConnect("http://192.168.0.5:88/alojamiento", null, "GET", function (r) {
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
    cargarLugar();
    cargarAlojamiento();
    deleteNecesario();

    $("#btnCrearFoto").click(function () {
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
        entity.fotRuta = $("#fotRuta").val();
        entity.fotLabel = $("#fotLabel").val();
        entity.fotDescripcion = $("#fotDescripcion").val();        

        entity.fkLugar = {
            "lugId": $("#fkLugar").val()
        };
        entity.fkAlojamiento = {
            "aloId": $("#fkAlojamiento").val()
        };

        var jentidad = JSON.stringify(entity);

        httpConnect("http://192.168.0.5:88/foto", jentidad, "POST", function (r) {
            M.toast({html: r.message}, 2000);
            $("button[type=reset]").click();
        });
        return false;
        
    });

});