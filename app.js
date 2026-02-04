// app.js — ana site
const STORAGE_KEY = 'st_points_v1'; // localStorage key
const pointsContainer = document.getElementById('points');
const popup = document.getElementById('popup');
const popupVideo = document.getElementById('popupVideo');
const closePopupBtn = document.getElementById('closePopup');
const themeToggle = document.getElementById('themeToggle');

// load and render points from localStorage
function loadPoints() {
  pointsContainer.innerHTML = '';
  let list = [];
  try { list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch(e){ list = []; }
  list.forEach(pt => {
    const el = document.createElement('div');
    el.className = 'dot ' + pt.type;
    // use percent positions (left/top)
    el.style.left = pt.left;
    el.style.top = pt.top;
    el.dataset.video = pt.video || '';
    el.title = pt.type;
    // click opens popup
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = el.dataset.video || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
      popupVideo.src = src;
      popup.classList.remove('hidden');
      popup.setAttribute('aria-hidden','false');
    });
    pointsContainer.appendChild(el);
  });
}

// filter by type (or all)
function filterType(type){
  const dots = document.querySelectorAll('#points .dot');
  if(type === 'all'){
    dots.forEach(d => d.style.display = 'block');
    return;
  }
  dots.forEach(d => d.style.display = d.classList.contains(type) ? 'block' : 'none');
}

// close popup
if(closePopupBtn){
  closePopupBtn.addEventListener('click', ()=>{
    popup.classList.add('hidden');
    popupVideo.src = '';
    popup.setAttribute('aria-hidden','true');
  });
}

// listen storage events (admin tab will write to localStorage)
window.addEventListener('storage', (e)=>{
  if(e.key === STORAGE_KEY){
    loadPoints();
  }
});

// initial load
loadPoints();

// theme toggle
if(themeToggle){
  themeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('theme-light');
    document.body.classList.toggle('theme-dark');
  });
}

// ad-wall clicks (open tiktok)
document.querySelectorAll('.ad-wall').forEach(a=>{
  a.addEventListener('click', ()=> window.open('https://www.tiktok.com/@solixx144','_blank'));
});
