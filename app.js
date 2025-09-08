const apiKey = "oM2HH2Aji7TzyCH7kRm8aRBgiLoz3URG";
const urlAPI = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&countryCode=CO&size=50`;

let selectedEvent = null;
let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

// 🎶 Obtener y mostrar conciertos
async function getConcerts(query = "") {
  try {
    const res = await fetch(urlAPI);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    const events = data._embedded?.events || [];

    const filtered = events.filter(ev =>
      ev.name.toLowerCase().includes(query.toLowerCase()) ||
      ev._embedded.venues[0].city.name.toLowerCase().includes(query.toLowerCase())
    );

    renderEvents(filtered, query);
  } catch (err) {
    console.error("Error API:", err);
  }
}

// 🎨 Renderizar conciertos
function renderEvents(events, query) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  if (events.length === 0) {
    container.innerHTML = `<p class="text-center text-danger">😢 No se encontraron conciertos para "${query}".</p>`;
    return;
  }

  events.forEach(ev => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card shadow-lg border-0 rounded-3 h-100">
          <img src="${ev.images[0].url}" class="card-img-top" alt="${ev.name}">
          <div class="card-body">
            <h5 class="card-title text-primary">${ev.name}</h5>
            <p class="card-text">
              📍 ${ev._embedded.venues[0].name}, ${ev._embedded.venues[0].city.name} <br>
              📅 ${ev.dates.start.localDate}
            </p>
            <button class="btn btn-warning text-dark" onclick='openModal(${JSON.stringify(ev)})'>Comprar</button>
          </div>
        </div>
      </div>`;
  });
}

// 🛒 Modal de compra
function openModal(event) {
  selectedEvent = event;
  document.getElementById("eventName").innerText = event.name;
  document.getElementById("eventDetails").innerText =
    `📍 ${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name} | 📅 ${event.dates.start.localDate}`;

  const tickets = document.getElementById("tickets");
  tickets.value = 1;
  document.getElementById("totalPrice").innerText = 50000;

  tickets.oninput = () => document.getElementById("totalPrice").innerText = 50000 * tickets.value;

  new bootstrap.Modal(document.getElementById("buyModal")).show();
  document.getElementById("confirmPurchase").onclick = () => confirmPurchase(tickets.value);
}

// ✅ Confirmar compra
function confirmPurchase(qty) {
  const total = 50000 * qty;
  purchases.push({
    id: Date.now(),
    event: selectedEvent.name,
    venue: selectedEvent._embedded.venues[0].name,
    city: selectedEvent._embedded.venues[0].city.name,
    date: selectedEvent.dates.start.localDate,
    quantity: qty,
    total
  });

  localStorage.setItem("purchases", JSON.stringify(purchases));
  renderHistory();
  bootstrap.Modal.getInstance(document.getElementById("buyModal")).hide();

  Swal.fire("🎉 Compra realizada", `${qty} boleta(s) para ${selectedEvent.name}`, "success");
  launchConfetti();
}

// 🗑️ Eliminar compra
function deletePurchase(id) {
  Swal.fire({
    title: "¿Eliminar compra?",
    text: "No podrás recuperarla luego",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Sí, eliminar"
  }).then(res => {
    if (res.isConfirmed) {
      purchases = purchases.filter(p => p.id !== id);
      localStorage.setItem("purchases", JSON.stringify(purchases));
      renderHistory();
      Swal.fire("🗑️ Eliminada", "La compra fue eliminada", "success");
    }
  });
}

// 📜 Renderizar historial
function renderHistory() {
  const history = document.getElementById("purchaseHistory");
  history.innerHTML = purchases.length
    ? purchases.map(p => `
        <div class="col-md-6 mb-3">
          <div class="card bg-dark text-white shadow-lg">
            <div class="card-body">
              <h5>${p.event}</h5>
              <p>📍 ${p.venue}, ${p.city} <br> 📅 ${p.date} <br> 🎟️ ${p.quantity} <br> 💲 ${p.total} COP</p>
              <button class="btn btn-danger btn-sm" onclick="deletePurchase(${p.id})">Eliminar</button>
            </div>
          </div>
        </div>`).join("")
    : `<p class="text-light">No hay compras registradas.</p>`;
}

// 🎉 Confeti
function launchConfetti() {
  const end = Date.now() + 1200;
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// 🚀 Inicializar
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchInput").addEventListener("input", e => getConcerts(e.target.value));
  getConcerts();
  renderHistory();
});
