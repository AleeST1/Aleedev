/**
 * Arquivo de animações modernas para o site
 * Implementa efeitos de parallax, animações de entrada e outros efeitos visuais
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos com efeito de parallax
    const parallaxElements = document.querySelectorAll('.hero, .page-header');
    
    // Elementos que serão animados ao scroll
    const animatedElements = document.querySelectorAll('.section-title, .project-card, .about-text p, .skills ul li, .contact-item');
    
    // Configuração das animações de entrada
    const animationOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // Efeito de parallax no scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            // Efeito de parallax - movimento mais lento que o scroll
            const speed = 0.5;
            const yPos = -(scrollTop * speed);
            element.style.backgroundPositionY = `calc(50% + ${yPos}px)`;
        });
    });
    
    // Animações de entrada baseadas em Intersection Observer
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona classe para animar o elemento
                entry.target.classList.add('animated');
                // Para de observar após animar
                animationObserver.unobserve(entry.target);
            }
        });
    }, animationOptions);
    
    // Observa todos os elementos que devem ser animados
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
    
    // Efeito de flutuação para elementos específicos
    const floatingElements = document.querySelectorAll('.hero-content h2, .hero-content p, .hero .btn');
    floatingElements.forEach((element, index) => {
        // Atraso diferente para cada elemento
        const delay = index * 0.2;
        element.style.animation = `float 4s ease-in-out ${delay}s infinite`;
    });
    
    // Efeito de destaque nos cards de projetos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Adiciona classe para efeito de destaque
            this.classList.add('highlight');
            
            // Efeito de profundidade nos outros cards
            projectCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.add('dimmed');
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove classes de efeito
            this.classList.remove('highlight');
            projectCards.forEach(otherCard => {
                otherCard.classList.remove('dimmed');
            });
        });
    });
    
    // Efeito de gradiente animado para títulos especiais
    const gradientElements = document.querySelectorAll('.logo, .project-title');
    gradientElements.forEach(element => {
        element.classList.add('animated-gradient');
    });
});