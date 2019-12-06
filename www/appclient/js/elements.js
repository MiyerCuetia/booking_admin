//Se agrego el date de jquery ui para facilitar formato
// el datepicker de Materialize no funcion el formato
// se descargo jquery ui y jquery css
$(function(){
    $(".datepickerui").datepicker({
        dateFormat: "yy-mm-dd"        
    });
});