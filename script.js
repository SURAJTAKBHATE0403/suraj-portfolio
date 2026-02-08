// 1. Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// 2. Page Load Logic (Theme + Typing Animation)
document.addEventListener('DOMContentLoaded', function() {
    // Saved Theme कलेक्ट करणे
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' && themeIcon) {
        document.body.classList.add('light-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Typing Animation सुरू करणे (फक्त एकदाच इथे ठेवा)
    const typedElement = document.querySelector('#typed-text');
    if (typedElement) {
        new Typed('#typed-text', {
            strings: [
                'Java Full Stack Developer', 
                'Spring Boot Specialist', 
                'Backend Engineer', 
                'Problem Solver'
            ],
            typeSpeed: 50,    
            backSpeed: 30,    
            backDelay: 2000,  
            loop: true        
        });
    }
});


// Scroll Progress Logic
window.onscroll = function() {
    updateProgressBar();
};

function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const bar = document.getElementById("scrollBar");
    if (bar) {
        bar.style.width = scrolled + "%";
    }
}


// १. स्किल्स काउंटर आणि बार ॲनिमेट करणारा मेन फंक्शन
const startCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const progressBars = document.querySelectorAll('.progress-bar');

    counters.forEach(counter => {
        counter.innerText = '0'; // सुरुवातीला ० करा
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 50; // आकडे किती वेगाने वाढतील

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });

    // बारची विड्थ (Width) वाढवणे
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('aria-valuenow');
        bar.style.width = targetWidth + '%';
    });
};

// २. Intersection Observer: स्क्रोल केल्यावरच ॲनिमेशन सुरू करण्यासाठी
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters(); // फंक्शन कॉल करा
            skillObserver.unobserve(entry.target); // एकदा झाल्यावर थांबवा
        }
    });
}, { threshold: 0.5 }); // ५०% सेक्शन दिसल्यावर सुरू होईल

// ३. स्किल सेक्शनला ऑब्झर्व्ह करणे सुरू करा
const skillSectionTarget = document.querySelector('#skills');
if (skillSectionTarget) {
    skillObserver.observe(skillSectionTarget);
}