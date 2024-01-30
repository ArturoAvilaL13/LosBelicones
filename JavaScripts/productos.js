const carnitas = [
{
    nombre: "Filete Mignon",
    precio: "$460",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/5filetemignon.jpg",
},
{
    nombre: "Filete ",
    precio: "$460",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/5filetemignon.jpg",
},
{
    nombre: " Mignon",
    precio: "$460",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/5filetemignon.jpg",
},
{
    nombre: "Filete Mignon",
    precio: "$460",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/5filetemignon.jpg",
},
{
    nombre: "Filete Mignon",
    precio: "$460",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/5filetemignon.jpg",
},
];

const divProductos = document.getElementById("lista-de-productos");

function displayProductos(carnitas) {
    for (let i = 0; i < carnitas.length; i++) {
      const divProducto = document.createElement("div"); 
      divProducto.classList.add("item");
  
      const titutloProducto = document.createElement("span"); 
      titutloProducto.classList.add("subtitulo");
      titutloProducto.textContent = carnitas[i].nombre;
  
      const imagen = document.createElement("img"); 
      imagen.setAttribute("src", carnitas[i].img);
      imagen.classList.add("img-item");

      const precio = document.createElement("span"); 
      precio.classList.add("precio-item");
      precio.textContent = carnitas[i].precio;

      const agregar = document.createElement("button"); 
      agregar.classList.add("boton-item");
      agregar.classList.add("texto-navegacion");
      agregar.textContent = "Agregar al Carrito";
  
      divProducto.appendChild(titutloProducto);
      divProducto.appendChild(imagen);
      divProducto.appendChild(precio);
      divProducto.appendChild(agregar);
  
      divProductos.appendChild(divProducto);
    }
}

displayProductos(carnitas);

//funcion get de la API para recibir los productos.