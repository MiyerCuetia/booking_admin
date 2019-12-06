
//Validaciones de los formularios
function deleteNecesario() {
    $(".necesario").change(function () {
        $(this).removeClass("error");
    });
}
$(function () {
    deleteNecesario();
    //Asiganacion del evento submit para el formulario de crear libro
    $("#btnCrearTipoAlojamiento").click(function () {
        $(".necesario").each(function (i) {
            var correcto = true;
            if ($(this).val() === "" || !$(this).val()) {
                $(this).addClass("error");
                correcto = false;
            } else {
                $(this).removeClass("error");
                var entidad = new Object();
                entidad.talNombre = $("#talNombre").val();

                var jentidad = JSON.stringify(entidad);

                httpConnect("http://192.168.0.5:88/tipoAlojamiento", jentidad, "POST", function (r) {
                    M.toast({html: r.message}, 2000);
                    $("button[type=reset]").click();
                });
            }
        });

        return false;
    });
});