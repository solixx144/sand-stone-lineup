const map = document.getElementById("map");
let locked = false;

const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

// ADMIN'DEN GELEN NOKTALARI ÇEK
function loadDots() {
  map.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("dots") || "[]");

  data.forEach(d => {
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = d.x + "px";
    dot.style.top = d.y + "px";

    if (!isMobile) enableDrag(dot);

    map.appendChild(dot);
  });
}

function enableDrag(el) {
  let dragging = false;

  el.addEventListener("mousedown", e => {
    if (locked) return;
    dragging = true;
  });

  document.addEventListener("mousemove", e => {
    if (!dragging) return;
    el.style.left = e.clientX + "px";
    el.style.top = e.clientY + "px";
    saveCurrent();
  });

  document.addEventListener("mouseup", () => dragging = false);
}

// KAYDET
function saveCurrent() {
  const dots = [];
  document.querySelectorAll(".dot").forEach(d => {
    dots.push({
      x: parseInt(d.style.left),
      y: parseInt(d.style.top)
    });
  });
  localStorage.setItem("dots", JSON.stringify(dots));
}

// UI
document.getElementById("lockBtn").onclick = () => {
  locked = !locked;
  document.getElementById("lockBtn").textContent = locked ? "🔓 Aç" : "🔒 Kilitle";
};

document.getElementById("clearBtn").onclick = () => {
  localStorage.removeItem("dots");
  loadDots();
};

// TEMA
document.getElementById("themeSwitch").onclick = () => {
  document.body.classList.toggle("light");
};

loadDots();