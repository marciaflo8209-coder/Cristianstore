// === CONFIGURACIÓN DE FIREBASE ===
const firebaseConfig = {
  apiKey: "AIzaSyCrYYpV9IxUn-1Lmi7-spVxEtGucuceZF8",
  authDomain: "cristianstore-fecb3.firebaseapp.com",
  databaseURL: "https://cristianstore-fecb3-default-rtdb.firebaseio.com/",
  projectId: "cristianstore-fecb3",
  storageBucket: "cristianstore-fecb3.appspot.com",
  messagingSenderId: "763794005453",
  appId: "1:763794005453:web:a92a235f92fdf196d9b884"
};

// === INICIALIZA FIREBASE ===
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// === LOGIN ===
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("⚠️ Por favor ingresa tu usuario y contraseña.");
    return;
  }

  try {
    // Buscar el documento dentro de la colección "Usuarios"
    const userDoc = await db.collection("Usuarios").doc(username).get();

    if (!userDoc.exists) {
      alert("❌ Usuario no encontrado");
      return;
    }

    const userData = userDoc.data();

    // Validar contraseña
    if (userData.Password !== password) {
      alert("❌ Contraseña incorrecta");
      return;
    }

    // Guardar datos del usuario en localStorage
    localStorage.setItem("usuarioActivo", JSON.stringify(userData));

    alert("✅ Inicio de sesión exitoso");

    // Redirigir según el rol del usuario
    if (userData.Rol === "Owner" || userData.Rol === "Owner ") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "panel.html";
    }

  } catch (error) {
    console.error("Error en el login:", error);
    alert("⚠️ Error al iniciar sesión. Intenta nuevamente.");
  }
});
