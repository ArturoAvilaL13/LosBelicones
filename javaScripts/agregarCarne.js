import {
  validarVacio,
  validarNoContengaNumero,
  validarContieneCaracterEspecial,
  validarContieneLetras,
  validarEspacios,
  validarFormatoPrecio,
} from "../modules/validacionesDeCampos.js";

import { blobToBase64 } from "../modules/imagesBase64/blobManager.js";
import { reduce_image_file_size } from "../modules/imagesBase64/resizeImage.js";

const carneForm = document.getElementById("carneForm");
const tipoCarne = document.getElementById("tipoCarne");
const nombreCarne = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const imagen = document.getElementById("imagen");
const imagenArchivo = document.getElementById("imagenArchivo");
const mensajeServidor = document.getElementById("mensajeServidor");
const divImagen = document.getElementById("divImagen");

//~Validamos los campos
tipoCarne.addEventListener("invalid", (e) => {
  validarVacio(e.target);
});
tipoCarne.addEventListener("change", (e) => {
  validarVacio(e.target);
});

nombreCarne.addEventListener("invalid", (e) => {
  validarVacio(e.target);
  validarNoContengaNumero(e.target);
});
nombreCarne.addEventListener("input", (e) => {
  validarVacio(e.target);
  validarNoContengaNumero(e.target);
});

descripcion.addEventListener("invalid", (e) => {
  validarVacio(e.target);
});
descripcion.addEventListener("input", (e) => {
  validarVacio(e.target);
});

precio.addEventListener("invalid", (e) => {
  validarVacio(e.target);
  validarContieneCaracterEspecial(e.target);
  validarContieneLetras(e.target);
  validarEspacios(e.target);
  validarFormatoPrecio(e.target);
});
precio.addEventListener("input", (e) => {
  validarVacio(e.target);
  validarContieneCaracterEspecial(e.target);
  validarContieneLetras(e.target);
  validarEspacios(e.target);
  validarFormatoPrecio(e.target);
});

imagenArchivo.addEventListener("invalid", (e) => {
  validarVacio(e.target);
});
imagenArchivo.addEventListener("change", async (e) => {
  validarVacio(e.target);
  const imagenProcesada = await mostrarImagen(e.target.files[0]);
  imagen.src = imagenProcesada;
  mensajeServidor.innerText = "";
  divImagen.style.display = "flex";
  imagen.style.display = "flex";
});

const mostrarImagen = async (imageFile) => {
  const img = await blobToBase64(imageFile);
  const myB64Resized = await reduce_image_file_size(img);
  return myB64Resized;
};
//~Agregar funcionalidad al formulario
carneForm.onsubmit = async (e) => {
  e.preventDefault();
  console.log("Todos los campos fueron validados");
  ///~Agregar conectividad a la api y hacer las variables necesarias
};
