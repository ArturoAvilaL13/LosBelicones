const usuario = "usuario";
const tipoUsuario = "tipoUsuario";

const revisarLocalStorageUsuario = () => {
  if (localStorage.getItem(usuario) !== null) {
    return true;
  }
  return false;
};

const getLocalStorageUsuario = () => {
  return localStorage.getItem(usuario);
};

const getLocalStorageTipoUsuario = () => {
  return localStorage.getItem(tipoUsuario);
};

const limpiarTodoElLocalStorage = () => {
  localStorage.clear();
};

const enviarAIndexLocalStorage = () => {
  if (localStorage.getItem(usuario) === null) {
    limpiarTodoElLocalStorage();
    location.href = "../index.html";
  }
};

const tipoUsuarioLocalStorage = () => {
  return localStorage.getItem(tipoUsuario);
};

export {
  revisarLocalStorageUsuario,
  getLocalStorageUsuario,
  getLocalStorageTipoUsuario,
  limpiarTodoElLocalStorage,
  enviarAIndexLocalStorage,
  tipoUsuarioLocalStorage,
};
