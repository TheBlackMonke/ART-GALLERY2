// Animated art background (colorful moving blobs)
const canvas = document.getElementById('art-bg');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const blobs = Array.from({length: 5}).map((_,i) => ({
  x: Math.random()*width,
  y: Math.random()*height,
  r: 180 + Math.random()*120,
  dx: 0.4 + Math.random()*0.6,
  dy: 0.4 + Math.random()*0.6,
  hue: 200 + Math.random()*160,
  alpha: 0.28 + Math.random()*0.17
}));

function animateBg() {
  ctx.clearRect(0,0,width,height);
  blobs.forEach((blob,i) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(blob.x,blob.y,blob.r,0,Math.PI*2,false);
    ctx.fillStyle = `hsla(${blob.hue},70%,75%,${blob.alpha})`;
    ctx.shadowColor = `hsla(${blob.hue},80%,65%,0.23)`;
    ctx.shadowBlur = 80;
    ctx.fill();
    ctx.restore();

    blob.x += Math.sin(Date.now()/1700 + i*13)*blob.dx;
    blob.y += Math.cos(Date.now()/1400 + i*6)*blob.dy;
    if(blob.x < -blob.r) blob.x = width+blob.r;
    if(blob.x > width+blob.r) blob.x = -blob.r;
    if(blob.y < -blob.r) blob.y = height+blob.r;
    if(blob.y > height+blob.r) blob.y = -blob.r;
  });
  requestAnimationFrame(animateBg);
}
animateBg();

// Capsule filtering
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.getAttribute('data-filter');
    document.querySelectorAll('.capsule').forEach(capsule => {
      if(filter === 'all' || capsule.dataset.category === filter) {
        capsule.style.display = 'flex';
        setTimeout(()=>{capsule.style.opacity = 1}, 10);
      } else {
        capsule.style.opacity = 0;
        setTimeout(()=>{capsule.style.display = 'none'}, 220);
      }
    });
  });
});

// Capsule lightbox
document.querySelectorAll('.capsule img').forEach(img => {
  img.addEventListener('click', function() {
    const src = img.src;
    const title = img.closest('.capsule').querySelector('h2').textContent;
    const lightbox = document.getElementById('lightbox');
    lightbox.querySelector('img').src = src;
    lightbox.querySelector('.lightbox-title').textContent = title;
    lightbox.classList.remove('hidden');
  });
});
document.querySelector('.lightbox .close').onclick = function() {
  document.getElementById('lightbox').classList.add('hidden');
};
document.getElementById('lightbox').onclick = function(e) {
  if(e.target === this) this.classList.add('hidden');
};
