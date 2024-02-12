//*importaciones
//&Para validar todos los campos
import {
  validarEspacios,
  validarVacio,
  validarNoContengaNumero,
  validarContieneNumero,
  validarLogitud,
  comparaContrsenas,
  validarFormatoCorreo,
} from "../modules/validacionesDeCampos.js";
//&para el crud del usuario
import {
  getUsuarioCoCo,
  postUsuario,
} from "../modules/crudUsuario/crudUsuario.js";
//&Para revisar si ya ingreso el usuario
import { revisarLocalStorageUsuario } from "../modules/localStorage.js";
if (revisarLocalStorageUsuario()) {
  console.log("si hay algo almacenado");
} else {
  console.log("no hay nada almacenado");
}
//* Divs a mostar/ocultar
const loginDiv = document.getElementById("login");
const registroDiv = document.getElementById("registro");

//* Button que lo controlara
const textoRegistro = document.getElementById("textoRegistro");
const textoLogin = document.getElementById("textoLogin");

//* Campos para manipular el DOM
//& Login
const formLogin = document.getElementById("login");
const correoLogin = document.getElementById("correoLogin");
const contrasenaLogin = document.getElementById("contrasenaLogin");
const mensajeServidorLogin = document.getElementById("respuestaServidorLogin");
//& Registro
const formRegistro = document.getElementById("registro");
const correoRegistro = document.getElementById("correoRegistro");
const contrasenaRegistro = document.getElementById("contrasenaRegistro");
const contrasenaRegistroValidacion = document.getElementById(
  "contrasenaRegistroValidacion"
);
const nombreRegistro = document.getElementById("nombreRegistro");
const apellidosRegistro = document.getElementById("apellidosRegistro");
const telefonoRegistro = document.getElementById("telefonoRegistro");
const direccionRegistro = document.getElementById("direccionRegistro");
const mensajeServidorRegistro = document.getElementById(
  "respuestaServidorRegistro"
);

//~ Para cambiar de de login -> Registro
textoRegistro.addEventListener("click", () => {
  loginDiv.style.display = "none";
  registroDiv.style.display = "flex";
});
//~ Para cambiar de Registro -> Login
textoLogin.addEventListener("click", () => {
  loginDiv.style.display = "flex";
  registroDiv.style.display = "none";
});

//~Agregando listeners para campos de Login y validarlos
correoLogin.addEventListener("invalid", (e) => {
  validarFormatoCorreo(e.target);
  validarEspacios(e.target);
});
correoLogin.addEventListener("input", (e) => {
  validarFormatoCorreo(e.target);
  validarEspacios(e.target);
});
contrasenaLogin.addEventListener("invalid", (e) => {
  validarVacio(e.target);
});
contrasenaLogin.addEventListener("input", (e) => {
  validarVacio(e.target);
});

//~Agregando lilsteners para campos de registro y validarlos
//&correo
correoRegistro.addEventListener("invalid", (e) => {
  validarFormatoCorreo(e.target);
  validarEspacios(e.target);
});
correoRegistro.addEventListener("input", (e) => {
  validarFormatoCorreo(e.target);
  validarEspacios(e.target);
});
//&contraseña
contrasenaRegistro.addEventListener("invalid", (e) => {
  validarLogitud(e.target);
  validarContieneNumero(e.target);
});
contrasenaRegistro.addEventListener("input", (e) => {
  validarLogitud(e.target);
  validarContieneNumero(e.target);
});
//& contraseña validacion
contrasenaRegistroValidacion.addEventListener("invalid", (e) => {
  validarVacio(e.target);
  comparaContrsenas(e.target, contrasenaRegistro);
});
contrasenaRegistroValidacion.addEventListener("input", (e) => {
  validarVacio(e.target);
  comparaContrsenas(e.target, contrasenaRegistro);
});
//&nombre
nombreRegistro.addEventListener("invalid", (e) => {
  validarVacio(e.target);
  validarEspacios(e.target);
  validarNoContengaNumero(e.target);
});
nombreRegistro.addEventListener("input", (e) => {
  validarVacio(e.target);
  validarEspacios(e.target);
  validarNoContengaNumero(e.target);
});
//& apellidos
apellidosRegistro.addEventListener("invalid", (e) => {
  validarVacio(e.target);
  validarNoContengaNumero(e.target);
});
apellidosRegistro.addEventListener("input", (e) => {
  validarVacio(e.target);
  validarNoContengaNumero(e.target);
});
//& telefono
telefonoRegistro.addEventListener("invalid", (e) => {
  validarVacio(e.target);
});
telefonoRegistro.addEventListener("input", (e) => {
  validarVacio(e.target);
});
//& direccion
direccionRegistro.addEventListener("invalid", (e) => {
  validarVacio(e.target);
});
direccionRegistro.addEventListener("input", (e) => {
  validarVacio(e.target);
});
//~funcionalidad formulario de registro
formRegistro.onsubmit = async (e) => {
  e.preventDefault(); //para que no se borren los campos al estar validado el formulario
  //~ Guardamos los campos validados para usarlos
  const datosValildados = {
    correo: correoRegistro.value,
    contrasena: contrasenaRegistro.value,
    nombre: nombreRegistro.value,
    apellidos: apellidosRegistro.value,
    telefono: telefonoRegistro.value,
    direccion: direccionRegistro.value,
    idTipoDeUsuario: 2,
  };
  //~Una vez transformados a JSON hay que enviarlos a la api en la parte de registro
  const response = await postUsuario(datosValildados);
  const mensaje = response.mensaje;
  const usuario = response.object;
  if (usuario === null) {
    mensajeServidorRegistro.innerText = mensaje;
    setTimeout(() => {
      mensajeServidorRegistro.innerText = "";
    }, 3000);
  } else {
    localStorage.setItem("usuario", usuario.idUsuario);
    localStorage.setItem("tipoUsuario", usuario.idTipoDeUsuario);
    //! Redirigimos a la pagina de inicio
    location.href = "./pages/inicio.html";
  }
};

//~Agregando funcionalidad el form de login para cuando se conceda acceso
formLogin.onsubmit = async (e) => {
  e.preventDefault();
  const contrasenaLoginValidada = contrasenaLogin.value;
  const correoLoginValidado = correoLogin.value;

  //~Aqui ira la solicitud a la api para verificar si el usuario existe en la base de datos
  const response = await getUsuarioCoCo(
    correoLoginValidado,
    contrasenaLoginValidada
  );
  const mensaje = response.mensaje;
  const usuario = response.object;
  if (usuario === null) {
    mensajeServidorLogin.innerText = mensaje;
    setTimeout(() => {
      mensajeServidorLogin.innerText = "";
    }, 3000);
  } else {
    localStorage.setItem("usuario", usuario.idUsuario);
    localStorage.setItem("tipoUsuario", usuario.idTipoDeUsuario);
    //! Redirigimos a la pagina de inicio
    location.href = "./pages/inicio.html";
  }
};
