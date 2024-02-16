import {
    validarVacio,
    validarFormatoCorreo,
  } from "../modules/validacionesDeCampos.js";
  
  import{
    getTiposDePagos,
    getTiposDeEntregas
  } from "../modules/crudTipos/crudTipo.js";

import { getUsuario } from "../modules/crudUsuario/crudUsuario.js";

import {
    getLocalStorageUsuario,
    getLocalStorageCarrito
  } from "../modules/localStorage.js";
  
import { postPedido, getPedido } from "../modules/crudPedido/crudPedido.js";

import { getCarnes } from "../modules/crudCarne/crudCarne.js";

const form = document.getElementById("checkoutForm");
const correo = document.getElementById("correo");
const tipoDeEntrega = document.getElementById("puntoDeEntrega");
const nombre = document.getElementById("nombre");
const direccion = document.getElementById("direccion");
const tipoDePago = document.getElementById("metodoDePago")
const usuario = getLocalStorageUsuario();
const btnAtras = document.getElementById("atras");
const totalAPagar = document.getElementById("totalAPagar");
const mensajeRegistro = document.getElementById("mensajeError");
const carrito = JSON.parse(getLocalStorageCarrito());
const carritoItems = document.getElementById("items");
const cantidadDeProductos = document.getElementById("cantidadDeProductos");

//llenar los select de tipo de entrega
const llenarTiposDeEntrega = async () => {
    const response = await getTiposDeEntregas();
    console.log(response);
    const datas = response.object;
    console.log(datas);
    datas.forEach((data) => {
      agregarTipoAlSelect(data);
    });
  };

  llenarTiposDeEntrega();
  

  const agregarTipoAlSelect = (tipo) => {
    const opcion = document.createElement("option");
    opcion.value = tipo.idTipoDeEntrega;
    opcion.innerText = tipo.tipoDeEntrega;
  
    tipoDeEntrega.appendChild(opcion);
  };

  //llenar los select de tipos de pago

  const llenarTiposDePago = async ()=> {
    const resp = await getTiposDePagos();
    console.log(resp);
    const datas = resp.object;
    datas.forEach((data) =>{
        agregarTipoDePago(data);
    });
  };
  llenarTiposDePago();
  

  const agregarTipoDePago = (tip) => {
    const option = document.createElement("option");
    option.value = tip.idMetodoDePago;
    option.innerText = tip.metodoDePago;

    tipoDePago.appendChild(option);
  };

//Llenar datos del usuario 
const obtenerDatosUsuario = async () => {
    const response = await getUsuario(usuario);
    const datosUsuario = response.object;

    llenarFormulario(datosUsuario);
}

function llenarFormulario(datosUsuario) {
    correo.value = datosUsuario.correo;
    nombre.value = datosUsuario.nombre;
    direccion.value = datosUsuario.direccion;
  }

  obtenerDatosUsuario();

  btnAtras.addEventListener("click", () => {
    location.href="../index.html"
  });

//Validar vacio en los select
//select pago
tipoDePago.addEventListener("invalid", (e) => {
  validarVacio(e.target);
});
tipoDePago.addEventListener("change", (e) => {
  validarVacio(e.target);
});
//select entrega
tipoDeEntrega.addEventListener("invalid", (e) => {
  validarVacio(e.target);
});
tipoDeEntrega.addEventListener("change", (e) => {
  validarVacio(e.target);
});



const agregarProductos = async ()=>{
  const response = await getCarnes();
  const data = response.object;
  let carnita;
  let totalProductos = 0;
  let total=0;
  carrito.forEach(producto => {
    carnita = data.find((carne) => carne.idCarne === producto.idCarne)
    totalProductos += producto.cantidadCarne;
    total += carnita.precioCarne*producto.cantidadCarne;
    carritoItems.innerHTML += `
    <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${carnita.imagenCarne}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title subtitulo">${carnita.nombreCarne}</h5>
                    <p class="card-text texto-navegacion">Cantidad a comprar:<br>${producto.cantidadCarne}</p>
                    <p class="card-text texto-navegacion">$ ${carnita.precioCarne*producto.cantidadCarne}</p>
                  </div>
                </div>
              </div>
            </div>
    `
  });
  cantidadDeProductos.value = totalProductos;
  totalAPagar.value = `$${total}`;
}
agregarProductos();
//Enviar el pedido a la base de datoss 

  form.onsubmit = async (e) => {
    e.preventDefault(); //para que no se borren los campos al estar validado el formulario
    //~ Guardamos los campos validados para usarlos
    const pedido = {
      fkIdUsuario: usuario,
      totalPedido: parseFloat(totalAPagar.value),
      fkIdMetodoDePago: Number(tipoDePago.value),
      fkIdTipoDeEnvio: Number(tipoDeEntrega.value)
    };
    //~Una vez transformados a JSON hay que enviarlos a la api en la parte de registro
    const response = await postPedido(pedido);
    const mensaje = response.mensaje;
    const pedidoCreado = response.object;
    const idPedido = pedidoCreado.idPedido;
    
    carrito.forEach(element => {
      element.idPedido = idPedido;
    });
    await postPedidoTieneCarne(carrito);
    location.href = "./menu.html"
  };

  
