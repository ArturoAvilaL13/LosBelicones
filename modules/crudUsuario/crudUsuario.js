import {
  postUsuarioURL,
  getUsuarioURL,
  putUsuarioURL,
  deleteUsuarioURL,
} from "./urlsUsuario.js";

async function postUsuario(usuario) {
  try {
    const response = await axios.post(postUsuarioURL, usuario);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getUsuario(campo) {
  try {
    const response = await axios.get(getUsuarioURL + campo);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getUsuarioCoCo(correo, contra) {
  try {
    const response = await axios.get(
      getUsuarioURL + correo + "/" + contra.toString()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function putUsuario(usuario) {
  try {
    const url = `${putUsuarioURL}${usuario.idUsuario}`;
    const response = await axios.put(url, usuario);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteUsuario(usuario) {
  try {
    const url = `${deleteUsuarioURL}${usuario.idUsuario}`;
    const response = await axios.delete(url);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { postUsuario, putUsuario, getUsuarioCoCo, deleteUsuario, getUsuario };
