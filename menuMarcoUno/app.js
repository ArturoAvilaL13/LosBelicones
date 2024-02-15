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
  const cerrarTuOrdenIcono = document.getElementById('cerrar-tu-orden');
  const selectTipo = document.getElementById('tipo');

  let carrito = [];
  let productos = [];
  let tipos = [];

  // Obtener y mostrar todos los productos
  fetch('http://localhost:3000/productos')
    .then(response => response.json())
    .then(data => {
      productos = data;
      mostrarProductos(productos);
      mostrarCarritoVacio();
    })
    .catch(error => console.error('Error al obtener productos:', error));

  // Obtener tipos de productos
  fetch('http://localhost:3000/tipos')
    .then(response => response.json())
    .then(data => {
      tipos = data;
      mostrarTipos(tipos);
    })
    .catch(error => console.error('Error al obtener tipos:', error));

  campoBusqueda.addEventListener('input', filtrarProductos);
  selectTipo.addEventListener('change', filtrarProductos);

  // Función para mostrar tipos de productos en el select
  function mostrarTipos(tiposMostrados) {
    selectTipo.innerHTML = `<option value="">Todos los tipos</option>` + tiposMostrados.map(tipo => `
      <option value="${tipo}">${tipo}</option>
    `).join('');
    console.log(tiposMostrados);
  }

  // Función para filtrar productos por texto de búsqueda y tipo
  function filtrarProductos() {
    const textoBusqueda = campoBusqueda.value.toLowerCase();
    const tipoSeleccionado = selectTipo.value;

    

    // Envía una solicitud GET al servidor con el tipo de corte seleccionado como parámetro de consulta
    fetch(`http://localhost:3000/productos?tipo=${tipoSeleccionado}`)
      .then(response => response.json())
      .then(data => {
        let productosFiltrados = data;

        // Filtra por texto de búsqueda si hay texto ingresado
        if (textoBusqueda) {
          productosFiltrados = productosFiltrados.filter(producto => {
            const nombreProducto = producto.nombre_carne.toLowerCase();
            return nombreProducto.includes(textoBusqueda);
          });
        }

        mostrarProductos(productosFiltrados); // Muestra los productos filtrados
      })
      .catch(error => console.error('Error al filtrar productos:', error));
  }

  // Función para mostrar productos en la lista
  function mostrarProductos(productosMostrados) {
    productosLista.innerHTML = productosMostrados.map(producto => `
      <div class="row align-items-center" style="width: 18rem;">
        <li class="list-group-item">
          <h3>${producto.nombre_carne}</h3>
          <img src="${producto.imagen_carne}" alt="${producto.nombre_carne}" class="img-fluid">  
          <p>${producto.descripcion_carne}</p>
          <p>${'$' + producto.precio_carne}</p> 
          <p>${'Tipo de corte: ' + producto.fk_id_tipo_de_corte}</p> <!-- Ajuste aquí -->
          <button onclick="agregarAlCarrito(${producto.id_carne}, '${producto.nombre_carne}', ${producto.precio_carne}, '${producto.imagen_carne}')"
            class="btn btn-primary">Agregar al carrito</button>
        </li>
      </div>
    `).join('');
  }

  // Función para filtrar productos por texto de búsqueda y tipo
  function filtrarProductos() {
    const textoBusqueda = campoBusqueda.value.toLowerCase();
    const tipoSeleccionado = selectTipo.value;
  
    fetch(`http://localhost:3000/productos?tipo=${tipoSeleccionado}`)
      .then(response => response.json())
      .then(data => {
        let productosFiltrados = data;
  
        // Filtrar por texto de búsqueda si hay texto ingresado
        if (textoBusqueda) {
          productosFiltrados = productosFiltrados.filter(producto => {
            const nombreProducto = producto.nombre_carne.toLowerCase();
            return nombreProducto.includes(textoBusqueda);
          });
        }
  
        mostrarProductos(productosFiltrados);
      })
      .catch(error => console.error('Error al filtrar productos:', error));
  }
  

  // Añadir evento change al elemento selectTipo
  selectTipo.addEventListener('change', () => {
    const tipoSeleccionado = selectTipo.value;

    fetch(`http://localhost:3000/productos?tipo=${tipoSeleccionado}`)
      .then(response => response.json())
      .then(data => {
        productos = data;
        mostrarProductos(productos);
      })
      .catch(error => console.error('Error al obtener productos filtrados por tipo:', error));
  });

  // Función para mostrar mensaje si el carrito está vacío
  function mostrarCarritoVacio() {
    carritoVacioElement.style.display = carrito.length === 0 ? 'block' : 'none';
  }

  // Función para actualizar la visualización del carrito
  function actualizarCarrito() {
    carritoLista.innerHTML = carrito.map(item => `
      <li class="list-group-item">
        <div class="row align-items-center">
          <div class="col-md-4">
            <img src="${item.imagen_carne}" alt="${item.nombre_carne}" class="img-fluid">
          </div>
          <div class="col-md-6">
            <h4>${item.nombre_carne}</h4>
            <p>Precio: ${'$' + item.precio}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <button onclick="eliminarUnidadDelCarrito(${item.id_carne})" class="btn btn-secondary">-</button>
            <button onclick="agregarUnidadAlCarrito(${item.id_carne})" class="btn btn-secondary">+</button>
            <button onclick="eliminarDelCarrito(${item.id_carne})" class="btn btn-danger">Eliminar</button>
          </div>
        </div>
      </li>
    `).join('');

    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    totalElement.textContent = '$' + total.toFixed(2);
  }

  // Función para mostrar alertas
  function mostrarAlerta(mensaje) {
    alertaElement.textContent = mensaje;
    alertaElement.style.display = 'block';
    setTimeout(() => {
      alertaElement.style.display = 'none';
    }, 3000);
  }

  // Función para actualizar el contador del carrito
  function actualizarContadorCarrito() {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contadorCarrito.textContent = cantidadTotal;
    contadorCarrito.style.display = cantidadTotal > 0 ? 'block' : 'none';
  }

  // Agregar producto al carrito
  window.agregarAlCarrito = (id, nombre, precio, imagen) => {
    const productoExistente = carrito.find(item => item.id_carne === id);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ id_carne: id, nombre_carne: nombre, precio: precio, imagen_carne: imagen, cantidad: 1 });
    }

    mostrarCarritoVacio();
    actualizarCarrito();
    actualizarContadorCarrito();
  };

  // Eliminar una unidad de un producto del carrito
  window.eliminarUnidadDelCarrito = (id) => {
    const productoExistente = carrito.find(item => item.id_carne === id);

    if (productoExistente) {
      productoExistente.cantidad -= 1;
      if (productoExistente.cantidad === 0) {
        carrito = carrito.filter(item => item.id_carne !== id);
      }
    }

    mostrarCarritoVacio();
    actualizarCarrito();
    actualizarContadorCarrito();
  };

  // Agregar una unidad de un producto al carrito
  window.agregarUnidadAlCarrito = (id) => {
    const productoExistente = carrito.find(item => item.id_carne === id);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    }

    mostrarCarritoVacio();
    actualizarCarrito();
    actualizarContadorCarrito();
  };

  // Eliminar un producto del carrito
  window.eliminarDelCarrito = (id) => {
    carrito = carrito.filter(item => item.id_carne !== id);
    mostrarCarritoVacio();
    actualizarCarrito();
    actualizarContadorCarrito();
  };

  // Proceso de pago
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

  // Mostrar u ocultar la sección "Tu orden" al hacer clic en el ícono del carrito
  carritoIcono.addEventListener('click', () => {
    tuOrden.style.display = tuOrden.style.display === 'block' ? 'none' : 'block';
  });

  // Función para cerrar la sección "Tu orden" al hacer clic en la "x"
  function cerrarTuOrden() {
    tuOrden.style.display = 'none';
  }

  // Agregar evento al ícono de cerrar "x" de la sección "Tu orden"
  cerrarTuOrdenIcono.addEventListener('click', cerrarTuOrden);
});
