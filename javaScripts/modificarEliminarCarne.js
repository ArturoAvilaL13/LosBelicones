import { getCarnes, deleteCarneById } from "../modules/crudCarne/crudCarne.js";
import { getTiposDeCarnes } from "../modules/crudTipos/crudTipo.js";
//~Variables para el formulario de modificar
import {
  divModificarCarne,
  llenarFormulario,
  ponerSelectEnUnValor,
} from "../javaScripts/modificarCarne.js";

const divCortes = document.getElementById("menuCortes");
const buttonDivAgregarCarne = document.getElementById("buttonAgregarCorteDiv");
const divAgregarCarne = document.getElementById("agregarCarneDiv");
const tituloRutina = document.getElementById("tituloRutina");
const tipoCorteFiltro = document.getElementById("tipoCarneFiltro");
let tiposDeCortes;
let carnesCompletas;
const buttonCancelarModificacion = document.getElementById("cancelarCambios");

const creaCard = (divContenedor, carne) => {
  const divCard = document.createElement("div");
  divCard.classList.add("card");
  divCard.value = `${carne.idCarne}`;
  divCard.id = "tarjeta";

  const imagenCarneCard = document.createElement("img");
  imagenCarneCard.src = `${carne.imagenCarne}`; //*cambiar despues
  imagenCarneCard.classList.add("card-img-top");
  imagenCarneCard.id = "imagenTarjeta";

  const divTitulo = document.createElement("div");
  divTitulo.classList.add("card-body");
  divTitulo.id = "divTitulo";

  const h5Titulo = document.createElement("h5");
  h5Titulo.classList.add("card-title", "subtitulo");
  h5Titulo.id = "tituloTarjeta";
  h5Titulo.innerText = `${carne.nombreCarne}`;
  divTitulo.appendChild(h5Titulo);

  const divDropdown = document.createElement("div");
  divDropdown.classList.add("dropdown", "card-body");
  divDropdown.id = "masInfo";

  const buttonDropDown = document.createElement("button");
  buttonDropDown.classList.add(
    "btn",
    "dropdown-toggle",
    "borde-modificado",
    "texto-navegacion"
  );
  buttonDropDown.setAttribute("type", "button");
  buttonDropDown.setAttribute("data-bs-toggle", "dropdown");
  buttonDropDown.setAttribute("aria-expanded", "false");
  buttonDropDown.setAttribute("id", "btnMasInfo");
  buttonDropDown.innerText = "Mas informacion";
  divDropdown.appendChild(buttonDropDown);

  const ulDropDown = document.createElement("ul");
  ulDropDown.classList.add("dropdown-menu");
  ulDropDown.id = "listaMasInfo";
  divDropdown.appendChild(ulDropDown);

  const liTipo = document.createElement("li");
  liTipo.classList.add("dropdown-item", "texto-navegacion");
  liTipo.id = "tipoCorteTarjeta";
  liTipo.value = `${carne.fkIdTipoDeCorte}`; //*¿cambiar despues?
  liTipo.innerHTML = `${tiposDeCortes[carne.fkIdTipoDeCorte - 1].tipoDeCorte}`; //*cambiar despues
  ulDropDown.appendChild(liTipo);

  const liPrecio = document.createElement("li");
  liPrecio.classList.add("dropdown-item", "texto-navegacion");
  liPrecio.id = "precioTarjeta";
  liPrecio.value = `${carne.precioCarne}`; //*¿cambiar despues?
  liPrecio.innerHTML = `${carne.precioCarne}`; //*cambiar despues
  ulDropDown.appendChild(liPrecio);

  const liDescripcion = document.createElement("li");
  liDescripcion.classList.add("dropdown-item");
  ulDropDown.appendChild(liDescripcion);

  const pDescripcion = document.createElement("p");
  pDescripcion.classList.add("card-text", "texto-navegacion");
  pDescripcion.id = "descripcionTarjeta";
  pDescripcion.innerHTML = `${carne.descripcionCarne}`; //*cambiar despues
  liDescripcion.appendChild(pDescripcion);

  const liButtons = document.createElement("li");
  liButtons.classList.add("dropdown-item");
  ulDropDown.appendChild(liButtons);

  const divButtonsLi = document.createElement("div");
  divButtonsLi.id = "divBotones";
  liButtons.appendChild(divButtonsLi);

  //! Boton para modificar elementos ******************************************************
  const buttonModificar = document.createElement("button");
  buttonModificar.classList.add("texto-navegacion", "borde-modificado");
  buttonModificar.setAttribute("type", "button");
  buttonModificar.innerText = "Modificar";
  divButtonsLi.appendChild(buttonModificar);
  buttonModificar.onclick = function () {
    const indice = divCard.value - 1;
    cambiarEstadoDivModificarCarne();
    llenarFormulario(carne);
  };
  //! Boton para Eliminar elementos ********************************************************

  const buttonEliminar = document.createElement("button");
  buttonEliminar.classList.add("texto-navegacion", "borde-modificado", "btn");
  buttonEliminar.setAttribute("type", "button");
  buttonEliminar.innerText = "Eliminar";
  divButtonsLi.appendChild(buttonEliminar);
  buttonEliminar.onclick = async function () {
    const response = await deleteCarneById(divCard.value);
    divCard.remove();
    // buttonEliminar.parentElement.parentElement.parentElement.parentElement.parentElement;
  };
  //!Aqui terminar el button eliminar***********************************************************
  //agregamos los elementos a la card
  divCard.appendChild(imagenCarneCard);
  divCard.appendChild(divTitulo);
  divCard.appendChild(divDropdown);

  //agregar el divcard al contenedor
  divContenedor.appendChild(divCard);
};

