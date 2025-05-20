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
