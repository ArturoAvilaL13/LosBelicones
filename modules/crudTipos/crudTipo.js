import {
  getTiposDeCarnesUrl,
  getTiposDePagosUrl,
  getTiposDeEntregasUrl,
} from "./urlsTipo.js";

async function getTiposDeCarnes() {
  try {
    const response = await axios.get(getTiposDeCarnesUrl);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getTiposDePagos() {
  try {
    const response = await axios.get(getTiposDePagosUrl);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getTiposDeEntregas() {
  try {
    const response = await axios.get(getTiposDeEntregasUrl);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { getTiposDeCarnes, getTiposDePagos, getTiposDeEntregas };
