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

import { getCarnes, putCarne } from "../modules/crudCarne/crudCarne.js";

import {
  desplegarTodosLosCortes,
  tituloRutina,
  buttonDivAgregarCarne,
} from "./modificarEliminarCarne.js";

const divModificarCarne = document.getElementById("divModificarCarne");
const carneFormModificar = document.getElementById("carneFormModificar");
const tipoCarneModificar = document.getElementById("tipoCarneModificar");
const nombreCarneModificar = document.getElementById("nombreModificar");
const descripcionModificar = document.getElementById("descripcionModificar");
const precioModificar = document.getElementById("precioModificar");
const imagenModificar = document.getElementById("imagenModificar");
const imagenArchivoModificar = document.getElementById("imagenArchivoNueva");
const mensajeDelServidorModificar =
  document.getElementById("MensajeDelServidor");
let imagenProcesadaNueva = "";
const corteCarne = document.getElementById("corteCarne");
const divImagenNueva = document.getElementById("divImagenNueva");
const imagenNueva = document.getElementById("imagenNueva");
let carnesObject = null;
let carneModificando = null;
//~Validamos los campos
tipoCarneModificar.addEventListener("invalid", (e) => {
  validarVacio(e.target);
});
tipoCarneModificar.addEventListener("change", (e) => {
  validarVacio(e.target);
});

nombreCarneModificar.addEventListener("invalid", (e) => {
  validarVacio(e.target);
  validarNoContengaNumero(e.target);
});
nombreCarneModificar.addEventListener("input", (e) => {
  validarVacio(e.target);
  validarNoContengaNumero(e.target);
});

descripcionModificar.addEventListener("invalid", (e) => {
  validarVacio(e.target);
});
descripcionModificar.addEventListener("input", (e) => {
  validarVacio(e.target);
});

precioModificar.addEventListener("invalid", (e) => {
  validarVacio(e.target);
  validarContieneCaracterEspecial(e.target);
  validarContieneLetras(e.target);
  validarEspacios(e.target);
  validarFormatoPrecio(e.target);
});
precioModificar.addEventListener("input", (e) => {
  validarVacio(e.target);
  validarContieneCaracterEspecial(e.target);
  validarContieneLetras(e.target);
  validarEspacios(e.target);
  validarFormatoPrecio(e.target);
});

imagenArchivoModificar.addEventListener("change", async (e) => {
  if (e.target.value === "") {
    divImagenNueva.style.display = "none";
    imagenNueva.src = "";
    imagenProcesadaNueva = "";
  } else {
    imagenProcesadaNueva = await mostrarImagen(e.target.files[0]);
    imagenNueva.src = imagenProcesadaNueva;
    divImagenNueva.style.display = "block";
  }
});

// corteCarne.addEventListener("change", (e) => {
//   if (e.target.value !== "") {
//     const indice = Number(e.target.value) - 1;
//     divModificarCarne.style.display = "flex";
//     carneModificando = carnesObject[indice];
//     llenarFormulario(carnesObject[indice]);
//   } else {
//     divModificarCarne.style.display = "none";
//   }
// });

// const llenarCortes = async () => {
//   const response = await getCarnes();
//   carnesObject = response.object;
//   carnesObject.forEach((carne) => {
//     meterDatoSelectCortes(carne.idCarne, carne.nombreCarne);
//   });
// };

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

  tipoCarneModificar.appendChild(opcion);
};

// const meterDatoSelectCortes = (idCarne, nombreCarne) => {
//   const option = document.createElement("option");
//   option.value = `${idCarne}`;
//   option.innerText = `${nombreCarne}`;

//   corteCarne.appendChild(option);
// };

// llenarCortes();

const llenarFormulario = (carne) => {
  carneFormModificar.value = carne.idCarne;
  ponerSelectEnUnValor(carne.fkIdTipoDeCorte, tipoCarneModificar);
  nombreCarneModificar.value = carne.nombreCarne;
  descripcionModificar.value = carne.descripcionCarne;
  precioModificar.value = carne.precioCarne;
  imagenModificar.src = `${carne.imagenCarne}`;
  carneModificando = carne;
};

const ponerSelectEnUnValor = (id, select) => {
  const opciones = select.children;
  for (let i = 0; i < opciones.length; i++) {
    const element = opciones[i];

    if (element.value == id) {
      element.selected = true;
    }
  }
};

const mostrarImagen = async (imageFile) => {
  const img = await blobToBase64(imageFile);
  const myB64Resized = await reduce_image_file_size(img);
  return myB64Resized;
};

carneFormModificar.onsubmit = async (e) => {
  e.preventDefault();
  const carneValidada = {
    idCarne: Number(carneFormModificar.value),
    nombreCarne: nombreCarneModificar.value,
    descripcionCarne: descripcionModificar.value,
    precioCarne: parseFloat(precioModificar.value), //*convertir a float
    imagenCarne: imagenProcesadaNueva,
    fkIdTipoDeCorte: Number(tipoCarneModificar.value), //*convertir a int
  };
  if (imagenProcesadaNueva === "") {
    carneValidada.imagenCarne = carneModificando.imagenCarne;
  }
  if (JSON.stringify(carneValidada) === JSON.stringify(carneModificando)) {
    mensajeDelServidorModificar.innerText = "Ningun campo fue modificado";
    setTimeout(() => {
      mensajeDelServidorModificar.innerText = "";
    }, 3000);
  } else {
    const response = await putCarne(carneValidada);
    const mensaje = response.mensaje;
    const datosCarne = response.object;
    if (datosCarne === null) {
      mensajeDelServidorModificar.innerText = mensaje;
      setTimeout(() => {
        mensajeDelServidorModificar.innerText = "";
        mensajeDelServidorModificar.style.display =
          mensajeDelServidorModificar.style.display === "none"
            ? "flex"
            : "none";
        tituloRutina.style.display =
          tituloRutina.style.display === "none" ? "flex" : "none";
      }, 3000);
    } else {
      mensajeDelServidorModificar.innerText = mensaje;
      desplegarTodosLosCortes();
      mensajeDelServidorModificar.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        mensajeDelServidorModificar.innerText = "";
        mensajeDelServidorModificar.style.display =
          mensajeDelServidorModificar.style.display === "none"
            ? "flex"
            : "none";
        tituloRutina.style.display =
          tituloRutina.style.display === "none" ? "flex" : "none";
        divModificarCarne.style.display = "none";
        divImagenNueva.style.display = "none";
        imagenNueva.src = "";
        imagenProcesadaNueva = "";
        buttonDivAgregarCarne.scrollIntoView({ behavior: "smooth" });
        carneFormModificar.reset();
        // ponerSelectEnUnValor("", corteCarne); //de momento no se utiliza
      }, 3000);
    }
  }
};

export { divModificarCarne, llenarFormulario, ponerSelectEnUnValor };
