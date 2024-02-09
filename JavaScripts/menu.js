const divCarnita = document.querySelector(".container-cart");
const containerCartProducts = document.querySelector(
  ".container-cart-products"
);
let carritoVisible = true;

divCarnita.addEventListener("click", (event) => {
  // Verificar si el clic ocurrió dentro del contenedor del carrito
  if (!containerCartProducts.contains(event.target)) {
    // Si el clic ocurrió fuera del contenedor del carrito, alternar la visibilidad del carrito
    containerCartProducts.classList.toggle("hidden-cart");
  }
});

//Esperamos que todos los elementos de la página se carguen para continuar con el script
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  //Agregamos funcionalidad a los botones eliminar del carrito
  const botonesEliminarItem = document.getElementsByClassName("btn-eliminar");
  for (let i = 0; i < botonesEliminarItem.length; i++) {
    let button = botonesEliminarItem[i];
    button.addEventListener("click", eliminarItemCarrito);
  }

  //Agrego funcionalidad al boton sumar cantidad
  const botonesSumarCantidad =
    document.getElementsByClassName("sumar-cantidad");
  for (let i = 0; i < botonesSumarCantidad.length; i++) {
    let button = botonesSumarCantidad[i];
    button.addEventListener("click", sumarCantidad);
  }

  //Agrego funcionalidad al boton restar cantidad
  let botonesRestarCantidad =
    document.getElementsByClassName("restar-cantidad");
  for (let i = 0; i < botonesRestarCantidad.length; i++) {
    let button = botonesRestarCantidad[i];
    button.addEventListener("click", restarCantidad);
  }

  //Agrego funcionalidad a los botones Agregar al carrito
  let botonesAgregarAlCarrito = document.getElementsByClassName("boton-item");
  for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
    let button = botonesAgregarAlCarrito[i];
    button.addEventListener("click", agregarAlCarritoClicked);
  }

  //Agregar funcionalidad al boton pagar
  //document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)
  let btnPagar = document.querySelector(".btn-pagar");
  btnPagar.addEventListener("click", function () {
    // Redirigir a la página checkout.html al hacer clic en el botón Pagar
    window.location.href = "checkout.html";
  });
}

