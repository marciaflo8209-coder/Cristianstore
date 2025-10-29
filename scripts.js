// =======================
// CristianShop - Script de login
// =======================

// Crear usuarios iniciales si no existen
if (!localStorage.getItem("usuarios")) {
  const usuariosIniciales = {
    "Cristianstore": {
      password: "Cristian123",
      saldo: 999999,
      rol: "owner"
    },
    "FelipeStore": {
      password: "123felipe30",
      saldo: 9999,
      rol: "owner"
    }
  };
  localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
}

// Función principal de login
function login() {
  const userInput = document.getElementById("username").value.trim();
  const passInput = document.getElementById("password").value.trim();

  if (userInput === "" || passInput === "") {
    alert("⚠️ Ingresa usuario y contraseña.");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

  if (usuarios[userInput] && usuarios[userInput].password === passInput) {
    localStorage.setItem("usuarioActivo", userInput);
    alert(`✅ Bienvenido ${userInput} a CristianShop`);
    window.location.href = "panel.html";
  } else {
    alert("❌ Usuario o contraseña incorrectos.");
  }
}

// Vincular botón
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("loginBtn");
  if (btn) btn.addEventListener("click", login);
});
