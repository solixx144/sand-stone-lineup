const STORAGE = "sandstone_points";
const SNAP = 15;

const mapWrapper = document.getElementById("mapWrapper");
const pointsLayer = document.getElementById("pointsLayer");
const grid = document.getElementById("grid");
const typeSelect = document.getElementById("typeSelect");
const videoInput = document.getElementById("videoInput");

function loadPoints() {
  return JSON.parse(localStorage.getItem(STORAGE) || "[]");
}

function savePoints(p) {
  localStorage.setItem(STORAGE, JSON.stringify(p));
}

function renderPoints() {
  pointsLayer.innerHTML = "";
  loadPoints().forEach(p => {
    const el = document.createElement("div");
    el.className = "point " + p.type;
    el.style.left = p.x;
    el.style.top = p.y;
    el.onclick = () => openVideo(p.video);
    pointsLayer.appendChild(el);
  });
}

function snap(v) {
  return Math.round(v / SNAP) * SNAP;
}

function addPoint(clientX, clientY) {
  const rect = mapWrapper.getBoundingClientRect();
  const x = snap(clientX - rect.left);
  const y = snap(clientY - rect.top);

  const px = (x / rect.width * 100) + "%";
  const py = (y / rect.height * 100) + "%";

  const pts = loadPoints();
  pts.push({
    type: typeSelect ? typeSelect.value : "smoke",
    video: videoInput ? videoInput.value : "",
    x: px,
    y: py
  });

  savePoints(pts);
  renderPoints();
}

mapWrapper?.addEventListener("click", e => {
  addPoint(e.clientX, e.clientY);
});

mapWrapper?.addEventListener("touchstart", e => {
  e.preventDefault();
  const t = e.touches[0];
  addPoint(t.clientX, t.clientY);
}, { passive:false });

function toggleGrid() {
  if (!grid) return;
  grid.style.display = grid.style.display === "none" ? "block" : "none";
}

function openVideo(url) {
  if (!url) return;
  document.getElementById("videoModal").style.display = "block";
  document.getElementById("videoFrame").src = url;
}

function closeVideo() {
  document.getElementById("videoModal").style.display = "none";
  document.getElementById("videoFrame").src = "";
}

function openAd() {
  window.open("https://www.tiktok.com/@solixx144", "_blank");
}

renderPoints();
