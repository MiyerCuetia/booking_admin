
function cargarDetalle() {
    var id = getParameterByName("id");
    httpConnect("http://10.75.199.57:88/rol/" + id, null, "GET", function (r) {
        if (r.status !== 200) {
            alert(r.message);
            window.location.replace("?p=rol/listarRol");
        }

        $("#rolNombre").val(r.data.rolNombre);

        $("#id").val(id);

    }, function (e) {
        alert(e);
        window.location.replace("?p=rol/listarRol");
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

    $("#btnUpdateRol").click(function () {
        var correcto = true;
        $(".necesario").each(function (i) {
            if ($(this).val() === "" || !$(this).val()) {
                $(this).addClass("error");
                correcto = false;
            } else {
                $(this).removeClass("error");
                var entidad = new Object();
                entidad.rolNombre = $("#rolNombre").val();

                var jentidad = JSON.stringify(entidad);

                var id = $("#id").val();
                httpConnect("http://10.75.199.57:88/rol/" + id, jentidad, "PUT", function (r) {
                    M.toast({html: r.message}, 2000);
                    $("button[type=reset]").click();
                    window.location.replace("?p=rol/listarRol");
                });
            }
        });

        return false;
    });
});