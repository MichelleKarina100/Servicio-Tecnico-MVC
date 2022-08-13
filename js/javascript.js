var nuevoId;
var db=openDatabase("itemDB","1.0","itemDB",655535)
function limpiar() {
    document.getElementById("product").value="";
    document.getElementById("qty").value="";
    document.getElementById("perPrice").value="";

}

    $("#nuevo").click(function(){
        db.transaction(function(transaction){
                var sql="CREATE TABLE servicio"+
                "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
                "tipo varchar(100) NOT NULL,"+
                "piezas decimal(5,2) NOT NULL,"+
                "obra decimal(5,2) NOT NULL,"+
                "total decimal(5,2) NOT NULL)";
                transaction.executeSql(sql,undefined,function(){
                    alert("tabla creada");
                },function(transaction,err){
                    alert(err.message);

                })
        });
    });
    $("#listar").click(function(){
        cargarDatos();
   })
   $("#insertar").click(function(){
    var tipo=$("#product").val();
    var piesas=$("#qty").val();
    var obra=$("#perPrice").val();
    var total=piesas*obra;
    if(tipo.length!=0 &&piesas.length!=0 &&obra.length!=0 &&piesas>0 &&obra>0){
    db.transaction(function(transaction){
        var sql="INSERT INTO servicio(tipo,piezas,obra,total)VALUES(?,?,?,?)"
        transaction.executeSql(sql,[tipo,piesas,obra,total],function(){

        })
    },function(transaction,err){
            alert(err.message);

        } )
        limpiar();
        cargarDatos();
    }else{
       alert("Ingrese una cantidad");
       limpiar();
    }
})
function cargarDatos(){
    $("#listaProductos").children().remove();
    db.transaction(function(transaction){
        var sql="SELECT *FROM servicio ORDER BY id ASC";
        transaction.executeSql(sql,undefined,function(transaction,result){
            if(result.rows.length){
                $("#listaProductos").append('<tr style= "background: #f9d423; "><th>Factura Nº</th><th>Equipo</th><th>Costo</th><th>Mano de Obra</th><th>Total</th>');
                for(var i=0;i<result.rows.length;i++){
                    var row=result.rows.item(i);
                    var id=row.id;
                    var producto=row.tipo;
                    var cantidad=row.piezas;
                    var precio=row.obra;
                    var total=row.total;
                    $("#listaProductos").append('<tr style= "background: #9bc5c3;  id="fila'+id+'"class="Reg_A'+id+'"><td><span class="mid">000'+
                    id+'</span></td><td><span>'+producto+'</span></td><td><span>'+cantidad+'</span></td><td><span>'+precio+'</span></td> <td><span>'+total+'</span></td> ');

                }
            }else{
                $("#listaProductos").append('<tr><td colspan="5" align="center">No existen Compras de productos</td></tr>');

            }
        },function(transaction,err){
            alert(err.message);

        }   )
    })
}
document.addEventListener('DOMContentLoaded', cargarDatos,false);