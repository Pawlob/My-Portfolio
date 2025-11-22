/* -------------------------------------------------------------
   1. CUSTOM CURSOR LOGIC
------------------------------------------------------------- */
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    
    // Slight delay for the second ring (creates the trail effect)
    setTimeout(() => {
        cursor2.style.left = e.clientX + "px";
        cursor2.style.top = e.clientY + "px";
    }, 50);
});

/* -------------------------------------------------------------
   2. HOVER INTERACTIONS (LINKS & CARDS)
------------------------------------------------------------- */
const interactables = document.querySelectorAll('a, .card, .work-card, .btn-primary');

interactables.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor2.classList.add('hovered');
        cursor2.style.width = '60px';
        cursor2.style.height = '60px';
        cursor2.style.backgroundColor = 'rgba(0, 243, 255, 0.1)';
        cursor2.style.border = 'none';
    });
    link.addEventListener('mouseleave', () => {
        cursor2.classList.remove('hovered');
        cursor2.style.width = '40px';
        cursor2.style.height = '40px';
        cursor2.style.backgroundColor = 'transparent';
        cursor2.style.border = '1px solid var(--accent)';
    });
});

/* -------------------------------------------------------------
   3. 3D TILT EFFECT FOR CARDS
------------------------------------------------------------- */
const cards = document.querySelectorAll('.tilt-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on mouse position
        const rotateX = ((y - centerY) / centerY) * -5; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

/* -------------------------------------------------------------
   4. SMOOTH SCROLLING
------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/* -------------------------------------------------------------
   5. HACKER TEXT EFFECT (For "ARCHITECT" Title)
------------------------------------------------------------- */
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const glitchText = document.querySelector(".glitch-text");

if(glitchText) {
    glitchText.onmouseover = event => {
        let iteration = 0;
        
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if(index < iteration) {
                        return event.target.dataset.text[index];
                    }
                    return letters[Math.floor(Math.random() * 26)]
                })
                .join("");
            
            if(iteration >= event.target.dataset.text.length){ 
                clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
    }
}

/* -------------------------------------------------------------
   6. SCROLL REVEAL ANIMATION
------------------------------------------------------------- */
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

// Target all sections and cards to animate
const hiddenElements = document.querySelectorAll('.section, .card, .work-card');
hiddenElements.forEach((el) => observer.observe(el));
