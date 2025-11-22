// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    
    // Slight delay for the second ring
    setTimeout(() => {
        cursor2.style.left = e.clientX + "px";
        cursor2.style.top = e.clientY + "px";
    }, 50);
});

// Add hover effect to links
const links = document.querySelectorAll('a, .card');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor2.classList.add('hovered');
        cursor2.style.width = '60px';
        cursor2.style.height = '60px';
        cursor2.style.backgroundColor = 'rgba(0, 243, 255, 0.1)';
    });
    link.addEventListener('mouseleave', () => {
        cursor2.classList.remove('hovered');
        cursor2.style.width = '40px';
        cursor2.style.height = '40px';
        cursor2.style.backgroundColor = 'transparent';
    });
});

// 3D Tilt Effect for Cards
const cards = document.querySelectorAll('.tilt-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});