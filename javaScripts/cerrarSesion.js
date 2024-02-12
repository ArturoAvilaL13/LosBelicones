import { limpiarTodoElLocalStorage } from "../modules/localStorage.js";

function cerrarSesion() {
  limpiarTodoElLocalStorage();
  location.href = "../index.html";
}

cerrarSesion();
