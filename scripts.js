/* === FUNCIONES CARRITO === */
let cart = [];

function addToCart(name, price) {
  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<div class="empty-cart"><p>Tu carrito está vacío</p></div>';
    cartCount.textContent = "0";
    cartTotal.textContent = "Total: S/ 0";
    return;
  }

  let total = 0;
  cartItems.innerHTML = cart
    .map((item, i) => {
      total += item.price * item.quantity;
      return `
        <div class="cart-item">
          <span>${item.name} (x${item.quantity})</span>
          <span>S/ ${item.price * item.quantity}</span>
          <button class="remove-btn" onclick="removeFromCart(${i})">X</button>
        </div>
      `;
    })
    .join("");

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal.textContent = "Total: S/ " + total;
}

function openCart() {
  document.getElementById("cartModal").style.display = "block";
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function sendCartWhatsApp() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let mensaje = "🛒 *Pedido desde RonalDev*%0A%0A";
  let total = 0;

  cart.forEach((item, index) => {
    // 👇 usa item.title || item.name || item.product (lo que exista)
    const nombre = item.title || item.name || item.product || "Producto";
    mensaje += `${index + 1}. ${nombre} - S/ ${item.price}%0A`;
    total += item.price;
  });

  mensaje += `%0A💵 *Total: S/ ${total}*%0A%0A`;
  mensaje += "📌 He leído y acepto las condiciones de servicio.";
  mensaje += "%0A📞 Un asesor de RonalDev se comunicará contigo pronto.";

  // Número de WhatsApp
  const whatsappNumber = "51960334494"; // 👈 este es tu número correcto
  const url = `https://wa.me/${whatsappNumber}?text=${mensaje}`;

  // Abrir WhatsApp en nueva pestaña
  window.open(url, "_blank");

  // 🔄 Vaciar carrito después de enviar
  cart = [];
  updateCart();

  // ✅ Confirmación
  alert("✅ Pedido enviado con éxito. Tu carrito ha sido vaciado.");
}

/* === FORMULARIO === */
function contactWhatsApp() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Limpiar mensajes previos
  document.getElementById("error-name").textContent = "";
  document.getElementById("error-email").textContent = "";
  document.getElementById("error-message").textContent = "";

  let isValid = true;

  // Validación nombre
  if (!name) {
    document.getElementById("error-name").textContent =
      "⚠️ Por favor ingresa tu nombre.";
    isValid = false;
  }

  // Validación email
  if (!email) {
    document.getElementById("error-email").textContent =
      "⚠️ El campo correo es obligatorio.";
    isValid = false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById("error-email").textContent =
        "📧 Ingresa un correo válido con @ (ejemplo: usuario@dominio.com).";
      isValid = false;
    }
  }

  // Validación mensaje
  if (!message) {
    document.getElementById("error-message").textContent =
      "⚠️ Por favor escribe tu mensaje.";
    isValid = false;
  }

  // Si hay errores, no sigue
  if (!isValid) return;

  // Mensaje a WhatsApp
  const text = `📩 *Nueva consulta desde la web RonalDev*  

👤 Nombre: ${name}  
📧 Correo: ${email}  

📝 Mensaje:  
${message}`;

  const whatsappURL = `https://wa.me/51960334494?text=${encodeURIComponent(
    text
  )}`;
  window.open(whatsappURL, "_blank");

  // Limpia formulario
  document.getElementById("contactForm").reset();
}

document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Construimos el mensaje profesional
    const data = {
      name,
      email,
      message,
      _subject: "Nueva consulta desde la web RonalDev",
      _format: "plain", // aseguras que llegue como texto plano legible
    };

    try {
      let response = await fetch(form.action, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert(
          "✅ Tu mensaje fue enviado correctamente. Pronto te contactaremos."
        );
        form.reset();
        window.location.href = "#contacto"; // redirige a tu web
      } else {
        alert("⚠️ Hubo un problema al enviar el mensaje. Inténtalo de nuevo.");
      }
    } catch (error) {
      alert("❌ Error de conexión. Inténtalo más tarde.");
    }
  });

// 🔹 Alternar menú hamburguesa
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}

// 🔹 Cerrar menú al hacer clic en un enlace + scroll suave
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Cierra el menú después de hacer clic
    document.querySelector(".nav-links").classList.remove("active");
  });
});
