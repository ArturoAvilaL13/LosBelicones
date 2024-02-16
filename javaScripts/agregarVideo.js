import { postVideo } from "../modules/crudVideo/crudVideo.js";

const videoForm = document.getElementById("videoForm");
const tipoCarne = document.getElementById("tipoCarne");
const tituloVideo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const urlVideo = document.getElementById("urlVideo");
const MensajeDelServidor = document.getElementById("MensajeDelServidor");



tituloVideo.addEventListener("invalid", (e) => {
    validarVacio(e.target);
    validarNoContengaNumero(e.target);
  });
  tituloVideo.addEventListener("input", (e) => {
    validarVacio(e.target);
    validarNoContengaNumero(e.target);
  });
  
  descripcion.addEventListener("invalid", (e) => {
    validarVacio(e.target);
  });
  descripcion.addEventListener("input", (e) => {
    validarVacio(e.target);
  });
  
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
videoForm.onsubmit = async (e) => {
    e.preventDefault();
    const urlValida = {
      urlVideo: urlVideo.value,
      tituloVideo: tituloVideo.value,
      descripcionVideo: descripcion.value,
      fkIdTipoDeCorte: Number(tipoCarne.value), //*convertir a int
    };
    ///~Agregar conectividad a la api y hacer las variables necesarias
    // console.log(carneValidada.imagenCarne);
    const response = await postVideo(urlValida);
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
      await desplegarTodosLosCortes();
      setTimeout(() => {
        MensajeDelServidor.innerText = "";
       videoForm.reset();
        imagen.src = "";
        mensajeImagen.innerText = "Ninguna Imagen seleccionada";
        divImagen.style.display = "none";
        imagen.style.display = "none";
      }, 3000);
    }
  };
  