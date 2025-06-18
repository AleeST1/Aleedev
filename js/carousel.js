document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.project-carousel');
    if (!carousel) return;

    const container = carousel.querySelector('.carousel-container');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const indicators = carousel.querySelectorAll('.indicator');

    let currentSlide = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    // Funções de navegação
    function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        slides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');
        });

        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        slides[currentSlide].classList.add(index > currentSlide ? 'prev' : 'next');
        slides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Eventos de clique nos botões
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Eventos de indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });

    // Eventos touch para dispositivos móveis
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        container.style.transition = 'none';
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;

        // Limita o arraste
        if (Math.abs(diff) < window.innerWidth) {
            slides.forEach(slide => {
                slide.style.transform = `translateX(${diff}px)`;
            });
        }
    }, { passive: true });

    container.addEventListener('touchend', () => {
        isDragging = false;
        const diff = currentX - startX;
        const threshold = window.innerWidth * 0.2; // 20% da largura da tela

        slides.forEach(slide => {
            slide.style.transform = '';
            slide.style.transition = 'transform 0.3s ease-out';
        });

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }

        // Resetar posição se não houver mudança de slide
        setTimeout(() => {
            slides.forEach(slide => {
                slide.style.transition = '';
            });
        }, 300);
    });

    // Inicialização
    showSlide(0);
});