import { validarVacio } from "../modules/validacionesDeCampos.js";
import {
  deleteUsuario,
  getUsuario,
} from "../modules/crudUsuario/crudUsuario.js";
import {
  getLocalStorageUsuario,
  limpiarTodoElLocalStorage,
} from "../modules/localStorage.js";

const contraFormulario = document.getElementById("contrasena");
const form = document.getElementById("eliminarCuenta");
const usuario = getLocalStorageUsuario();
const mensajeServidor = document.getElementById("mensajeServidor");

contraFormulario.addEventListener("invalid", (e) => {
  validarVacio(e.target);
});
contraFormulario.addEventListener("input", (e) => {
  validarVacio(e.target);
});

form.onsubmit = async (e) => {
  e.preventDefault();
  const contrasena = contraFormulario.value;
  const response = await getUsuario(usuario);
  const mensajeResponse = response.mensaje;
  const usuarioResponse = response.object;

  if (usuarioResponse !== null) {
    console.log(typeof usuario);
    console.log(usuarioResponse.contrasena, contrasena);
    console.log(typeof usuarioResponse.idUsuario);
    if (usuarioResponse.contrasena == contrasena) {
      const responseDelete = await deleteUsuario(usuarioResponse);
      limpiarTodoElLocalStorage();
      location.href = "../index.html";
    } else {
      mensajeServidor.innerText = "La contraseña es incorrecta";
      setTimeout(() => {
        mensajeServidor.innerText = "";
      }, 3000);
    }
  } else {
    mensajeServidor.innerText = mensajeResponse;
    setTimeout(() => {
      mensajeServidor.innerText = "";
    }, 3000);
  }
};
