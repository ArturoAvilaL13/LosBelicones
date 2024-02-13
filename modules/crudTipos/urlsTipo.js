//~URL base para la api
import { baseURL } from "../urlBase.js";

//~URL para get tipos de carnes
const getTiposDeCarnesUrl = `${baseURL}tipo/carnes`;

//~URL para get tipos de carnes
const getTiposDePagosUrl = `${baseURL}tipo/pagos`;

//~URL para get tipos de carnes
const getTiposDeEntregasUrl = `${baseURL}tipo/entregas`;

export { getTiposDeCarnesUrl, getTiposDePagosUrl, getTiposDeEntregasUrl };
