//validacion de select 
const selectEntrega = document.getElementById("puntoDeEntrega");
const metodoPago = document.getElementById("metodoDePago");

let mensaje = "";

function validar(v) {
    if (v.value == "-1") {
      mensaje = `Seleccione una opcion`;
      v.setCustomValidity(mensaje);
    } else {
      mensaje = "";
      v.setCustomValidity(mensaje);
    }
  }

  selectEntrega.addEventListener("invalid", (e) => {
    validar(e.target);
  });






//jalar el json de local
const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

//productos del carrito en el HTML
function rendercarritoListProducts() {
    const carritoContenedor = document.getElementById('cart-list');

//se limpia el arrito antes
    carritoContenedor.innerHTML = '';

    // crearr los elementos con un for
    for (let i = 0; i < carritoGuardado.length; i++) {
        const product = carritoActual[i];

        // Creamos elementos para cada producto
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const productImageElement = document.createElement('div');
        productImageElement.classList.add('product-image');
        const productImage = document.createElement('img');
        productImage.src = product.imagenSrc;
        productImage.alt = product.titulo; 
        productImage.width = 80;
        productImageElement.appendChild(productImage);

        const productInfoElement = document.createElement('div');
        productInfoElement.classList.add('product-info');
        const producttitulo = document.createElement('span');
        producttitulo.textContent = product.titulo; 
        productQuantity.textContent = `Cantidad: ${product.nuevoItem[i]}`; 
        const productPrice = document.createElement('span');
        productPrice.textContent = `Precio: $${product.precio}`;
        

        // agregar los elementos al producto
        productInfoElement.appendChild(producttitulo);
        productInfoElement.appendChild(productQuantity);
        productInfoElement.appendChild(productPrice);
    

        productElement.appendChild(productImageElement);

       //se agrega al contenedor 
        carritoContenedor.appendChild(productElement);
    }
}

//funcion
rendercarritoListProducts();