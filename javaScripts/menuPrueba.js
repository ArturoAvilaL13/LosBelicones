import { getCarnes } from "../modules/crudCarne/crudCarne.js";
const divCatalogo = document.getElementById("productos-lista");

const getCarnesFromDB = async () => {
  const response = await getCarnes();
  const mensaje = response.mensaje;
  const carnes = response.object;
  return carnes;
};

getCarnesFromDB();
