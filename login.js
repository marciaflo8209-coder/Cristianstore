import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const db = getFirestore();

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  const docRef = doc(db, "usuarios", usuario);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data.password === password) {
      localStorage.setItem("usuario", usuario);
      localStorage.setItem("rol", data.rol);
      window.location.href = "panel.html";
    } else {
      alert("Contraseña incorrecta");
    }
  } else {
    alert("Usuario no encontrado");
  }
});
