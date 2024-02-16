//~URL base para la api
import { baseURL } from "../urlBase.js";

//~URL para la rutina de carne
//& Post
const postVideoURL = `${baseURL}video`;

//& Get
const getVideosURL = `${baseURL}videos`;

/* de momento esto no se pela
//? por id de carne
const getCarneByIdURL = `${baseURL}carne/`;
//? por tipo de carne
const getCarnesByTipoURL = `${baseURL}carne/tipo/`;

//& Put
const putCarneByIdURL = `${baseURL}carne/`;

//& Delete
const deleteCarneByIdURL = `${baseURL}carne/`;
*/
export {
  postVideoURL,
  getVideosURL,

  /* getCarneByIdURL,
  getCarnesByTipoURL,
  putCarneByIdURL,
  deleteCarneByIdURL,
    */
};
