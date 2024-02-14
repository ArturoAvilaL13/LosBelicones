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

import { getTiposDeCarnes } from "../modules/crudTipos/crudTipo.js";

import { postCarne } from "../modules/crudCarne/crudCarne.js";

import { desplegarTodosLosCortes } from "./modificarEliminarCarne.js";

const carneForm = document.getElementById("carneForm");
const tipoCarne = document.getElementById("tipoCarne");
const nombreCarne = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const imagen = document.getElementById("imagen");
const imagenArchivo = document.getElementById("imagenArchivo");
const mensajeImagen = document.getElementById("mensajeImagen");
const divImagen = document.getElementById("divImagen");
const MensajeDelServidor = document.getElementById("MensajeDelServidor");
let imagenProcesada = null;
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
  if (e.target.value === "") {
    imagen.src = "";
    mensajeImagen.innerText = "Ninguna Imagen seleccionada";
    divImagen.style.display = "none";
    imagen.style.display = "none";
  } else {
    imagenProcesada = await mostrarImagen(e.target.files[0]);
    imagen.src = imagenProcesada;
    mensajeImagen.innerText = "";
    divImagen.style.display = "flex";
    imagen.style.display = "flex";
  }
});

const mostrarImagen = async (imageFile) => {
  const img = await blobToBase64(imageFile);
  const myB64Resized = await reduce_image_file_size(img);
  return myB64Resized;
};

const obtenerTiposDeCarnes = async () => {
  const response = await getTiposDeCarnes();
  // console.log(response);
  const mensaje = response.mensaje;
  const datas = response.object;
  datas.forEach((data) => {
    agretarTipoAlSelect(data);
  });
};
obtenerTiposDeCarnes();
const agretarTipoAlSelect = (tipo) => {
  const opcion = document.createElement("option");
  opcion.value = tipo.idTipoDeCorte;
  opcion.innerText = tipo.tipoDeCorte;

  tipoCarne.appendChild(opcion);
};

//~Agregar funcionalidad al formulario
carneForm.onsubmit = async (e) => {
  e.preventDefault();
  const carneValidada = {
    nombreCarne: nombreCarne.value,
    descripcionCarne: descripcion.value,
    precioCarne: parseFloat(precio.value), //*convertir a float
    imagenCarne: imagenProcesada,
    fkIdTipoDeCorte: Number(tipoCarne.value), //*convertir a int
  };
  ///~Agregar conectividad a la api y hacer las variables necesarias
  console.log(carneValidada.imagenCarne);
  const response = await postCarne(carneValidada);
  const mensaje = response.mensaje;
  const data = response.object;

  if (data === null) {
    MensajeDelServidor.innerText = mensaje;
    setTimeout(() => {
      MensajeDelServidor.innerText = "";
    }, 3000);
  } else {
    MensajeDelServidor.innerText = mensaje;
    MensajeDelServidor.scrollIntoView({ behavior: "smooth" });
    desplegarTodosLosCortes();
    setTimeout(() => {
      MensajeDelServidor.innerText = "";
      carneForm.reset();
      imagen.src = "";
      mensajeImagen.innerText = "Ninguna Imagen seleccionada";
      divImagen.style.display = "none";
      imagen.style.display = "none";
    }, 5000);
  }
};
