
function cargarAlojamiento() {
    httpConnect("http://192.168.137.1:88/alojamiento", null, "GET", function (r) {
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

function cargarCliente() {
    httpConnect("http://192.168.137.1:88/usuario", null, "GET", function (r) {
        for (var i = 0; i < r.data.length; i++) {
            var o = r.data[i];
            var tmpOpt = "<option value='" + o.usuId + "'>" + o.usuNombres + "</option>";
            $("#fkCliente").append(tmpOpt);
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
    cargarAlojamiento();    
    cargarCliente();
 
    //Asiganacion del evento submit para el formulario de crear libro
    $("#btnCrearReserva").click(function () {
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
        
        entidad.resFechaRegistro = $("#resFechaRegistro").val();
        entidad.resFechaLlegada = $("#resFechaLlegada").val();
        entidad.resFechaSalida = $("#resFechaSalida").val();
        entidad.resEstado = $("#estadoReservado").val();
        entidad.resPago = $("#resPago").val();
        entidad.fkAlojamiento = {
            aloId: $("#fkAlojamiento").val()
        };
        entidad.fkCliente = {
            usuId: $("#fkCliente").val()
        };

        var jentidad = JSON.stringify(entidad);

        httpConnect("http://192.168.137.1:88/reserva", jentidad, "POST", function (r) {
            M.toast({html: r.message}, 2000);
            $("button[type=reset]").click();
        });

        return false;
    });
});