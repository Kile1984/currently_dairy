// Inicijalizacija mape i sloja
const map = L.map('map').setView([44.7866, 20.4489], 16); // Beograd, zoom 13

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);

L.marker([44.7866, 20.4489]).addTo(map);
