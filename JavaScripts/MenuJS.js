const btnCart = document.querySelector('.container-cart');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});



//Variable quie mantiene el estado visible del carrito
var carritoVisible = true;

//Esperamos que todos los elementos de la página se carguen para continuar con el script
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
    //Agregamos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i=0; i < botonesEliminarItem.length;i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);

    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0; i < botonesSumarCantidad.length;i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }


 //Agrego funcionalidad al boton restar cantidad
 var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
 for(var i=0; i < botonesRestarCantidad.length;i++){
     var button = botonesRestarCantidad[i];
     button.addEventListener('click', restarCantidad);
 }


//Agrego funcionalidad a los botones Agregar al carrito
var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
for(var i=0; i<botonesAgregarAlCarrito.length;i++){
    var button = botonesAgregarAlCarrito[i];
    button.addEventListener('click', agregarAlCarritoClicked);
}

//Agregar funcionalidad al boton pagar
//document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)
var btnPagar = document.querySelector('.btn-pagar');
btnPagar.addEventListener('click', function () {
    // Redirigir a la página checkout.html al hacer clic en el botón Pagar
    window.location.href = 'checkout.html';
});

}


//Actualiza el total del carrito
function actualizarTotalCarrito (){
    
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0; 

    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i < carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        console.log(precioElemento);
        //quitamos el simbolo peso y el punto de milesimo
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio * cantidad);
        
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + '.00';

}

function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        //carrito.style.opacity='0';
        carritoVisible = false;

        //ahora maximizo el contenedor de los elementos 
        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
        
    }
}

function sumarCantidad(event) {
    var buttonClicked = event.target;
    var item = buttonClicked.closest('.carrito-item'); // Obtener el elemento padre .carrito-item
    var cantidadActual = parseInt(item.querySelector('.carrito-item-cantidad').value); // Obtener la cantidad actual
    cantidadActual++; // Incrementar la cantidad
    item.querySelector('.carrito-item-cantidad').value = cantidadActual; // Actualizar la cantidad en el carrito
    actualizarTotalCarrito(); // Actualizar el total del carrito
    actualizarContadorProductos(); // Actualizar el contador de productos
}

function restarCantidad(event) {
    var buttonClicked = event.target;
    var item = buttonClicked.closest('.carrito-item'); // Obtener el elemento padre .carrito-item
    var cantidadActual = parseInt(item.querySelector('.carrito-item-cantidad').value); // Obtener la cantidad actual
    cantidadActual--; // Decrementar la cantidad
    if (cantidadActual >= 1) { // Controlar que la cantidad no sea menor que 1
        item.querySelector('.carrito-item-cantidad').value = cantidadActual; // Actualizar la cantidad en el carrito
        actualizarTotalCarrito(); // Actualizar el total del carrito
        actualizarContadorProductos(); // Actualizar el contador de productos
    }
}

function actualizarContadorProductos() {
    var contadorProductos = document.getElementById('contador-productos');
    var totalProductos = 0;
    var carritoItems = document.querySelectorAll('.carrito-item');
    carritoItems.forEach(function(item) {
        totalProductos += parseInt(item.querySelector('.carrito-item-cantidad').value);
    });
    contadorProductos.textContent = totalProductos;
}
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.closest('.item'); // Utilizamos closest para encontrar el elemento padre .item
    var titulo = item.querySelector('.titulo-item').innerText; // Usamos querySelector para encontrar el título dentro del elemento padre
    console.log(titulo);
    var precio = item.querySelector('.precio-item').innerText; // Usamos querySelector para encontrar el precio dentro del elemento padre
    var imagenSrc = item.querySelector('.img-item').src; // Usamos querySelector para encontrar la imagen dentro del elemento padre
    console.log(imagenSrc);

    // La siguiente función agrega el elemento al carrito. Le mando por parametros los valores
    agregarItemAlCarrito(titulo, precio, imagenSrc);

    // Hacemos visible el carrito cuando agrega por primera vez
    hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // Dentro de la función agregarItemAlCarrito después de agregar un nuevo item al carrito
// Incrementar el contador de productos
var contadorProductos = document.getElementById('contador-productos');
var cantidadProductos = parseInt(contadorProductos.textContent);
contadorProductos.textContent = cantidadProductos + 1;



    //Vamos a controlar que el item que esta ingresando no se encuentre ya en el carrito.
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0; i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El corte ya se encuentra en el carrito");
            return;
        }
    }

    function eliminarItemCarrito(event){
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
    
        // Recalcular la cantidad de productos en el carrito
        var cantidadProductos = document.querySelectorAll('.carrito-item').length;
        contadorProductos.textContent = cantidadProductos;
    
        // Actualizar el total del carrito una vez que hemos eliminado un item
        actualizarTotalCarrito();
    
        // La siguiente función controla si hay elementos en el carrito una vez que se ha eliminado.
        // Si no hay, debemos ocultar el carrito.
        ocultarCarrito();
    }

    var itemCarritoContenido = `
    <div class="carrito-item">
    <img src="${imagenSrc}" alt="" width="80px">
    <div class="carrito-item-detalles">
        <span class="carrito-item-titulo">${titulo}</span>
        <div class="selector-cantidad">
            <i class="fa-solid fa-minus restar-cantidad"></i>
            <input type="text" value="1" class="carrito-item-cantidad" disabled>
            <i class="fa-solid fa-plus sumar-cantidad"></i>
        </div>
        <span class="carrito-item-precio">${precio}</span>
    </div>
    <span class="btn-eliminar">
        <i class="fa-solid fa-trash"></i>
    </span>
</div>
    
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregar la funcionalidad eliminar del nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',eliminarItemCarrito);

    //Agregamos la funcionalidad de sumar del nuevo item

    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    //Resta
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);


    //prueba localstorage Yonuel 

    // Guardar el carrito en localStorage
    var carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    var nuevoItem = { titulo, precio, imagenSrc };
    carritoActual.push(nuevoItem);
    localStorage.setItem('carrito', JSON.stringify(carritoActual));

    // Hacer visible el carrito
    hacerVisibleCarrito();

}

function pagarClicked(event){
    alert("Gracias por su compra");
    //elimina todos los elementos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();

    //Funcion que oculta el carrito
    ocultarCarrito();
}

function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito') [0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60';

    actualizarTotalCarrito();
}
