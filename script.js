// Mapa inicial
const map = L.map('map').setView([-24.7829, -65.4232], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let puntos = [];
let linea = L.polyline([], { color: 'red' }).addTo(map);
let watchId = null;

function iniciar() {
  watchId = navigator.geolocation.watchPosition(pos => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    puntos.push([lat, lng]);
    linea.setLatLngs(puntos);
    map.setView([lat, lng], 16);

    const li = document.createElement('li');
    li.textContent = `#${puntos.length} → Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`;
    document.getElementById('lista').appendChild(li);
  });
}

function detener() {
  navigator.geolocation.clearWatch(watchId);
}

function limpiar() {
  detener();
  puntos = [];
  linea.setLatLngs([]);
  document.getElementById('lista').innerHTML = '';
}