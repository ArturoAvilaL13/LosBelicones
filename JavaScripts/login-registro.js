//* Divs a mostar/ocultar
const loginDiv = document.getElementById("login");
const registroDiv = document.getElementById("registro");
//* Texto que lo controlara
const textoRegistro = document.getElementById("textoRegistro");
const textoLogin = document.getElementById("textoLogin");

textoRegistro.addEventListener("click", () => {
  loginDiv.style.display = "none";
  registroDiv.style.display = "flex";
});

textoLogin.addEventListener("click", () => {
  loginDiv.style.display = "flex";
  registroDiv.style.display = "none";
});
