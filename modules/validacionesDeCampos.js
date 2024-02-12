let mensaje = "";
const numerosREGEX = /\d/;
const contieneEspaciosREGEX = /\s/;
const emailREGEX = /^[\w.+\-]+@{1}\w+\.{1}com$/;

//~funciones para las valicaciones de los campos
function validarVacio(campo) {
  if (campo.value == "") {
    mensaje = `El campo ${campo.name} no puede estar vacio`;
    campo.setCustomValidity(mensaje);
  } else {
    mensaje = "";
    campo.setCustomValidity(mensaje);
  }
}

function validarContieneNumero(v) {
  if (!numerosREGEX.test(v.value)) {
    mensaje = `El ${v.name} debe de contener al menos un numero`;
    v.setCustomValidity(mensaje);
  }
}

function validarNoContengaNumero(campo) {
  if (numerosREGEX.test(campo.value)) {
    mensaje = `El campo ${campo.name} no puede contener numeros`;
    campo.setCustomValidity(mensaje);
  }
}

function validarEspacios(campo) {
  if (contieneEspaciosREGEX.test(campo.value)) {
    mensaje = `El ${campo.name} no puede contener espacios`;
    campo.setCustomValidity(mensaje);
  }
}

function validarFormatoCorreo(campo) {
  if (!emailREGEX.test(campo.value)) {
    mensaje = `El formato de ${campo.name} no es correcto
      Debe contener un algo@algo.com`;
    campo.setCustomValidity(mensaje);
  } else {
    campo.setCustomValidity("");
  }
}

function comparaContrsenas(contra1, contra2) {
  if (contra1.value !== contra2.value) {
    mensaje = "Las contraseñas no pueden ser diferentes";
    contra1.setCustomValidity(mensaje);
  }
}

function validarLogitud(campo) {
  if (campo.value.length < 6) {
    mensaje = `El campo ${campo.name} debe tener al menos 6 caracteres`;
    campo.setCustomValidity(mensaje);
  } else if (campo.value.length > 20) {
    mensaje = `El campo ${campo.name} no debe tener mas de 20 caracteres`;
    campo.setCustomValidity(mensaje);
  } else {
    mensaje = "";
    campo.setCustomValidity("");
  }
}

export {
  validarVacio,
  validarContieneNumero,
  validarNoContengaNumero,
  validarEspacios,
  validarFormatoCorreo,
  comparaContrsenas,
  validarLogitud,
};
