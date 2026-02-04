/* app.js - ortak kod
   - snap grid = 15
   - percent coords saved
   - admin: add/edit/delete/export/import
   - main: view + open video popup
*/

const STORAGE_KEY = 'st_points_v1';
const GRID = 15; // snap in px

const isAdmin = location.pathname.includes('admin');
const mapWrapper = document.getElementById('mapWrapper');
const mapImage = document.getElementById('mapImage');
const pointsLayer = document.getElementById('pointsLayer');
const gridEl = document.getElementById('grid');
const popup = document.getElementById('popup');
const popupVideo = document.getElementById('popupVideo');
const closePopup = document.getElementById('closePopup');

function getStored(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch(e){ return []; } }
function setStored(list){ localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

// convert client XY to percent relative to mapImage
function pxToPercent(clientX, clientY){
  const r = mapImage.getBoundingClientRect();
  const relX = Math.max(0, Math.min(clientX - r.left, r.width));
  const relY = Math.max(0, Math.min(clientY - r.top, r.height));
  return { left: (relX / r.width * 100).toFixed(4) + '%', top: (relY / r.height * 100).toFixed(4) + '%' };
}

// snap client coordinates to grid inside the map image and return absolute client coords
function snapToGrid(clientX, clientY){
  const r = mapImage.getBoundingClientRect();
  const relX = Math.max(0, Math.min(clientX - r.left, r.width));
  const relY = Math.max(0, Math.min(clientY - r.top, r.height));
  const snappedX = Math.round(relX / GRID) * GRID;
  const snappedY = Math.round(relY / GRID) * GRID;
  return { x: r.left + snappedX, y: r.top + snappedY };
}

// render points (both admin and main)
function renderPoints(){
  if(!pointsLayer) return;
  pointsLayer.innerHTML = '';
  const list = getStored();
  list.forEach((pt, idx) => {
    const el = document.createElement('div');
    el.className = (isAdmin ? 'draggable-dot ' : 'point ') + pt.type;
    el.style.left = pt.left;
    el.style.top = pt.top;
    el.dataset.index = idx;
    el.dataset.video = pt.video || '';

    if(!isAdmin){
      // main: click opens popup video if exists
      el.addEventListener('click', (e)=> {
        const src = el.dataset.video || '';
        if(src){
          popupVideo.src = src;
          popup.classList.remove('hidden');
          popup.setAttribute('aria-hidden','false');
        }
      });
    } else {
      // admin behaviors: dblclick edit, longpress delete, pointer drag (works for touch+mouse)
      el.addEventListener('dblclick', (e)=>{
        e.stopPropagation();
        const typeSelect = document.getElementById('typeSelect');
        const videoInput = document.getElementById('videoInput');
        if(typeSelect && videoInput){
          typeSelect.value = pt.type;
          videoInput.value = pt.video || '';
          document.querySelectorAll('.draggable-dot').forEach(x=>x.style.outline='');
          el.style.outline = '2px solid #ffd';
          el.dataset.edit = '1';
        }
      });

      // long press to delete (touch)
      let longpressTimer = null;
      const startLP = (ev) => {
        ev.preventDefault();
        longpressTimer = setTimeout(()=> {
          if(confirm('Bu noktayı sil?')){
            const arr = getStored();
            arr.splice(idx,1);
            setStored(arr);
            renderPoints();
          }
        }, 700);
      };
      const cancelLP = ()=> { if(longpressTimer){ clearTimeout(longpressTimer); longpressTimer = null; } };
      el.addEventListener('touchstart', startLP, { passive:false });
      el.addEventListener('touchend', cancelLP);
      el.addEventListener('touchmove', cancelLP);
      el.addEventListener('contextmenu', (ev)=>{ ev.preventDefault(); if(confirm('Bu noktayı silmek istiyor musun?')){ const arr=getStored(); arr.splice(idx,1); setStored(arr); renderPoints(); } });

      // pointer-based drag (works for touch and mouse if browser supports pointer events)
      el.style.touchAction = 'none';
      el.addEventListener('pointerdown', (ev)=>{
        ev.preventDefault();
        el.setPointerCapture(ev.pointerId);
        el.classList.add('dragging');

        const onMove = (m) => {
          const snapped = snapToGrid(m.clientX, m.clientY);
          const pct = pxToPercent(snapped.x, snapped.y);
          el.style.left = pct.left;
          el.style.top = pct.top;
        };
        const onUp = (u) => {
          try{ el.releasePointerCapture(ev.pointerId); } catch(e){}
          el.classList.remove('dragging');
          document.removeEventListener('pointermove', onMove);
          document.removeEventListener('pointerup', onUp);
          // save final
          const idx2 = parseInt(el.dataset.index,10);
          if(!isNaN(idx2)){
            const arr = getStored();
            arr[idx2].left = el.style.left;
            arr[idx2].top = el.style.top;
            arr[idx2].video = el.dataset.video || arr[idx2].video || '';
            setStored(arr);
            renderPoints();
          }
        };
        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup', onUp);
      });
    }

    pointsLayer.appendChild(el);
  });
}

// popup close
if(closePopup){
  closePopup.addEventListener('click', ()=> {
    popup.classList.add('hidden');
    popupVideo.src = '';
    popup.setAttribute('aria-hidden','true');
  });
}

// storage event: when admin updates in other tab, main will update
window.addEventListener('storage', (e)=>{
  if(e.key === STORAGE_KEY) renderPoints();
});

// initial render (after map load)
if(mapImage && mapImage.complete) renderPoints();
else mapImage?.addEventListener('load', renderPoints);
window.addEventListener('resize', renderPoints);

/* ============================
   Admin-only features
   ============================ */
if(isAdmin){
  const addPointBtn = document.getElementById('addPointBtn');
  const typeSelect = document.getElementById('typeSelect');
  const videoInput = document.getElementById('videoInput');
  const toggleGridBtn = document.getElementById('toggleGridBtn');
  const exportBtn = document.getElementById('exportBtn');
  const importBtn = document.getElementById('importBtn');
  const importFile = document.getElementById('importFile');

  // add at center
  addPointBtn.addEventListener('click', ()=>{
    const r = mapImage.getBoundingClientRect();
    const centerX = r.left + r.width/2;
    const centerY = r.top + r.height/2;
    const snapped = snapToGrid(centerX, centerY);
    const pct = pxToPercent(snapped.x, snapped.y);
    const arr = getStored();
    arr.push({ type: typeSelect.value, left: pct.left, top: pct.top, video: videoInput.value || '' });
    setStored(arr);
    renderPoints();
    alert('Nokta eklendi.');
  });

  // click/tap map to add (touch friendly)
  mapWrapper.addEventListener('click', (e)=>{
    if(e.target && (e.target.id === 'mapImage' || e.target.id === 'grid')) {
      const snapped = snapToGrid(e.clientX, e.clientY);
      const pct = pxToPercent(snapped.x, snapped.y);
      const arr = getStored();
      arr.push({ type: typeSelect.value, left: pct.left, top: pct.top, video: videoInput.value || '' });
      setStored(arr);
      renderPoints();
    }
  });

  // toggle grid visibility
  toggleGridBtn.addEventListener('click', ()=>{
    const visible = gridEl.style.display !== 'none';
    gridEl.style.display = visible ? 'none' : 'block';
    toggleGridBtn.textContent = visible ? '📐 Grid Göster' : '📐 Grid Gizle';
  });

  // export/import
  exportBtn.addEventListener('click', ()=>{
    const arr = getStored();
    const blob = new Blob([JSON.stringify(arr,null,2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'sandstone_points.json'; a.click(); URL.revokeObjectURL(url);
  });
  importBtn.addEventListener('click', ()=> importFile.click());
  importFile.addEventListener('change', (ev)=>{
    const f = ev.target.files[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = (e)=>{
      try{
        const parsed = JSON.parse(e.target.result);
        if(Array.isArray(parsed)){ setStored(parsed); renderPoints(); alert('Import başarılı'); } else alert('Geçersiz format');
      }catch(err){ alert('JSON okunamadı'); }
    };
    reader.readAsText(f);
  });

  // when add is pressed with an edit target selected, update it instead
  addPointBtn.addEventListener('click', ()=>{
    const editEl = document.querySelector('.draggable-dot[data-edit="1"]');
    if(editEl){
      const idx = parseInt(editEl.dataset.index,10);
      const arr = getStored();
      arr[idx].type = typeSelect.value;
      arr[idx].video = videoInput.value || '';
      setStored(arr);
      editEl.dataset.edit = '0';
      editEl.style.outline = '';
      renderPoints();
      alert('Seçili nokta güncellendi.');
    }
  });
}

/* ============================
   Filters and theme toggle on main
   ============================ */
document.querySelectorAll('.filterBtn').forEach(b=>{
  b.addEventListener('click', ()=> {
    const t = b.dataset.type;
    document.querySelectorAll('#pointsLayer .point').forEach(p => {
      p.style.display = p.classList.contains(t) ? 'block' : 'none';
    });
  });
});
document.getElementById('btnAll')?.addEventListener('click', ()=> {
  document.querySelectorAll('#pointsLayer .point').forEach(p => p.style.display = 'block');
});

document.getElementById('themeToggle')?.addEventListener('click', ()=>{
  document.body.classList.toggle('theme-light');
  document.body.classList.toggle('theme-dark');
});
