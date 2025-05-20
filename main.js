document.querySelectorAll('.gallery-item img').forEach(image => {
    image.addEventListener('click', () => {
        const src = image.src;
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `<img src="${src}" alt="Lightbox Image"><span class="close">&times;</span>`;
        document.body.appendChild(lightbox);

        lightbox.querySelector('.close').addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });

        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
    });
});
