
function cargarDetalle() {
    var id = getParameterByName("id");
    httpConnect("http://192.168.137.1:88/tipoAlojamiento/" + id, null, "GET", function (r) {
        if (r.status !== 200) {
            alert(r.message);
            window.location.replace("?p=tipoAlojamiento/listarTipoAojamiento");
        }

        $("#talNombre").val(r.data.talNombre);
        $("#id").val(id);

    }, function (e) {
        alert(e);
        window.location.replace("?p=tipoAlojamiento/listarTipoAlojamiento");
    });
}
//Validaciones de los formularios
function deleteNecesario() {
    $(".necesario").change(function () {
        $(this).removeClass("error");
    });
}

$(function () {
    cargarDetalle();
    deleteNecesario();

    $("#btnUpdateTipoAlojamiento").click(function () {
        var correcto = true;
        $(".necesario").each(function (i) {
            if ($(this).val() === "" || !$(this).val()) {
                $(this).addClass("error");
                correcto = false;
            } else {
                $(this).removeClass("error");
                var entidad = new Object();
                entidad.talNombre = $("#talNombre").val();

                var jentidad = JSON.stringify(entidad);

                var id = $("#id").val();
                httpConnect("http://192.168.137.1:88/tipoAlojamiento/" + id, jentidad, "PUT", function (r) {
                    M.toast({html: r.message}, 2000);
                    $("button[type=reset]").click();
                    window.location.replace("?p=tipoAlojamiento/listarTipoAlojamiento");
                });
            }
        });

        return false;
    });
});
