document.addEventListener('DOMContentLoaded', () => {
    const ticketLista = document.getElementById('ticket-lista');
    const totalElement = document.getElementById('total');
    const numeroPedidoElement = document.getElementById('numero-pedido');
  
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    // Generar un número de pedido aleatorio
    const numeroPedido = generarNumeroPedido();
    numeroPedidoElement.textContent = numeroPedido;
  
    // Agregar cada artículo del carrito al ticket
    carrito.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.nombre_carne} - Cantidad: ${item.cantidad} - Precio Unitario: $${item.precio.toFixed(2)} - Precio Total: $${(item.precio * item.cantidad).toFixed(2)}`;
      ticketLista.appendChild(li);
    });
  
    // Calcular el total de la compra
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    totalElement.textContent = '$' + total.toFixed(2);
  });
  
  // Función para generar un número de pedido aleatorio
  function generarNumeroPedido() {
    return Math.floor(Math.random() * 1000000); // Genera un número de 6 dígitos
  }
  