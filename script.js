function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.overlay');
    const isOpen = navLinks.classList.contains('show');
    isOpen ? (navLinks.classList.remove('show'), overlay.style.display = 'none') : (navLinks.classList.add('show'), overlay.style.display = 'block');
}

const backBtn = document.getElementById('backToTop');
function scrollToTop(){ window.scrollTo({ top: 0, behavior: 'smooth' }); }
window.addEventListener('scroll', () => { window.scrollY > 300 ? backBtn.classList.add('show') : backBtn.classList.remove('show'); });

const cards = document.querySelectorAll('.tilt-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'; });
});

const skillSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress-bar-fill');
let animated = false;
window.addEventListener('scroll', () => {
    if(skillSection.getBoundingClientRect().top < window.innerHeight / 1.3 && !animated) {
        progressBars.forEach(bar => { const w = bar.style.width; bar.style.width = '0'; setTimeout(() => bar.style.width = w, 100); });
        animated = true;
    }
});
