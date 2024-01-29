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

//* REGEX para validar el formulario
let mensaje = "";
const emailREGEX = /^[\w.+\-]+@{1}[\w.+\-]+\.{1}com$/; //correo
const contieneEspaciosREGEX = /\s/; //si tiene espacios
const numerosREGEX = /\d/; //si contiene numeros

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

//~funciones para las valicaciones de los campos
function validarVacio(v) {
  if (v.value == "") {
    mensaje = `El campo ${v.name} no puede estar vacio`;
    v.setCustomValidity(mensaje);
  } else {
    mensaje = "";
    v.setCustomValidity(mensaje);
  }
}

function validarEspacios(v) {
  if (contieneEspaciosREGEX.test(v.value)) {
    mensaje = `El ${v.name} no puede contener espacios`;
    v.setCustomValidity(mensaje);
  }
}

function validarFormatoCorreo(v) {
  if (!emailREGEX.test(v.value)) {
    mensaje = `El formato de ${v.name} no es correcto
    Debe contener un algo@algo.com`;
    v.setCustomValidity(mensaje);
  } else {
    v.setCustomValidity("");
  }
}

function validarContieneNumero(v) {
  if (!numerosREGEX.test(v.value)) {
    mensaje = `El ${v.name} debe de contener al menos un numero`;
    v.setCustomValidity(mensaje);
  }
}

function validarNoContengaNumero(v) {
  if (numerosREGEX.test(v.value)) {
    mensaje = `El campo ${v.name} no puede contener numeros`;
    v.setCustomValidity(mensaje);
  }
}

function validarLogitud(v) {
  if (v.value.length < 6) {
    mensaje = `El campo ${v.name} debe tener al menos 6 caracteres`;
    v.setCustomValidity(mensaje);
  } else {
    mensaje = "";
    v.setCustomValidity("");
  }
}

function comparaContrsenas(v, contra) {
  if (v.value !== contra.value) {
    mensaje = "Las contraseñas no pueden ser diferentes";
    v.setCustomValidity(mensaje);
  }
}

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
//~Agregando funcionalidad el form de login para cuando se conceda acceso
formLogin.onsubmit = (e) => {
  e.preventDefault();
  const contrasenaLoginValidada = contrasenaLogin.value;
  const correoLoginValidado = correoLogin.value;

  //~Aqui ira la solicitud a la api para verificar si el usuario existe en la base de datos
  //!Falta hacer esta parte (de momento solo se desplegaran los valores en consola)
  console.log(`correo: ${correoLoginValidado}
  contraseña: ${contrasenaLoginValidada}`);
};

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
formRegistro.onsubmit = (e) => {
  e.preventDefault(); //para que no se borren los campos al estar validado el formulario
  //~ Guardamos los campos validados para usarlos
  const datosValildados = {
    correo: correoRegistro.value,
    contrasena: contrasenaRegistro.value,
    nombre: nombreRegistro.value,
    apellidos: apellidosRegistro.value,
    telefono: telefonoRegistro.value,
    direccion: direccionRegistro.value,
  };
  console.log(typeof datosValildados);
  console.log(datosValildados);
  const datosValildadosJSON = JSON.stringify(datosValildados); //object(javascript)->JSON
  console.log(typeof datosValildadosJSON);
  console.log(datosValildadosJSON);
  const datosObjectJavaScript = JSON.parse(datosValildadosJSON); //JSON -> object

  //~Una vez transformados a JSON hay que enviarlos a la api
};
