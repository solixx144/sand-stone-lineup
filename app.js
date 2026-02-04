const menuBtn=document.getElementById('menuBtn')
const menu=document.getElementById('menu')
const dots=document.querySelectorAll('.dot')
const popup=document.getElementById('popup')
const video=document.getElementById('video')
const closePopup=document.getElementById('closePopup')
let locked=false

menuBtn.onclick=()=>menu.classList.toggle('hidden')

document.getElementById('lightBtn').onclick=()=>document.body.className='light'
document.getElementById('darkBtn').onclick=()=>document.body.className='dark'

menu.querySelectorAll('button[data-type]').forEach(btn=>{
  btn.onclick=()=>{
    const type=btn.dataset.type
    dots.forEach(d=>d.style.display=d.classList.contains(type)?'block':'none')
  }
})

closePopup.onclick=()=>{popup.classList.add('hidden');video.src=''}

dots.forEach(dot=>{
  dot.onclick=()=>{
    video.src=dot.dataset.video
    popup.classList.remove('hidden')
  }
})

document.getElementById('clearBtn').onclick=()=>dots.forEach(d=>d.style.display='block')

document.getElementById('lockBtn').onclick=()=>{
  locked=!locked
  alert(locked?'Kilitledin':'Kilit açıldı')
}
