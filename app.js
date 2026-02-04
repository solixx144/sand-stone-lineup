let locked = false;
let points = JSON.parse(localStorage.getItem("points") || "[]");

const mapContainer = document.getElementById("map-container");

function save() {
  localStorage.setItem("points", JSON.stringify(points));
}

function render() {
  document.querySelectorAll(".point").forEach(p => p.remove());
  points.forEach((p, i) => {
    const d = document.createElement("div");
    d.className = `point ${p.type}`;
    d.style.left = p.x + "px";
    d.style.top = p.y + "px";

    let offsetX, offsetY;

    d.addEventListener("touchstart", e => {
      if (locked) return;
      const t = e.touches[0];
      offsetX = t.clientX - d.offsetLeft;
      offsetY = t.clientY - d.offsetTop;
    });

    d.addEventListener("touchmove", e => {
      if (locked) return;
      const t = e.touches[0];
      let x = t.clientX - offsetX;
      let y = t.clientY - offsetY;

      x = Math.round(x / 30) * 30;
      y = Math.round(y / 30) * 30;

      d.style.left = x + "px";
      d.style.top = y + "px";

      points[i].x = x;
      points[i].y = y;
      save();
    });

    d.onclick = () => {
      if (p.video) window.open(p.video);
    };

    mapContainer.appendChild(d);
  });
}

function addPoint() {
  const type = document.getElementById("type").value;
  const video = document.getElementById("video").value;

  points.push({ x: 60, y: 60, type, video });
  save();
  render();
}

function toggleTheme() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
}

function toggleLock() {
  locked = !locked;
  alert(locked ? "Kilitledin" : "Kilit Açık");
}

render();
