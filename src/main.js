document.addEventListener('DOMContentLoaded', () => {
    console.log('DUNO Nexus — Rebuild complete.');
    
    // Simple Reveal Animation
    const reveals = document.querySelectorAll('[data-reveal]');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
});
