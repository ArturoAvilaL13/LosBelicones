// Lista de objetos/publicaciones
let listaProductos = [];

// Función para agregar un producto
function agregarProducto(nombre, descripcion, precio, categoria, imagen) {
    let nuevoProducto = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        categoria: categoria,
        imagen: imagen
    };
    listaProductos.push(nuevoProducto);
    mostrarListado();
}

// Función para validar el formulario y agregar el producto
// Función para validar el formulario y agregar el producto
function validarFormulario() {
    var nombre = document.getElementById('nombre').value;
    var descripcion = document.getElementById('descripcion').value;
    var precio = document.getElementById('precio').value;
    var categoria = document.getElementById('categoria').value;
    var imagenInput = document.getElementById('imagen');
    var imagen = imagenInput.files[0];

    // Verificar cada campo individualmente
    if (!nombre.trim()) {
        mostrarAlerta('********ATENCION,EL CAMPO NOMBRE ES OBLIGATORIO.********', 'danger');
        return;
    }

    if (!descripcion.trim()) {
        mostrarAlerta('********ATENCION,EL CAMPO DESCRIPCIÓN ES OBLIGATORIO.********', 'danger');
        return;
    }

    if (!precio.trim()) {
        mostrarAlerta('********ATENCION,EL CAMPO PRECIO ES OBLIGATORIO.********', 'danger');
        return;
    }

    if (!categoria.trim()) {
        mostrarAlerta('********ATENCION,EL CAMPO CATEGORIA ES OBLIGATORIO.********', 'danger');
        return;
    }

    if (!imagen) {
        mostrarAlerta('********ATENCION,DEBE SELECCIONAR UNA IMAGEN.********', 'danger');
        return;
    }

    // Todos los campos completos, agregar el producto
    agregarProducto(nombre, descripcion, parseFloat(precio), categoria, imagen);
    // Aquí podrías enviar el formulario a un servidor o realizar otras acciones según tus necesidades.

    // Limpiar el formulario
    document.getElementById('formularioModelo').reset();
}

// Función para mostrar un mensaje de alerta en la página
function mostrarAlerta(mensaje, tipo) {
    var mensajeAlerta = document.getElementById('mensajeAlerta');
    mensajeAlerta.innerHTML = mensaje;
    mensajeAlerta.className = `alert alert-${tipo}`;
    mensajeAlerta.style.display = 'block';

    // Ocultar el mensaje después de unos segundos (puedes ajustar el tiempo)
    setTimeout(function() {
        mensajeAlerta.style.display = 'none';
    }, 3000);
}

    

// Función para mostrar el listado de productos en formato HTML
function mostrarListado() {
    let output = document.getElementById('output');
    output.innerHTML = ''; // Limpiar el contenido existente

    if (listaProductos.length === 0) {
        output.innerHTML = '<p>No hay productos disponibles.</p>';
        return;
    }

    let ul = document.createElement('ul');

    listaProductos.forEach(function(producto) {
        let li = document.createElement('li');
        li.innerHTML = `
            <strong>Nombre:</strong> ${producto.nombre}<br>
            <strong>Descripción:</strong> ${producto.descripcion}<br>
            <strong>Precio:</strong> ${"$"+producto.precio}<br>
            <strong>Categoría:</strong> ${producto.categoria}<br>
            <strong>Imagen:</strong> <img src="${URL.createObjectURL(producto.imagen)}" alt="Imagen del producto" style="max-width: 100px;"><br>
        `;
        ul.appendChild(li);
    });

    output.appendChild(ul);
}