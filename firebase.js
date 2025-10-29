// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

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
export const app = initializeApp(firebaseConfig);
