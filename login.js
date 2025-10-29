// === CONFIGURACIÓN FIREBASE ===
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

// === FUNCIÓN DE LOGIN ===
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    // Buscar documento con ID = username (por ejemplo, "Cristianstore")
    const userDoc = await db.collection("users").doc(username).get();

    if (!userDoc.exists) {
      alert("❌ Usuario no encontrado");
      return;
    }

    const userData = userDoc.data();

    // Validar contraseña
    if (userData.Password !== password) {
      alert("⚠️ Contraseña incorrecta");
      return;
    }

    // Login exitoso
    alert(`✅ Bienvenido a Cristian Shop, ${username}!`);

    // Guardar sesión en localStorage
    localStorage.setItem("currentUser", JSON.stringify(userData));

    // Redirigir al panel
    window.location.href = "panel.html";

  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("🚨 Error al conectar con la base de datos");
  }
});
