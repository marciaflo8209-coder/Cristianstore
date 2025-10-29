// === Configuración de Firebase ===
const firebaseConfig = {
  apiKey: "AIzaSyCrYYpV9IxUn-1Lmi7-spVxEtGucuceZF8",
  authDomain: "cristianstore-fecb3.firebaseapp.com",
  databaseURL: "https://cristianstore-fecb3-default-rtdb.firebaseio.com/",
  projectId: "cristianstore-fecb3",
  storageBucket: "cristianstore-fecb3.appspot.com",
  messagingSenderId: "763794005453",
  appId: "1:763794005453:web:a92a235f92fdf196d9b884"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// === PRUEBA DE LECTURA ===
db.collection("usuarios").get().then((snapshot) => {
  console.log("✅ Documentos encontrados en la colección 'usuarios':");
  snapshot.forEach((doc) => {
    console.log("🟢 ID:", doc.id, "=>", doc.data());
  });
}).catch((error) => {
  console.error("❌ Error leyendo la colección:", error);
});

// === LOGIN ===
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    // Buscar el documento con el mismo ID que el usuario
    const userDoc = await db.collection("usuarios").doc(username).get();

    if (!userDoc.exists) {
      alert("❌ Usuario no encontrado");
      return;
    }

    const userData = userDoc.data();

    if (userData.password === password) {
      // Guardar la sesión local
      localStorage.setItem("usuario", JSON.stringify(userData));
      alert(`✅ Bienvenido ${userData.user}!`);
      window.location.href = "panel.html";
    } else {
      alert("⚠️ Contraseña incorrecta");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("Ocurrió un error al iniciar sesión.");
  }
});
