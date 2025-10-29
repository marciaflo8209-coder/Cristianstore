// === LOGIN.JS ===
// Sistema Cristian Shop

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await fetch("usuarios.json");
    const usuarios = await response.json();

    const user = usuarios.find(
      (u) => u.user === usuario && u.password === password
    );

    if (user) {
      // Guardar sesión local
      localStorage.setItem("usuario", user.user);
      localStorage.setItem("rol", user.rol);
      localStorage.setItem("saldo", user.saldo);

      // Redirigir al panel
      window.location.href = "panel.html";
    } else {
      alert("❌ Usuario o contraseña incorrectos");
    }
  } catch (error) {
    console.error("Error al cargar usuarios.json:", error);
    alert("Error de conexión. Intenta nuevamente.");
  }
});
