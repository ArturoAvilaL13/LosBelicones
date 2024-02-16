const usuario = "usuario";
const tipoUsuario = "tipoUsuario";
const carrito = "carrito";

const revisarLocalStorageUsuario = () => {
  if (localStorage.getItem(usuario) !== null) {
    return true;
  }
  return false;
};

const revisarLocalStorageCarrito = () =>{
if(localStorage.getItem(carrito)!==null){
  return true;
}
return false;
}

const getLocalStorageCarrito= ()=>{
  return localStorage.getItem(carrito);
}

const putLocalStorageCarrito = (object) =>{
  localStorage.removeItem(carrito);
  postLocalStorageCarrito(object);
}

const postLocalStorageCarrito = (object) =>{
  localStorage.setItem(carrito,JSON.stringify(object));
}

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
  revisarLocalStorageCarrito,
  getLocalStorageCarrito,
  putLocalStorageCarrito,
  postLocalStorageCarrito
};
