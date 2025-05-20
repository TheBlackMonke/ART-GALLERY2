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
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentFilter = 'all';

// Filtering by category
filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentFilter = this.getAttribute('data-category');
    filterGallery();
  });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', filterGallery);

function filterGallery() {
  const search = searchInput.value.toLowerCase();
  galleryItems.forEach(item => {
    const cat = item.getAttribute('data-category');
    const title = item.querySelector('h2').textContent.toLowerCase();
    const desc = item.querySelector('p').textContent.toLowerCase();
    const tags = Array.from(item.querySelectorAll('.tags span')).map(s=>s.textContent.toLowerCase());
    let matchesSearch = (
      title.includes(search) ||
      desc.includes(search) ||
      tags.some(tag => tag.includes(search))
    );
    let matchesCategory = (currentFilter === 'all' || cat === currentFilter);
    if (matchesSearch && matchesCategory) {
      item.style.display = "flex";
      setTimeout(()=>{item.style.opacity = "";}, 10);
    } else {
      item.style.opacity = "0";
      item.style.pointerEvents = "none";
      setTimeout(()=>{item.style.display = "none";}, 220);
    }
  });
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function() {
    const answer = this.nextElementSibling;
    const open = answer.classList.contains('open');
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
    if (!open) {
      answer.classList.add('open');
      this.classList.add('active');
    }
  });
});
