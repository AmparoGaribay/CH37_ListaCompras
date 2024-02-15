// El código va aquí -> 
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let contadorProductos =document.getElementById("contadorProductos");
let productosTotal =document.getElementById("productosTotal");
let precioTotal=document.getElementById("precioTotal");

let precio =0;
let isValid=true;
let contador=0;
let costoTotal=0;
let totalEnProductos=0;

let datos = new Array();//objeto array


//limpia los campos
btnClear.addEventListener("click",function(event){
    event.preventDefault();
    txtNombre.value="";//sustituye el valor 
    txtNumber.value="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    contador=0;
    costoTotal=0;
    totalEnProductos=0;
    contadorProductos.innerText=contador;
    productosTotal.innerText=totalEnProductos;
    precioTotal.innerText=`$ ${costoTotal.toFixed(2)}`;
    localStorage.setItem("contadorProductos",contador);
    localStorage.setItem("totalEnProductos",totalEnProductos);
    localStorage.setItem("costoTotal",costoTotal);
    localStorage.removeItem("datos");
    datos = new Array();
    cuerpoTabla.innerHTML="";
    txtNombre.focus();
});
//valida agregar 

    function validarCantidad(){
        if(txtNumber.value.length==0){//valida que no sea sero la cantidad dd de productoductos
            return false;
        }
        if(isNaN(txtNumber.value)){
            console.log("isNaN")
            return false;
        }
        if(Number(txtNumber.value)<=0){
            console.log("menos que 0")
            return false;
        }

        return true;
    }//validar cantidad

    function getPrecio(){
        return parseInt( (Math.random()*90)*100)/100;//convierte a decimales multiplicandolo por 100 y luego dividiendolo, para mas decimales agrega mas ceros
    }

btnAgregar.addEventListener("click",function(event){
    event.preventDefault();
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    isValid=true;
    txtNombre.value =txtNombre.value.trim();//valida los espacios
    txtNumber.value =txtNumber.value.trim();
    if(txtNombre.value.length<3){
        alertValidacionesTexto.insertAdjacentHTML("beforeend",`
        El <strong>nombre </strong> no es correcto </br>`);
        alertValidaciones.style.display="block";//le quita el non y le pone un block
        txtNombre.style.border="solid red thin";
        isValid=false;
    }
    if(!validarCantidad()){
        alertValidacionesTexto.insertAdjacentHTML("beforeend",`
        La <strong> Cantidad</strong> no es correcto </br>`);      
        alertValidaciones.style.display="block";
        txtNumber.style.border="solid red thin";
        isValid=false;
    }
    if(isValid){
        contador++;
        precio= getPrecio();
        //console.log(precio);
        row =`<tr>
            <td>${contador}</td>
            <td>${txtNombre.value}</td>
            <td>${txtNumber.value}</td>
            <td>${precio}</td>
        </tr>
        `;
        //objeto json
        let elemento =`{"id": ${contador},
                        "nombre":" ${txtNombre.value}",
                        "cantidad": ${txtNumber.value},
                        "precio": ${precio}
        }`;
        datos.push(JSON.parse(elemento));//mete el objeto dentro del arreglo
        console.log(datos);
        localStorage.setItem("datos",JSON.stringify(datos));//stringfy comvierte a cadenade caracteres el objetopara ingresarlo allocal stroage

        cuerpoTabla.insertAdjacentHTML("beforeend",row);
        contadorProductos.innerText=contador;
        totalEnProductos+=parseFloat(txtNumber.value);
        productosTotal.innerText= totalEnProductos;
        costoTotal+=precio* parseFloat(txtNumber.value);
        precioTotal.innerText=`$ ${costoTotal.toFixed(2)}`;
        
        localStorage.setItem("contadorProductos",contador);
        localStorage.setItem("totalEnProductos",totalEnProductos);
        localStorage.setItem("costoTotal",costoTotal);
        
        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();
    }

    


});

window.addEventListener("load",function(event){
    event.preventDefault();
    if(this.localStorage.getItem("contadorProductos")!=null){
        contador=Number(this.localStorage.getItem("contadorProductos",contador));//se agrego number
        totalEnProductos=Number(this.localStorage.getItem("totalEnProductos",totalEnProductos));//se agrego number
        costoTotal=Number(this.localStorage.getItem("costoTotal",costoTotal));
    
        contadorProductos.innerText=contador;
        productosTotal.innerText=totalEnProductos;
        precioTotal.innerText=`$ ${costoTotal.toFixed(2)}`

    }
    if(this.localStorage.getItem("datos")!=null){
        datos =JSON.parse(this.localStorage.getItem("datos"));//carga los datos ala tabla un cuando cerraste el navegador 
        datos.forEach((r)=>{
            let row = `<tr>
            <td>${r.id}<td>
            <td>${r.nombre}<td>
            <td>${r.cantidad}<td>
            <td>${r.precio}<td>
            </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend",row);
        });//foreach

    }//datos null
})//winload

