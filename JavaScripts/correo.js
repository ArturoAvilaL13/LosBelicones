const nombre = document.getElementById("nombre");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");
const comentario = document.getElementById("comentario");
const enviar = document.getElementById("enviar");
const formulario = document.getElementById("camposEntrada");

const numerosREGEX = /\d/;
const contieneEspaciosREGEX = /\s/;
const emailREGEX = /^[\w.+\-]+@{1}\w+\.{1}com$/;
const vacioREGEX = /^[^.]+$/;

let mensaje = "";

function validarVacio(v) {
  if (v.value == "") {
    mensaje = `El ${v.name} no puede estar vacio`;
    v.setCustomValidity(mensaje);
  } else {
    mensaje = "";
    v.setCustomValidity(mensaje);
  }
}

function validarContieneNumero(v) {
  if (numerosREGEX.test(v.value)) {
    mensaje = `El ${v.name} no puede contener numeros`;
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

function validarEspacios(v) {
  if (contieneEspaciosREGEX.test(v.value)) {
    mensaje = `El ${v.name} no puede contener espacios`;
    v.setCustomValidity(mensaje);
  }
}

function validacionesNombre(e) {
  if (!validarVacio(e)) {
    validarContieneNumero(e);
  }
}

nombre.addEventListener("invalid", (e) => {
  validarVacio(e.target);
  validarContieneNumero(e.target);
});

nombre.addEventListener("input", (e) => {
  validarVacio(e.target);
  validarContieneNumero(e.target);
});

telefono.addEventListener("invalid", (e) => {
  validarVacio(e.target);
});
telefono.addEventListener("input", (e) => {
  validarVacio(e.target);
});

correo.addEventListener("invalid", (e) => {
  validarFormatoCorreo(e.target);
  validarEspacios(e.target);
});
correo.addEventListener("input", (e) => {
  validarFormatoCorreo(e.target);
  validarEspacios(e.target);
});

comentario.addEventListener("invalid", (e) => {
  validarVacio(e.target);
});
comentario.addEventListener("input", (e) => {
  validarVacio(e.target);
});

function enviarCorreo() {
  const meetMeatCorreo = "meetmeatmerida@outlook.com";
  const asunto = `¡${nombre.value} tiene comentarios!`;
  const body = `Hola soy ${nombre.value}, y quisiera hacerte lleguar lo siguiente.

        ${comentario.value}

        Datos para contactarlo:

        Telefono: ${telefono.value}
        Correo: ${correo.value}
        `;
  const mailtoLink = `mailto:${meetMeatCorreo}?subject=${encodeURIComponent(
    asunto
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;
}

formulario.addEventListener("submit", () => {
  enviarCorreo();
  location.reload();
});
