document.addEventListener('DOMContentLoaded', () => {
  const productosLista = document.getElementById('productos-lista');
  const carritoLista = document.getElementById('carrito-lista');
  const totalElement = document.getElementById('total');
  const botonPago = document.getElementById('boton-pago-tu-orden');
  const alertaElement = document.getElementById('alerta-pago');
  const carritoVacioElement = document.getElementById('cart-empty-message');
  const campoBusqueda = document.getElementById('busqueda');
  const contadorCarrito = document.getElementById('cart-counter');
  const carritoIcono = document.getElementById('carrito-icono');
  const tuOrden = document.getElementById('tu-orden');
  const cerrarTuOrdenIcono = document.getElementById('cerrar-tu-orden'); // Nuevo

  let carrito = [];
  let productos = [];

  // Obtener todos los productos del servidor (simulado)
  fetch('http://localhost:3000/productos')
      .then(response => response.json())
      .then(data => {
          productos = data;
          mostrarProductos(productos);
          mostrarCarritoVacio();
      })
      .catch(error => console.error('Error al obtener productos:', error));

  function mostrarProductos(productosMostrados) {
      productosLista.innerHTML = productosMostrados.map(producto => `
      <div class="row align-items-center" style="width: 18rem;">
     
        <li class="list-group-item">
        
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid">  
        
      <p>${'$' + producto.precio}</p> 
      <button onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio}, '${producto.imagen}')"
      class="btn btn-primary">Agregar al carrito</button>
      </li>
    </div>
        

      `).join('');
  }

  campoBusqueda.addEventListener('input', () => {
      filtrarProductos(campoBusqueda.value);
  });

  function filtrarProductos(textoBusqueda) {
      const texto = textoBusqueda.toLowerCase();
      const productosFiltrados = productos.filter(producto =>
          producto.nombre.toLowerCase().includes(texto)
      );
      mostrarProductos(productosFiltrados);
  }

  function mostrarCarritoVacio() {
      carritoVacioElement.style.display = carrito.length === 0 ? 'block' : 'none';
  }

  function actualizarCarrito() {
      carritoLista.innerHTML = carrito.map(item => `
        <li class="list-group-item">
          <div class="row align-items-center">
            <div class="col-md-4">
              <img src="${item.imagen}" alt="${item.nombre}" class="img-fluid">
            </div>
            <div class="col-md-6">
              <h4>${item.nombre}</h4>
              <p>Precio: ${'$' + item.precio}</p>
              <button onclick="eliminarDelCarrito(${item.id})" class="btn btn-danger">Eliminar</button>
            </div>
          </div>
        </li>
      `).join('');

      const total = carrito.reduce((acc, item) => acc + item.precio, 0);
      totalElement.textContent = '$' + total.toFixed(2);
  }

  function mostrarAlerta(mensaje) {
      alertaElement.textContent = mensaje;
      alertaElement.style.display = 'block';
      setTimeout(() => {
          alertaElement.style.display = 'none';
      }, 3000);
  }

  function mostrarAlertaPago(mensaje) {
      alertaPago.textContent = mensaje;
      alertaPago.style.display = 'block';
  }

  function actualizarContadorCarrito() {
      const cantidadTotal = carrito.reduce((acc, item) => acc + 1, 0);
      contadorCarrito.textContent = cantidadTotal;
      contadorCarrito.style.display = cantidadTotal > 0 ? 'block' : 'none';
  }

  window.agregarAlCarrito = (id, nombre, precio, imagen) => {
      carrito.push({ id, nombre, precio, imagen });
      mostrarCarritoVacio();
      actualizarCarrito();
      actualizarContadorCarrito();
  };

  window.eliminarDelCarrito = (id) => {
      carrito = carrito.filter(item => item.id !== id);
      mostrarCarritoVacio();
      actualizarCarrito();
      actualizarContadorCarrito();
  };

  botonPago.addEventListener('click', () => {
      if (carrito.length === 0) {
          mostrarAlerta('El carrito está vacío. Por favor, agrega productos antes de proceder con el pago.');
      } else {
          localStorage.setItem('carrito', JSON.stringify(carrito));
          window.open('ticket.html', '_blank');
          carrito = [];
          actualizarCarrito();
          actualizarContadorCarrito();
      }
  });

  carritoIcono.addEventListener('click', () => {
      tuOrden.style.display = tuOrden.style.display === 'block' ? 'none' : 'block';
  });

  // Función para cerrar la sección "Tu orden" al hacer clic en la "x"
  function cerrarTuOrden() {
      tuOrden.style.display = 'none';
  }
  
  // Agregar evento al icono de cerrar "x" de la sección "Tu orden"
  cerrarTuOrdenIcono.addEventListener('click', cerrarTuOrden);

});

document.addEventListener('DOMContentLoaded', function () {
    var svgElement = document.getElementById('carrito-icono');
    var tuOrdenDiv = document.getElementById('tu-orden');
  
    svgElement.addEventListener('click', function () {
      tuOrdenDiv.classList.toggle('below-svg');
    });
  });
