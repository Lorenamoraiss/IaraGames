let fontSize = 21;
const body = document.body;

document.getElementById("aumentar-fonte").addEventListener("click", () => {
  fontSize += 2;
  body.style.fontSize = `${fontSize}px`;
});

document.getElementById("diminuir-fonte").addEventListener("click", () => {
  if (fontSize > 12) {
    fontSize -= 2;
    body.style.fontSize = `${fontSize}px`;
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");

  if (loginButton) {
    loginButton.addEventListener("click", function () {
      window.location.href = "login.html";
    });
  } else {
    console.log("Botão não encontrado");
  }
});