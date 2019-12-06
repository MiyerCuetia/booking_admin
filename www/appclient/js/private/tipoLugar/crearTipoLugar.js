//Validaciones de los formularios
function deleteNecesario() {
    $(".necesario").change(function () {
        $(this).removeClass("error");
    });
}
$(function () {
    deleteNecesario();
    $("#btnCrearTipoLugar").click(function () {
        var correcto = true;
        $(".necesario").each(function (i) {
            if ($(this).val() === "" || !$(this).val()) {
                $(this).addClass("error");
                correcto = false;
            } else {
                $(this).removeClass("error");
                var entidad = new Object();
                entidad.tluNombre = $("#tluNombre").val();

                var jentidad = JSON.stringify(entidad);

                httpConnect("http://192.168.137.1:88/tipolugar", jentidad, "POST", function (r) {
                    M.toast({html: r.message}, 2000);
                    $("button[type=reset]").click();
                });
            }
        });

        return false;
    });
});