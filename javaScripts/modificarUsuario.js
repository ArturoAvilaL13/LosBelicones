import {
  validarEspacios,
  validarVacio,
  validarNoContengaNumero,
  validarContieneNumero,
  validarLogitud,
  comparaContrsenas,
  validarFormatoCorreo,
} from "../modules/validacionesDeCampos.js";

import {
  getLocalStorageTipoUsuario,
  getLocalStorageUsuario,
} from "../modules/localStorage.js";

import { getUsuario, putUsuario } from "../modules/crudUsuario/crudUsuario.js";

const form = document.getElementById("registro");
const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");
const contrasenaValidacion = document.getElementById("contrasenaValidacion");
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const telefono = document.getElementById("telefono");
const direccion = document.getElementById("direccion");
const mensajeServidor = document.getElementById("respuestaServidor");
const tipoUsuario = getLocalStorageTipoUsuario();
const usuario = getLocalStorageUsuario();
let datosUsuario = null;

correo.addEventListener("invalid", (e) => {
  validarFormatoCorreo(e.target);
  validarEspacios(e.target);
});
correo.addEventListener("input", (e) => {
  validarFormatoCorreo(e.target);
  validarEspacios(e.target);
});
//&contraseña
contrasena.addEventListener("invalid", (e) => {
  validarLogitud(e.target);
  validarContieneNumero(e.target);
});
contrasena.addEventListener("input", (e) => {
  validarLogitud(e.target);
  validarContieneNumero(e.target);
});
//& contraseña validacion
contrasenaValidacion.addEventListener("invalid", (e) => {
  validarVacio(e.target);
  comparaContrsenas(e.target, contrasena);
});
contrasenaValidacion.addEventListener("input", (e) => {
  validarVacio(e.target);
  comparaContrsenas(e.target, contrasena);
});
//&nombre
nombre.addEventListener("invalid", (e) => {
  validarVacio(e.target);
  validarEspacios(e.target);
  validarNoContengaNumero(e.target);
});
nombre.addEventListener("input", (e) => {
  validarVacio(e.target);
  validarEspacios(e.target);
  validarNoContengaNumero(e.target);
});
//& apellidos
apellidos.addEventListener("invalid", (e) => {
  validarVacio(e.target);
  validarNoContengaNumero(e.target);
});
apellidos.addEventListener("input", (e) => {
  validarVacio(e.target);
  validarNoContengaNumero(e.target);
});
//& telefono
telefono.addEventListener("invalid", (e) => {
  validarVacio(e.target);
});
telefono.addEventListener("input", (e) => {
  validarVacio(e.target);
});
//& direccion
direccion.addEventListener("invalid", (e) => {
  validarVacio(e.target);
});
direccion.addEventListener("input", (e) => {
  validarVacio(e.target);
});

//~funcionalidad formulario
form.onsubmit = async (e) => {
  e.preventDefault(); //para que no se borren los campos al estar validado el formulario
  //~ Guardamos los campos validados para usarlos
  const datosValildados = {
    idUsuario: Number(usuario),
    correo: correo.value,
    contrasena: contrasena.value,
    nombre: nombre.value,
    apellidos: apellidos.value,
    telefono: telefono.value,
    direccion: direccion.value,
    idTipoDeUsuario: Number(tipoUsuario),
  };

  console.log(datosValildados);
  console.log(datosUsuario);

  if (JSON.stringify(datosValildados) === JSON.stringify(datosUsuario)) {
    mensajeServidor.innerText = "Ningun campo fue modificado";
    setTimeout(() => {
      mensajeServidor.innerText = "";
    }, 3000);
  } else {
    const response = await putUsuario(datosValildados);
    const mensaje = response.mensaje;
    datosUsuario = response.object;
    if (datosUsuario === null) {
      mensajeServidor.innerText = mensaje;
      setTimeout(() => {
        mensajeServidor.innerText = "";
      }, 3000);
    } else {
      mensajeServidor.innerText = mensaje;
      setTimeout(() => {
        mensajeServidor.innerText = "";
      }, 3000);
      llenarFormulario(datosUsuario);
    }
  }
};

const obtenerDatosUsuario = async () => {
  const response = await getUsuario(usuario);
  const mensaje = response.mensaje;
  datosUsuario = response.object;
  if (datosUsuario === null) {
    mensajeServidor.innerText = mensaje;
    setTimeout(() => {
      mensajeServidor.innerText = "";
    }, 3000);
  } else {
    llenarFormulario(datosUsuario);
  }
};

function llenarFormulario(datosUsuario) {
  correo.value = datosUsuario.correo;
  contrasena.value = datosUsuario.contrasena;
  contrasenaValidacion.value = datosUsuario.contrasena;
  nombre.value = datosUsuario.nombre;
  apellidos.value = datosUsuario.apellidos;
  telefono.value = datosUsuario.telefono;
  direccion.value = datosUsuario.direccion;
}

obtenerDatosUsuario();
