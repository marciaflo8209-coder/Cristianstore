/* === CONFIGURACIÓN INICIAL === */
const usuarios = {
  "Cristianstore": { password: "Cristian123", saldo: 9999, rol: "owner" },
  "FelipeStore": { password: "123felipe30", saldo: 9999, rol: "owner" },
  "usuario1": { password: "1234", saldo: 100, rol: "user" }
};

const productos = [
  { id: 1, nombre: "Licencia Premium 1 día", precio: 50, stock: 10, duracion: "1 día", licencia: "LIC-10001" },
  { id: 2, nombre: "Licencia 7 días", precio: 200, stock: 8, duracion: "7 días", licencia: "LIC-10002" },
  { id: 3, nombre: "Licencia 30 días", precio: 500, stock: 5, duracion: "30 días", licencia: "LIC-10003" },
  { id: 4, nombre: "VIP Dorado", precio: 1000, stock: 3, duracion: "Permanente", licencia: "LIC-10004" }
];

/* === LOGIN === */
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (usuarios[user] && usuarios[user].password === pass) {
    localStorage.setItem("usuarioActual", user);
    alert(`Bienvenido a Cristian Shop ${user}!`);
    window.location.href = "panel.html";
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
}

/* === PANEL PRINCIPAL === */
function cargarPanel() {
  const user = localStorage.getItem("usuarioActual");
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const userData = usuarios[user];
  document.getElementById("welcomeText").innerHTML = `👋 Bienvenido, <span class="neon-text">${user}</span>`;
  document.getElementById("saldoText").innerHTML = `💰 Saldo: $${userData.saldo}`;

  const productsContainer = document.getElementById("productsList");
  productsContainer.innerHTML = "";

  productos.forEach((p) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
      <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>Duración: ${p.duracion}</p>
      <p>Precio: <span class="neon-text">$${p.precio}</span></p>
      <p>Stock: ${p.stock}</p>
      <button onclick="comprarProducto(${p.id})">Comprar</button>
    `;

    productsContainer.appendChild(productCard);
  });

  // Mostrar panel admin si es owner
  if (userData.rol === "owner") {
    document.getElementById("adminPanelBtn").style.display = "block";
  }
}

/* === COMPRAR PRODUCTO === */
function comprarProducto(id) {
  const user = localStorage.getItem("usuarioActual");
  const userData = usuarios[user];
  const producto = productos.find(p => p.id === id);

  if (!producto || producto.stock <= 0) {
    alert("Producto agotado.");
    return;
  }

  if (userData.saldo < producto.precio) {
    alert("Saldo insuficiente. Añade más saldo para comprar este producto.");
    return;
  }

  userData.saldo -= producto.precio;
  producto.stock--;

  alert(`✅ Compra realizada con éxito!\n\nProducto: ${producto.nombre}\nDuración: ${producto.duracion}\nLicencia: ${producto.licencia}\nSaldo restante: $${userData.saldo}`);

  localStorage.setItem("usuarioActual", user);
  cargarPanel();
}

/* === PANEL ADMIN === */
function abrirAdminPanel() {
  const user = localStorage.getItem("usuarioActual");
  const userData = usuarios[user];

  if (userData.rol !== "owner") {
    alert("Acceso denegado.");
    return;
  }

  window.location.href = "owner.html";
}

/* === PANEL OWNER === */
function cargarOwnerPanel() {
  const user = localStorage.getItem("usuarioActual");
  const userData = usuarios[user];

  if (!userData || userData.rol !== "owner") {
    window.location.href = "panel.html";
    return;
  }

  // Mostrar usuarios
  const usersContainer = document.getElementById("usersList");
  usersContainer.innerHTML = "";

  Object.keys(usuarios).forEach(u => {
    const info = usuarios[u];
    const div = document.createElement("div");
    div.className = "admin-box";
    div.innerHTML = `
      <h3>${u}</h3>
      <p>Saldo: $${info.saldo}</p>
      <p>Rol: ${info.rol}</p>
      <button onclick="eliminarUsuario('${u}')">Borrar</button>
      <button onclick="cambiarRol('${u}')">Cambiar Rol</button>
    `;
    usersContainer.appendChild(div);
  });
}

function eliminarUsuario(nombre) {
  if (confirm(`¿Seguro que quieres borrar la cuenta de ${nombre}?`)) {
    delete usuarios[nombre];
    alert("Usuario eliminado.");
    cargarOwnerPanel();
  }
}

function cambiarRol(nombre) {
  if (usuarios[nombre].rol === "owner") {
    usuarios[nombre].rol = "user";
  } else {
    usuarios[nombre].rol = "owner";
  }
  alert(`Nuevo rol de ${nombre}: ${usuarios[nombre].rol}`);
  cargarOwnerPanel();
}

/* === CERRAR SESIÓN === */
function logout() {
  localStorage.removeItem("usuarioActual");
  window.location.href = "index.html";
    }
