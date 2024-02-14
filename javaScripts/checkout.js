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
    getLocalStorageUsuario
  } from "../modules/localStorage.js";


const form = document.getElementById("checkoutForm");
const correo = document.getElementById("correo");
const tipoDeEntrega = document.getElementById("puntoDeEntrega");
const nombre = document.getElementById("nombre");
const direccion = document.getElementById("direccion");
const tipoDePago = document.getElementById("metodoDePago")
const usuario = getLocalStorageUsuario();

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