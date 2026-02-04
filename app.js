const points = document.querySelectorAll('.point');
const popup = document.getElementById('popup');
const video = document.getElementById('video');
const filterButtons = document.querySelectorAll('.filters button');

points.forEach(p => {
  p.addEventListener('click', () => {
    video.src = p.dataset.video;
    popup.style.display = 'flex';
  });
});

function closePopup(){
  popup.style.display = 'none';
  video.src = '';
}

/* FİLTRE */
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    points.forEach(p => {
      p.style.display = p.classList.contains(type) ? 'block' : 'none';
    });
  });
});