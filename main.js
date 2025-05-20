// Capsule Lightbox functionality
document.querySelectorAll('.gallery-item img').forEach(image => {
  image.addEventListener('click', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const caption = lightbox.querySelector('.caption');
    lightboxImg.src = image.src;
    caption.textContent = image.closest('.capsule').querySelector('h2').textContent;
    lightbox.classList.remove('hidden');
  });
});

document.querySelector('.lightbox .close').addEventListener('click', () => {
  document.getElementById('lightbox').classList.add('hidden');
});

document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.add('hidden');
  }
});

// Filtering functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const category = this.getAttribute('data-category');
    document.querySelectorAll('.gallery-item').forEach(item => {
      if (category === 'all' || item.getAttribute('data-category') === category) {
        item.style.display = "flex";
        item.style.pointerEvents = "";
        setTimeout(()=>{item.style.opacity = "";}, 10);
      } else {
        item.style.opacity = "0";
        item.style.pointerEvents = "none";
        setTimeout(()=>{item.style.display = "none";}, 220);
      }
    });
  });
});
