const carnitas = [
{
    nombre: "Filete Mignon",
    precio: "$460",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/5filetemignon.jpg",
},
{
    nombre: "New York ",
    precio: "$360",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/2Newyorkcocinado.jpg",
},
{
    nombre: " Ribeye",
    precio: "$395",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/3ribeyecocinado.jpg",
},
{
    nombre: "Cowboy",
    precio: "$410",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/4cowboycocinado.jpeg",
},
{
    nombre: "Picaña",
    precio: "$390",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/6picania.jpg ",
},
{
    nombre: "Porter House",
    precio: "$330",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/7porterhouse.JPEG",
},
{
    nombre: "Prime Rib",
    precio: "$350",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/8primerib.jpeg",
},
{
    nombre: "Aguja Norteña",
    precio: "$310",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/9agujanortenia.jpg",
},
{
    nombre: "Tomahawk",
    precio: "$510",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/10tomehawk.jpeg",
},
];

const divProductos = document.getElementById("lista-de-productos");


function displayProductos(carnitas) {
    for (let i = 0; i < carnitas.length; i++) {
      const divProducto = document.createElement("div"); 
      divProducto.classList.add("item");
  
      const tituloProducto = document.createElement("span"); 
      tituloProducto.classList.add("titulo-item");
      tituloProducto.textContent = carnitas[i].nombre;
  
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
  
      divProducto.appendChild(tituloProducto);
      divProducto.appendChild(imagen);
      divProducto.appendChild(precio);
      divProducto.appendChild(agregar);
  
      divProductos.appendChild(divProducto);
      
      
    }
}

displayProductos(carnitas);

//funcion get de la API para recibir los productos.