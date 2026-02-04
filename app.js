const dots = document.querySelectorAll('.dot');
const popup = document.getElementById('popup');
const video = document.getElementById('video');

dots.forEach(dot=>{
  dot.onclick = ()=>{
    video.src = dot.dataset.video;
    popup.classList.remove('hidden');
  }
});

document.getElementById('closePopup').onclick = ()=>{
  popup.classList.add('hidden');
  video.src = '';
};

function filterType(type){
  dots.forEach(d=>{
    d.style.display = d.classList.contains(type) ? 'block' : 'none';
  });
}

document.getElementById('clearBtn').onclick = ()=>{
  dots.forEach(d=>d.style.display='block');
};

function toggleTheme(){
  document.body.classList.toggle('light');
}

// ADS
document.querySelectorAll('.ad-wall').forEach(a=>{
  a.onclick=()=>window.open('https://www.tiktok.com/@solixx144','_blank');
});