function actualizarTotalCarrito() {
  //seleccionamos el contenedor carrito
  const carritoContenedor = document.getElementsByClassName("carrito")[0];
  const carritoItems = carritoContenedor.getElementsByClassName("carrito-item");
  let total = 0;

  //recorremos cada elemento del carrito para actualizar el total
  for (let i = 0; i < carritoItems.length; i++) {
    const item = carritoItems[i];
    const precioElemento = item.getElementsByClassName(
      "carrito-item-precio"
    )[0];

    //quitamos el simbolo peso y el punto de milesimo
    let precio = parseFloat(
      precioElemento.innerText.replace("$", "").replace(".", "")
    );

    const cantidadItem = item.getElementsByClassName(
      "carrito-item-cantidad"
    )[0];
    const cantidad = cantidadItem.value;

    total = total + precio * cantidad;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("carrito-precio-total")[0].innerText =
    "$" + total.toLocaleString("es") + ".00";
}

function ocultarCarrito() {
  const carritoItems = document.getElementsByClassName("carrito-items")[0];
  if (carritoItems.childElementCount == 0) {
    const carrito = document.getElementsByClassName("carrito")[0];
    carrito.style.marginRight = "-100%";
    //carrito.style.opacity='0';
    carritoVisible = false;

    //ahora maximizo el contenedor de los elementos
    const items = document.getElementsByClassName("contenedor-items")[0];
    items.style.width = "100%";
  }
}

function sumarCantidad(event) {
  const buttonClicked = event.target;
  const item = buttonClicked.closest(".carrito-item"); // Obtener el elemento padre .carrito-item
  let cantidadActual = parseInt(
    item.querySelector(".carrito-item-cantidad").value
  ); // Obtener la cantidad actual
  cantidadActual++; // Incrementar la cantidad
  item.querySelector(".carrito-item-cantidad").value = cantidadActual; // Actualizar la cantidad en el carrito
  actualizarTotalCarrito(); // Actualizar el total del carrito
  actualizarContadorProductos(); // Actualizar el contador de productos
}

function restarCantidad(event) {
  const buttonClicked = event.target;
  const item = buttonClicked.closest(".carrito-item"); // Obtener el elemento padre .carrito-item
  let cantidadActual = parseInt(
    item.querySelector(".carrito-item-cantidad").value
  ); // Obtener la cantidad actual
  cantidadActual--; // Decrementar la cantidad
  if (cantidadActual >= 1) {
    // Controlar que la cantidad no sea menor que 1
    item.querySelector(".carrito-item-cantidad").value = cantidadActual; // Actualizar la cantidad en el carrito
    actualizarTotalCarrito(); // Actualizar el total del carrito
    actualizarContadorProductos(); // Actualizar el contador de productos
  } else {
    //eliminamos el item del producto
    item.remove();
    actualizarTotalCarrito();
    actualizarContadorProductos();
  }
}

function actualizarContadorProductos() {
  const contadorProductos = document.getElementById("contador-productos");
  let totalProductos = 0;
  let carritoItems = document.querySelectorAll(".carrito-item");
  carritoItems.forEach(function (item) {
    totalProductos += parseInt(
      item.querySelector(".carrito-item-cantidad").value
    );
  });
  contadorProductos.textContent = totalProductos;
}

function agregarAlCarritoClicked(event) {
  const button = event.target;
  const item = button.closest(".item"); // Utilizamos closest para encontrar el elemento padre .item
  const titulo = item.querySelector(".titulo-item").innerText; // Usamos querySelector para encontrar el título dentro del elemento padre

  const precio = item.querySelector(".precio-item").innerText; // Usamos querySelector para encontrar el precio dentro del elemento padre
  const imagenSrc = item.querySelector(".img-item").src; // Usamos querySelector para encontrar la imagen dentro del elemento padre

  // La siguiente función agrega el elemento al carrito. Le mando por parametros los valores
  agregarItemAlCarrito(titulo, precio, imagenSrc);
  // Hacemos visible el carrito cuando agrega por primera vez
  //   hacerVisibleCarrito();
}

function eliminarItemCarrito(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();

  // Recalcular la cantidad de productos en el carrito
  const cantidadProductos = document.querySelectorAll(".carrito-item").length;
  const contadorProductos = document.getElementById("contador-productos");
  contadorProductos.textContent = cantidadProductos;

  // Actualizar el total del carrito una vez que hemos eliminado un item
  actualizarTotalCarrito();

  // La siguiente función controla si hay elementos en el carrito una vez que se ha eliminado.
  // Si no hay, debemos ocultar el carrito.
  actualizarEstadoCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
  const item = document.createElement("div");
  item.classList.add = "item";
  const itemsCarrito = document.getElementsByClassName("carrito-items")[0];
  let bandera = true;

  //Vamos a controlar que el item que esta ingresando no se encuentre ya en el carrito.
  const nombresItemsCarrito = itemsCarrito.getElementsByClassName(
    "carrito-item-titulo"
  );
  for (let i = 0; i < nombresItemsCarrito.length; i++) {
    if (nombresItemsCarrito[i].innerText == titulo) {
      bandera = false;
      return;
    }
  }
  if (bandera) {
    const contadorProductos = document.getElementById("contador-productos");
    const cantidadProductos = parseInt(contadorProductos.textContent);
    contadorProductos.textContent = cantidadProductos + 1;
  }
  // Dentro de la función agregarItemAlCarrito después de agregar un nuevo item al carrito
  // Incrementar el contador de productos

  let itemCarritoContenido = `
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
      
      `;
  item.innerHTML = itemCarritoContenido;
  itemsCarrito.append(item);

  //Agregar la funcionalidad eliminar del nuevo item
  item
    .getElementsByClassName("btn-eliminar")[0]
    .addEventListener("click", eliminarItemCarrito);

  //Agregamos la funcionalidad de sumar del nuevo item

  let botonSumarCantidad = item.getElementsByClassName("sumar-cantidad")[0];
  botonSumarCantidad.addEventListener("click", sumarCantidad);

  //Resta
  let botonRestarCantidad = item.getElementsByClassName("restar-cantidad")[0];
  botonRestarCantidad.addEventListener("click", restarCantidad);

  //prueba localstorage Yonuel

  // Guardar el carrito en localStorage
  //let carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
  //let nuevoItem = { titulo, precio, imagenSrc };
  // carritoActual.push(nuevoItem);
  // localStorage.setItem("carrito", JSON.stringify(carritoActual));

  // Hacer visible el carrito
  //   hacerVisibleCarrito();

  actualizarEstadoCarrito();
}

function actualizarEstadoCarrito() {
  let carritoItems = document.querySelectorAll(".carrito-item");
  let cartEmptyText = document.getElementById("cartEmptyText");

  if (carritoItems.length === 0) {
    // Si no hay elementos en el carrito, muestra el texto "Tu carrito está vacío"
    cartEmptyText.style.display = "block";
  } else {
    // Si hay elementos en el carrito, oculta el texto "Tu carrito está vacío"
    cartEmptyText.style.display = "none";
  }
}
