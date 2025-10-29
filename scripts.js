  
// =======================
// CristianShop - Script principal
// =======================

// Cuentas por defecto
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {
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

// Guardar en localStorage si no existen
localStorage.setItem("usuarios", JSON.stringify(usuarios));

/* === FUNCIÓN DE LOGIN === */
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!user || !pass) {
    alert("⚠️ Ingresa tu usuario y contraseña.");
    return;
  }

  const usuariosData = JSON.parse(localStorage.getItem("usuarios")) || {};

  if (usuariosData[user] && usuariosData[user].password === pass) {
    localStorage.setItem("usuarioActivo", user);
    alert("✅ Bienvenido a CristianShop, " + user + "!");
    window.location.href = "panel.html"; // Redirige al panel
  } else {
    alert("❌ Usuario o contraseña incorrectos.");
  }
}

/* === FUNCIÓN DE LOGOUT === */
function logout() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "index.html";
}

/* === VERIFICAR SESIÓN ACTIVA === */
function verificarSesion() {
  const usuarioActivo = localStorage.getItem("usuarioActivo");
  if (!usuarioActivo) {
    window.location.href = "index.html";
  }
}

/* === MOSTRAR DATOS DEL USUARIO EN PANEL === */
function mostrarUsuarioPanel() {
  const usuarioActivo = localStorage.getItem("usuarioActivo");
  const data = JSON.parse(localStorage.getItem("usuarios")) || {};
  if (!usuarioActivo || !data[usuarioActivo]) return;

  const usuario = data[usuarioActivo];
  document.getElementById("nombreUsuario").textContent = usuarioActivo;
  document.getElementById("saldoUsuario").textContent = usuario.saldo.toFixed(2);

  if (usuario.rol === "owner") {
    document.getElementById("ownerPanelBtn").style.display = "block";
  }
}
