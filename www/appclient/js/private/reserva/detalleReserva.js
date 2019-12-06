function cargarDetalle() {
    var id = getParameterByName("id");
    httpConnect("http://192.168.137.1:88/reserva/" + id, null, "GET", function (r) {
        if (r.status !== 200) {
            alert(r.message);
            window.location.replace("?p=reserva/listarReserva");
        }

        $("#resFechaRegistro").val(r.data.resFechaRegistro);
        $("#resFechaLlegada").val(r.data.resFechaLlegada);
        $("#resFechaSalida").val(r.data.resFechaSalida);
        $("#resFechaChecking").val(r.data.resFechaChecking);
        $("#resFechaCheckout").val(r.data.resFechaCheckout);
        cargarEstado();
        $("#resPago").val(r.data.resPago);
        cargarAlojamiento();
        cargarCliente();
        $("#id").val(id);

    }, function (e) {
        alert(e);
        window.location.replace("?p=reserva/listarReserva");
    });
}

function cargarEstado() {
    var estado = [0,1,2,3];

    for (var i = 0; i < estado.length; i++) {
        var tmpOpt = "<option value='" + estado[i] + "'>" + estado[i] + "</option>";
        $("#resEstado").append(tmpOpt);
    }
}

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
            $("#fkUsuarioChecking").append(tmpOpt);
            $("#fkUsuarioCheckout").append(tmpOpt);
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
    
    $("#btnUpdateReserva").click(function () {
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
        console.log($("#resFechaRegistro").val());
        entidad.resFechaRegistro = $("#resFechaRegistro").val();
        entidad.resFechaLlegada = $("#resFechaLlegada").val();
        entidad.resFechaSalida = $("#resFechaSalida").val();
        entidad.resFechaChecking = $("#resFechaChecking").val();
        entidad.resFechaCheckout = $("#resFechaCheckout").val();
        entidad.resEstado = $("#resEstado").val();
        entidad.resPago = $("#resPago").val();
        entidad.fkAlojamiento = {
            aloId: $("#fkAlojamiento").val()
        };
        entidad.fkCliente = {
            usuId: $("#fkCliente").val()
        };
        entidad.fkUsuarioChecking = {
            usuId: $("#fkUsuarioChecking").val()
        };
        entidad.fkUsuarioCheckout = {
            usuId: $("#fkUsuarioCheckout").val()
        };

        var jentidad = JSON.stringify(entidad);

        var id = $("#id").val();
        httpConnect("http://192.168.137.1:88/reserva/" + id, jentidad, "PUT", function (r) {
            alert(r.message);
            window.location.replace("?p=reserva/listarReserva");
        });
        return false;
    });
});