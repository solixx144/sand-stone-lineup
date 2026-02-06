const STORAGE = "sandstone_points";
const SNAP = 15;

let isAdmin = false;
let dragEl = null;

function init(admin){
  isAdmin = admin;
  renderPoints();
  bindAdd();
}

function loadPoints(){
  return JSON.parse(localStorage.getItem(STORAGE) || "[]");
}

function savePoints(p){
  localStorage.setItem(STORAGE, JSON.stringify(p));
}

function snap(v){ return Math.round(v / SNAP) * SNAP; }

function renderPoints(){
  const layer = document.getElementById("pointsLayer");
  const map = document.getElementById("mapImage");
  if(!layer || !map) return;

  layer.innerHTML = "";
  loadPoints().forEach((p,i)=>{
    const d = document.createElement("div");
    d.className = "point "+p.type;
    d.style.left = p.x;
    d.style.top = p.y;
    d.dataset.i = i;

    if(isAdmin){
      d.onmousedown = e => startDrag(e,d);
    }else if(p.video){
      d.onclick = ()=>openVideo(p.video);
    }

    layer.appendChild(d);
  });
}

function bindAdd(){
  if(!isAdmin) return;
  const wrap = document.getElementById("mapWrapper");
  const map = document.getElementById("mapImage");

  wrap.onclick = e=>{
    if(e.target.classList.contains("point")) return;
    const r = map.getBoundingClientRect();
    const x = snap(e.clientX - r.left);
    const y = snap(e.clientY - r.top);
    if(x<0||y<0||x>r.width||y>r.height) return;

    const pts = loadPoints();
    pts.push({
      x:(x/r.width*100)+"%",
      y:(y/r.height*100)+"%",
      type:document.getElementById("typeSelect").value,
      video:document.getElementById("videoInput").value
    });
    savePoints(pts);
    renderPoints();
  };
}

function startDrag(e,el){
  dragEl = el;
  document.onmousemove = moveDrag;
  document.onmouseup = stopDrag;
}

function moveDrag(e){
  if(!dragEl) return;
  const map = document.getElementById("mapImage");
  const r = map.getBoundingClientRect();
  const x = snap(e.clientX - r.left);
  const y = snap(e.clientY - r.top);

  dragEl.style.left = (x/r.width*100)+"%";
  dragEl.style.top = (y/r.height*100)+"%";
}

function stopDrag(){
  if(!dragEl) return;
  const i = dragEl.dataset.i;
  const pts = loadPoints();
  pts[i].x = dragEl.style.left;
  pts[i].y = dragEl.style.top;
  savePoints(pts);
  dragEl = null;
  document.onmousemove = null;
  document.onmouseup = null;
}

function toggleGrid(){
  const g = document.getElementById("grid");
  if(g) g.style.display = g.style.display==="none"?"block":"none";
}

function openVideo(url){
  const m=document.getElementById("videoModal");
  const f=document.getElementById("videoFrame");
  m.style.display="block"; f.src=url;
}
function closeVideo(){
  document.getElementById("videoModal").style.display="none";
  document.getElementById("videoFrame").src="";
}
function openAd(){
  window.open("https://www.tiktok.com/@solixx144","_blank");
}
