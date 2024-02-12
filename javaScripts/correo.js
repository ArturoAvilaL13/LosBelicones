import {
  validarVacio,
  validarNoContengaNumero,
  validarFormatoCorreo,
  validarEspacios,
} from "../modules/validacionesDeCampos.js";

const nombre = document.getElementById("nombre");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");
const comentario = document.getElementById("comentario");
const formulario = document.getElementById("camposEntrada");

nombre.addEventListener("invalid", (e) => {
  validarVacio(e.target);
  validarNoContengaNumero(e.target);
});

nombre.addEventListener("input", (e) => {
  validarVacio(e.target);
  validarNoContengaNumero(e.target);
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
