let currentType = 'smoke';
const pointsDiv = document.getElementById('points');

function setType(type) {
  currentType = type;
  document.querySelectorAll('.point').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.' + type).forEach(p => p.style.display = 'block');
}

function clearPoints() {
  pointsDiv.innerHTML = '';
}

pointsDiv.addEventListener('click', e => {
  const rect = pointsDiv.getBoundingClientRect();
  const point = document.createElement('div');
  point.className = 'point ' + currentType;
  point.style.left = (e.clientX - rect.left) + 'px';
  point.style.top = (e.clientY - rect.top) + 'px';
  point.onclick = openVideo;
  pointsDiv.appendChild(point);
});

function openVideo(e) {
  e.stopPropagation();
  document.getElementById('videoPopup').classList.remove('hidden');
}
function closeVideo() {
  document.getElementById('videoPopup').classList.add('hidden');
}

// Menü
const menuBtn = document.getElementById('menuBtn');
menuBtn.onclick = () => document.getElementById('sideMenu').classList.toggle('hidden');

// Tema
document.getElementById('darkBtn').onclick = () => document.body.className = 'theme-dark';
document.getElementById('lightBtn').onclick = () => document.body.className = 'theme-light';