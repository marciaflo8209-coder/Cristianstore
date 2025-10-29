// Importar funciones de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCrYYpV9IxUn-1Lmi7-spVxEtGucuceZF8",
  authDomain: "cristianstore-fecb3.firebaseapp.com",
  databaseURL: "https://cristianstore-fecb3-default-rtdb.firebaseio.com/",
  projectId: "cristianstore-fecb3",
  storageBucket: "cristianstore-fecb3.appspot.com",
  messagingSenderId: "763794005453",
  appId: "1:763794005453:web:a92a235f92fdf196d9b884"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función de inicio de sesión
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  try {
    const userRef = doc(db, "users", "cristian_admin"); // Documento que creaste
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();

      if (data.username === username && data.password === password) {
        alert("✅ Bienvenido a Cristian Shop");
        localStorage.setItem("usuario", username);
        localStorage.setItem("rango", data.rango);
        window.location.href = "panel.html";
      } else {
        alert("❌ Usuario o contraseña incorrectos");
      }
    } else {
      alert("⚠️ No se encontró el usuario en la base de datos.");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("Ocurrió un error al iniciar sesión. Revisa la consola.");
  }
});
