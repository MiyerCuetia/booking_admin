
function cargarDetalle() {
    var id = getParameterByName("id");
    httpConnect("http://192.168.0.5:88/foto/" + id, null, "GET", function (r) {
        if (r.status !== 200) {
            alert(r.message);
            window.location.replace("?p=foto/listarFoto");
        }           
        
        $("#fotRuta").val(r.data.fotRuta);
        $("#fotLabel").val(r.data.fotLabel);
        $("#fotDescripcion").val(r.data.fotDescripcion);        
       
        cargarLugar();
        cargarAlojamiento();           
        
        $("#id").val(id);

    }, function (e) {
        alert(e);
        window.location.replace("?p=foto/listarFoto");
    });
}

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
    deleteNecesario();
    cargarDetalle();
    
    $("#btnUpdateFoto").click(function () {
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

        var id = $("#id").val();
        httpConnect("http://192.168.0.5:88/foto/" + id, jentidad, "PUT", function (r) {
            M.toast({html: r.message}, 2000);
            $("button[type=reset]").click();
            window.location.replace("?p=foto/listarFoto");
        });
        return false;
    });
});