const getCarnesFromDB = async () => {
  const response = await getCarnes();
  const mensaje = response.mensaje;
  const carnes = response.object;
  return carnes;
};

const desplegarTodosLosCortes = async () => {
  ponerSelectEnUnValor("", tipoCorteFiltro);
  while (divCortes.firstChild) {
    divCortes.removeChild(divCortes.firstChild);
  }

  carnesCompletas.forEach((carne) => {
    creaCard(divCortes, carne);
  });
};

const desplegarTodosLosCortesInicio = async () => {
  carnesCompletas = await getCarnesFromDB();
  const response = await getTiposDeCarnes();

  tiposDeCortes = response.object;
  tiposDeCortes.forEach((corte) => {
    agretarTipoAlSelect(corte);
  });

  if (carnesCompletas !== null) {
    carnesCompletas.forEach((carne) => {
      creaCard(divCortes, carne);
    });
  }
};

// const llenarTipoDeCortes = async () => {
//   const response = await getTiposDeCarnes();

//   tiposDeCortes = response.object;
//   tiposDeCortes.forEach((corte) => {
//     agretarTipoAlSelect(corte);
//   });
// };

const agretarTipoAlSelect = (tipo) => {
  const opcion = document.createElement("option");
  opcion.value = tipo.idTipoDeCorte;
  opcion.innerText = tipo.tipoDeCorte;

  tipoCorteFiltro.appendChild(opcion);
};

desplegarTodosLosCortesInicio();
const desplegarCortesPorTipo = (id) => {
  while (divCortes.firstChild) {
    divCortes.removeChild(divCortes.firstChild);
  }
  if (divModificarCarne.style.display === "flex") {
    cambiarEstadoDivModificarCarne();
  }
  carnesCompletas.forEach((carne) => {
    if (carne.fkIdTipoDeCorte == id) {
      creaCard(divCortes, carne);
    }
  });
};

buttonDivAgregarCarne.addEventListener("click", () => {
  cambiarEstadoDivAgregarCarne();
});

tipoCorteFiltro.addEventListener("change", (e) => {
  desplegarCortesPorTipo(e.target.value);
});

const cambiarEstadoDivAgregarCarne = () => {
  tituloRutina.innerText = "Agrega un tipo de corte/carne nuevo";
  tituloRutina.style.display =
    tituloRutina.style.display === "none" ? "flex" : "none";
  MensajeDelServidor.style.display =
    MensajeDelServidor.style.display === "none" ? "flex" : "none";
  divAgregarCarne.style.display =
    divAgregarCarne.style.display === "none" ? "flex" : "none";
  divAgregarCarne.scrollIntoView({ behavior: "smooth" });
};

const cambiarEstadoDivModificarCarne = () => {
  tituloRutina.innerText = "Carne a modificar";
  tituloRutina.style.display =
    tituloRutina.style.display === "none" ? "flex" : "none";
  MensajeDelServidor.style.display =
    MensajeDelServidor.style.display === "none" ? "flex" : "none";
  divModificarCarne.style.display =
    divModificarCarne.style.display === "none" ? "flex" : "none";
  divModificarCarne.scrollIntoView({ behavior: "smooth" });
};

buttonCancelarModificacion.addEventListener("click", () => {
  cambiarEstadoDivModificarCarne();
  buttonDivAgregarCarne.scrollIntoView({ behavior: "smooth" });
});

export {
  desplegarTodosLosCortes,
  buttonDivAgregarCarne,
  tituloRutina,
  cambiarEstadoDivModificarCarne,
  cambiarEstadoDivAgregarCarne,
};
