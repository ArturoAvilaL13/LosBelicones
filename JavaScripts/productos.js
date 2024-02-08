const carnitas = [
{
    nombre: "Filete Mignon",
    precio: "$460",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/5filetemignon.jpg",
    tipo: "1",
},
{
    nombre: "New York ",
    precio: "$360",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/2Newyorkcocinado.jpg",
    tipo: "1",
},
{
    nombre: " Ribeye",
    precio: "$395",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/3ribeyecocinado.jpg",
    tipo: "1",
},
{
    nombre: "Cowboy",
    precio: "$410",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/4cowboycocinado.jpeg",
    tipo: "1",
},
{
    nombre: "Picaña",
    precio: "$390",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/6picania.jpg ",
    tipo: "1",
},
{
    nombre: "Porter House",
    precio: "$330",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/7porterhouse.JPEG",
    tipo: "1",
},
{
    nombre: "Prime Rib",
    precio: "$350",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/8primerib.jpeg",
    tipo: "1",
},
{
    nombre: "Aguja Norteña",
    precio: "$310",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/9agujanortenia.jpg",
    tipo: "1",
},
{
    nombre: "Tomahawk",
    precio: "$510",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/10tomehawk.jpeg",
    tipo: "1" ,
    
},
{
    nombre: "Molida de res",
    precio: "$250",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/11molida.jpg",
    tipo: "2",
    
},
{
    nombre: "New york burguers",
    precio: "$250",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/12burgers.jpg",
    tipo: "2",
    
},
{
    nombre: "Tuetano",
    precio: "$190",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/14tuetano.jpg",
    tipo: "3",
    
},
{
    nombre: "Smoke Banana Bread",
    precio: "$350",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/15banana.jpg",
    tipo: "3",
    
},
{
    nombre: "Hand Crafted Chimichurri",
    precio: "$150",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/16chimichurri.jpg",
    tipo: "3",
    
},
{
    nombre: "Chorizo Argentino",
    precio: "$250",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/13chorizo.jpg",
    tipo: "3",
    
},
{
    nombre: "Bolsa de carbón",
    precio: "$75",
    descripcion: "Este es un Filete Mignon.",
    img: "../img/cortes cocinados/17carbon.jpg",
    tipo: "3",
    
},
];

const divProductos = document.getElementById("lista-de-productos");
const selector = document.getElementById("categorias");

function displayProductos(carnitas) {
    divProductos.innerHTML = ""; // Clear the existing products

    for (let i = 0; i < carnitas.length; i++) {
        const producto = carnitas[i];

        // Check if the product matches the selected category
        if (selector.value === "" || producto.tipo === selector.value) {
            const divProducto = document.createElement("div");
            divProducto.classList.add("item");

            const tituloProducto = document.createElement("span");
            tituloProducto.classList.add("titulo-item");
            tituloProducto.textContent = producto.nombre;

            const imagen = document.createElement("img");
            imagen.setAttribute("src", producto.img);
            imagen.classList.add("img-item");

            const precio = document.createElement("span");
            precio.classList.add("precio-item");
            precio.textContent = producto.precio;

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
}

displayProductos(carnitas);

// Event listener for selector change
selector.addEventListener("change", () => {
    displayProductos(carnitas);
});

//funcion get de la API para recibir los productos.