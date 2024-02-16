import { getLocalStorageTipoUsuario } from "../modules/localStorage.js";

const navbarOpcionesInicio = document.getElementById("navbarOpcionesInicio");
const navbarOpciones = document.getElementById("navbarOpciones");
const navbarOpcionesAdmin = document.getElementById("navbarOpcionesAdmin");

const opcionesInicio = [
  { titulo: "", url: "", hr: true },
  { titulo: "Inicio", url: "./inicio.html", hr: false },
  { titulo: "", url: "", hr: true },
];

const opciones = [
  { titulo: "Menu", url: "./menu.html", hr: false },
  { titulo: "", url: "", hr: true },
  { titulo: "Acerca de MEET MEAT", url: "./acercaDeNosotros.html", hr: false },
  { titulo: "¿Belic One's?", url: "./acercaDeBelicones.html", hr: false },
  { titulo: "¡Contactanos!", url: "./contactanos.html", hr: false },
  { titulo: "", url: "", hr: true },
  { titulo: "Modificar cuenta", url: "./modificarUsuario.html", hr: false },
  { titulo: "Eliminar cuenta", url: "./eliminarCuenta.html", hr: false },
  { titulo: "", url: "", hr: true },
  { titulo: "Cerrar Sesion", url: "./cerrarSesion.html", hr: false },
  { titulo: "", url: "", hr: true },
];

const opcionesAdmin = [
  {
    titulo: "Agregar/Modificar/Eliminar Carnes",
    url: "./modificarEliminarCarne.html",
    hr: false,
  },
  // {
  //   titulo: "Agregar/Modificar/Eliminar Videos",
  //   url: "./modificarEliminarVideos.html",
  //   hr: false,
  // },
  { titulo: "", url: "", hr: true },
];

const llenarNavbar = (
  opcionesInicio,
  opciones,
  opcionesAdmin,
  navbarOpcionesInicio,
  navbarOpciones,
  navbarOpcionesAdmin
) => {
  const tipoUsuario = getLocalStorageTipoUsuario();
  opcionesInicio.forEach((opcion) => {
    if (opcion.hr) {
      añadirHrALalista(navbarOpcionesInicio);
    } else {
      añadirElementoALaLista(opcion, navbarOpcionesInicio);
    }
  });
  if (tipoUsuario == 1) {
    opcionesAdmin.forEach((opcionAdmin) => {
      if (opcionAdmin.hr) {
        añadirHrALalista(navbarOpcionesAdmin);
      } else {
        añadirElementoALaLista(opcionAdmin, navbarOpcionesAdmin);
      }
    });
  }
  opciones.forEach((opcion) => {
    if (opcion.hr) {
      añadirHrALalista(navbarOpciones);
    } else {
      añadirElementoALaLista(opcion, navbarOpciones);
    }
  });
};

const añadirElementoALaLista = (opcion, divPadre) => {
  const elemento = document.createElement("li");
  elemento.classList.add("nav-item");

  const linkElemento = document.createElement("a");
  linkElemento.classList.add("nav-link", "texto-navegacion");
  linkElemento.ariaCurrent = "page";
  linkElemento.href = opcion.url;
  linkElemento.innerText = opcion.titulo;

  elemento.appendChild(linkElemento);
  divPadre.appendChild(elemento);
};

const añadirHrALalista = (divPadre) => {
  const separador = document.createElement("hr");
  separador.classList.add("navHr");
  divPadre.appendChild(separador);
};

llenarNavbar(
  opcionesInicio,
  opciones,
  opcionesAdmin,
  navbarOpcionesInicio,
  navbarOpciones,
  navbarOpcionesAdmin
);
