//~URL base para la api
const baseURL = "http://localhost:8080/api/v1/";

//~URL para la rutina de carne
//& Post
const postCarneURL = `${baseURL}carne`;

//& Get
const getCarnesURL = `${baseURL}carnes`;
//? por id de carne
const getCarneByIdURL = `${baseURL}carne/`;
//? por tipo de carne
const getCarnesByTipoURL = `${baseURL}carne/tipo/`;

//& Put
const putCarneByIdURL = `${baseURL}carne/`;

//& Delete
const deleteCarneByIdURL = `${baseURL}carne/`;

export {
  postCarneURL,
  getCarnesURL,
  getCarneByIdURL,
  getCarnesByTipoURL,
  putCarneByIdURL,
  deleteCarneByIdURL,
};
