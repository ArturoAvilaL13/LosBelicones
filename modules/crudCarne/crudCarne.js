import {
  postCarneURL,
  getCarnesURL,
  getCarneByIdURL,
  getCarnesByTipoURL,
  putCarneByIdURL,
  deleteCarneByIdURL,
} from "./urlsCarne.js";

async function postCarne(carne) {
  try {
    const response = await axios.post(postCarneURL, carne);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getCarnes() {
  try {
    const response = await axios.get(getCarnesURL);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getCarneById(idCarne) {
  try {
    const url = `${getCarneByIdURL}${Number(idCarne)}`;
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getCarnesByTipo(idTipo) {
  try {
    const url = `${getCarnesByTipoURL}${Number(idTipo)}`;
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function putCarne(carne) {
  try {
    const url = `${putCarneByIdURL}${carne.idCarne}`;
    const response = await axios.put(url, carne);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteCarneById(idCarne) {
  try {
    const url = `${deleteCarneByIdURL}${idCarne}`;
    const response = await axios.delete(url);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export {
  postCarne,
  getCarnes,
  getCarneById,
  getCarnesByTipo,
  putCarne,
  deleteCarneById,
};
