//~URL base para la api
const baseURL = "http://localhost:8080/api/v1/";

//~URL para la rutina de usuaio
const postUsuarioURL = `${baseURL}usuario`;
//^ getUsuarioURL se puede obtener de 3 formas, lo cual se debe manejar cuando se haga el get completandolo
//?usuario/checar/{correo}/{contrasena}
//?usuario/checar/{correo}
//?usuario/checar/{id}
const getUsuarioURL = `${baseURL}usuario/checar/`;
//^ putUsuarioURL ocupa completarse de la siguiente forma
//?usuario/{id}
const putUsuarioURL = `${baseURL}usuario/`;
//^ deleteUsuarioURL ocupa completarse de la siguiente forma
//?usuario/{id}
const deleteUsuarioURL = `${baseURL}usuario/`;

export { postUsuarioURL, getUsuarioURL, putUsuarioURL, deleteUsuarioURL };
