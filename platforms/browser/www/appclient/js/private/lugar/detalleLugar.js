
function cargarTipoLugar() {

    httpConnect("http://192.168.0.5:88/tipolugar", null, "GET", function (r) {
        for (var i = 0; i < r.data.length; i++) {
            var o = r.data[i];
            var tmpOpt = "<option value='" + o.tluId + "'>" + o.tluNombre + "</option>";
            $("#fkTipoLugar").append(tmpOpt);
        }
    }, function (r) {

        console.log("Error de peticion");
        console.log(r);
    });
}
function cargarMunicipio() {

    httpConnect("http://192.168.0.5:88/Municipio", null, "GET", function (r) {
        for (var i = 0; i < r.data.length; i++) {
            var o = r.data[i];
            var tmpOpt = "<option value='" + o.munId + "'>" + o.munNombre + "</option>";
            $("#fkMunicipio").append(tmpOpt);
        }
    }, function (r) {

        console.log("Error de peticion");
        console.log(r);
    });
}

function cargarDetalle() {
    var id = getParameterByName("id");
    httpConnect("http://192.168.0.5:88/lugar/" + id, null, "GET", function (r) {
        if (r.status !== 200) {
            alert(r.message);
            window.location.replace("?p=lugar/listarLugar");
        }

        $("#lugNombre").val(r.data.lugNombre);
        $("#lugDireccion").val(r.data.lugDireccion);
        $("#lugTelefono").val(r.data.lugTelefono);
        $("#lugCorreo").val(r.data.lugCorreo);
        $("#lugLatitud").val(r.data.lugLatitud);
        $("#lugLongitud").val(r.data.lugLongitud);
        $("#lugDescripcion").val(r.data.lugDescripcion);

        cargarTipoLugar();
        cargarMunicipio();

        $("#id").val(id);

    }, function (e) {
        alert(e);
        window.location.replace("?p=lugar/listarLugar");
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

    $("#btnUpdateLugar").click(function () {
        var correcto = true;
        $(".necesario").each(function (i) {
            if ($(this).val() === "" || !$(this).val()) {
                $(this).addClass("error");
                correcto = false;
            } else {
                $(this).removeClass("error");
            }            
        });
        var entidadlugar = new Object();
            entidadlugar.lugNombre = $("#lugNombre").val();
            entidadlugar.lugDireccion = $("#lugDireccion").val();
            entidadlugar.lugTelefono = $("#lugTelefono").val();
            entidadlugar.lugCorreo = $("#lugCorreo").val();
            entidadlugar.lugLatitud = $("#lugLatitud").val();
            entidadlugar.lugLongitud = $("#lugLongitud").val();
            entidadlugar.lugDescripcion = $("#lugDescripcion").val();

            entidadlugar.fkTipoLugar = {
                "tluId": $("#fkTipoLugar").val()
            };
            entidadlugar.fkMunicipio = {
                "munId": $("#fkMunicipio").val()
            };

            var jentidad = JSON.stringify(entidadlugar);

            var id = $("#id").val();
            httpConnect("http://192.168.0.5:88/lugar/" + id, jentidad, "PUT", function (r) {
                M.toast({html: r.message}, 2000);
                $("button[type=reset]").click();
                window.location.replace("?p=lugar/listarLugar");
            });

        return false;
    });
});