// ==================== HERO CAROUSEL ====================
document.addEventListener('DOMContentLoaded', function() {
    var slides  = document.querySelectorAll('.hero-slide');
    var dots    = document.querySelectorAll('.hero-dot');
    var btnPrev = document.getElementById('heroPrev');
    var btnNext = document.getElementById('heroNext');

    if (!slides.length) return;

    var current = 0;
    var total   = slides.length;
    var timer   = null;

    function goTo(idx) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = ((idx % total) + total) % total;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function startAuto() {
        stopAuto();
        timer = setInterval(function() { goTo(current + 1); }, 5500);
    }

    function stopAuto() {
        if (timer) { clearInterval(timer); timer = null; }
    }

    // Initialisation : s'assurer que slide 0 est active
    for (var i = 0; i < total; i++) {
        slides[i].classList.remove('active');
        dots[i].classList.remove('active');
    }
    slides[0].classList.add('active');
    dots[0].classList.add('active');

    startAuto();

    if (btnNext) {
        btnNext.addEventListener('click', function() {
            goTo(current + 1);
            startAuto();
        });
    }
    if (btnPrev) {
        btnPrev.addEventListener('click', function() {
            goTo(current - 1);
            startAuto();
        });
    }

    dots.forEach(function(dot) {
        dot.addEventListener('click', function() {
            goTo(parseInt(this.getAttribute('data-slide'), 10));
            startAuto();
        });
    });

    // Swipe tactile
    var startX = 0;
    var heroEl = document.querySelector('.hero');
    if (heroEl) {
        heroEl.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        }, { passive: true });
        heroEl.addEventListener('touchend', function(e) {
            var diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                goTo(diff > 0 ? current + 1 : current - 1);
                startAuto();
            }
        }, { passive: true });
    }
});

// ==================== NAVIGATION ==================== 
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== STICKY NAVIGATION ====================
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== ACTIVE LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== EVENT FILTERS ====================
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // In a real implementation, this would filter the events
        // For now, it's just a visual effect
        console.log('Filter:', btn.textContent);
    });
});

// ==================== ANIMATION ON SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for fade-in animation
const animateElements = document.querySelectorAll('.news-card, .event-card, .result-card, .gallery-item, .social-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Animate stats when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const target = parseInt(stat.textContent);
                setTimeout(() => {
                    animateCounter(stat, target, 2000);
                }, index * 200);
            });
            heroObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// ==================== GALLERY MODAL (Placeholder) ====================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // In a real implementation, this would open a lightbox/modal
        console.log('Gallery item clicked');
        alert('Dans une version complète, cela ouvrirait une galerie photo en grand format.');
    });
});

// ==================== FORM VALIDATION (for future forms) ====================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==================== LOADING STATE ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('CAN Sarreguemines website loaded successfully! 🏃');
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c🏃 CAN Sarreguemines Website', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%cCourez Avec Nous - Prototype créé avec ❤️', 'color: #64748b; font-size: 14px;');
console.log('%cVous cherchez à rejoindre le club? Contactez-nous!', 'color: #f97316; font-size: 12px;');
// ==================== CANISTE GRID ====================
const canisteData = [
    { year: 1979, issues: [{ num: 'Pré-numéro (1979)', id: '0B4W21Meso4MjWWJ4X0hxZDdWYk0' }] },
    { year: 1980, issues: [
        { num: '001 (1980/1)', id: '0B4W21Meso4MjMmVtNEEwRlB3UjA' },
        { num: '002 (1980/2)', id: '0B4W21Meso4MjYUdvbXNlbXpmSFU' },
        { num: '003 (1980/3)', id: '0B4W21Meso4MjUHR4YVhUUHZQT28' },
        { num: '004 (1980/4)', id: '0B4W21Meso4MjdlpmVF9SbVpISUU' },
        { num: '005 (1980/5)', id: '0B4W21Meso4MjU0x0TmNuY0NXakk' }
    ]},
    { year: 1981, issues: [
        { num: '006 (1981/1)', id: '0B4W21Meso4MjaTFuaVhOMnFYS0E' },
        { num: '007 (1981/2)', id: '0B4W21Meso4MjWHNMaHJYT0hCZm8' },
        { num: '008 (1981/3)', id: '0B4W21Meso4MjQVFRaWV0cXZmY1k' },
        { num: '009 (1981/4)', id: '0B4W21Meso4MjLVZHRURMWm9PUjg' },
        { num: '010 (1981/5)', id: '0B4W21Meso4MjSE1IYVhiM3RzSEk' }
    ]},
    { year: 1982, issues: [
        { num: '011 (1982/1)', id: '0B4W21Meso4MjX05WZmFYSkpPUGM' },
        { num: '012 (1982/2)', id: '0B4W21Meso4MjNHVjaXF5QV9lSjQ' },
        { num: '013 (1982/3)', id: '0B4W21Meso4MjUWFZbzg1R2Z5UFk' },
        { num: '014 (1982/4)', id: '0B4W21Meso4MjbzUyNHVRXzZYdk0' }
    ]},
    { year: 1983, issues: [
        { num: '015 (1983/1)', id: '0B4W21Meso4MjVlVybXUzTlhBZDg' },
        { num: '016 (1983/2)', id: '0B4W21Meso4MjMGJBNW1WWEVzQzA' },
        { num: '017 (1983/3)', id: '0B4W21Meso4MjdnFwRWp2aFdwcEU' },
        { num: '018 (1983/4)', id: '0B4W21Meso4MjUUZTcUFRdmxaQ2s' }
    ]},
    { year: 1984, issues: [
        { num: '019 (1984/1)', id: '0B4W21Meso4MjdmdicHRTSExldVE' },
        { num: '020 (1984/2)', id: '0B4W21Meso4MjT2FvQ0VpRUpJcmc' },
        { num: '021 (1984/3)', id: '0B4W21Meso4MjNDJaQVZOMzRhX1U' }
    ]},
    { year: 1985, issues: [
        { num: '022 (1985/1)', id: '0B4W21Meso4MjNnEtZUVjWS1sNHM' },
        { num: '023 (1985/2)', id: '0B4W21Meso4MjMHBBdGdpMjdhYUE' },
        { num: '024 (1985/3)', id: '0B4W21Meso4MjQ05JQmR3UVFoZU0' }
    ]},
    { year: 1986, issues: [
        { num: '025 (1986/1)', id: '0B4W21Meso4MjTnVhc3BUWWFiSVk' },
        { num: '026 (1986/2)', id: '0B4W21Meso4MjYjdYN2YxRVFFZ0U' },
        { num: '027 (1986/3)', id: '0B4W21Meso4MjRGtNaGg5LUdIQ00' },
        { num: '028 (1986/4)', id: '0B4W21Meso4MjWXZTX0hoMmhkaWM' }
    ]},
    { year: 1987, issues: [
        { num: '029 (1987/1)', id: '0B4W21Meso4MjRDNzRkU1dGJIVjg' },
        { num: '030 (1987/2)', id: '0B4W21Meso4MjOXM0Q3Atd1NsaU0' },
        { num: '031 (1987/3)', id: '0B4W21Meso4MjYkVnTzFCUlRXOXc' },
        { num: '032 (1987/4)', id: '0B4W21Meso4MjeklBVWw0dGt3VFU' }
    ]},
    { year: 1988, issues: [
        { num: '033 (1988/1)', id: '0B4W21Meso4MjSjM1aW1MU2xBUnM' },
        { num: '034 (1988/2)', id: '0B4W21Meso4MjaWEwcEozWG91U1U' },
        { num: '035 (1988/3)', id: '0B4W21Meso4MjbmhOZ0FSeHZMbTA' }
    ]},
    { year: 1989, issues: [
        { num: '036 (1989/1)', id: '0B4W21Meso4MjN0J2MHo0UEloU0E' },
        { num: '037 (1989/2)', id: '0B4W21Meso4MjQmNEaWltZXFMZHM' },
        { num: '038 (1989/3)', id: '0B4W21Meso4MjQUlmS3hxeVJTNzA' },
        { num: '040 (1989/4)', id: '0B4W21Meso4MjVHN0TXl0QWcyamc' }
    ]},
    { year: 1990, issues: [
        { num: '041 (1990/1)', id: '0B4W21Meso4Mjekl3NDh6S0FENHc' },
        { num: '042 (1990/2)', id: '0B4W21Meso4MjcFpQNmYzUTgyUFk' },
        { num: '043 (1990/3)', id: '0B4W21Meso4MjS3ljdU9lUm1ZMDg' },
        { num: '044 (1990/4)', id: '0B4W21Meso4MjMmlBTFZfb3dBR0U' }
    ]},
    { year: 1991, issues: [
        { num: '045 (1991/1)', id: '0B4W21Meso4MjMUJUN0NJbTh2cDA' },
        { num: '046 (1991/2)', id: '0B4W21Meso4MjWTlTVU9tcjFOZ0U' },
        { num: '047 (1991/3)', id: '0B4W21Meso4MjdnlqVUtpZnlkd00' },
        { num: '048 (1991/4)', id: '0B4W21Meso4MjUUxBRWdTUWluajQ' }
    ]},
    { year: 1992, issues: [
        { num: '049 (1992/1)', id: '0B4W21Meso4MjSlVZWXFjRXNsa3c' },
        { num: '050 (1992/2)', id: '0B4W21Meso4MjNGctSXJmVTNKeE0' },
        { num: '051 (1992/3)', id: '0B4W21Meso4Mjblo3R2g2azlhNTg' },
        { num: '052 (1992/4)', id: '0B4W21Meso4MjS21tdlptQmhMUTA' }
    ]},
    { year: 1993, issues: [
        { num: '053 (1993/1)', id: '0B4W21Meso4MjNUZ6R2h2alBPZUE' },
        { num: '054 (1993/2)', id: '0B4W21Meso4MjZ2dibmRJQUF4dU0' },
        { num: '055 (1993/3)', id: '0B4W21Meso4MjU3ItYnB4eTl2cjA' }
    ]},
    { year: 1994, issues: [
        { num: '056 (1994/1)', id: '0B4W21Meso4MjMU9kM0FvYl9INUk' },
        { num: '057 (1994/2)', id: '0B4W21Meso4MjWFVCQVQwNjRfYkE' },
        { num: '058 (1994/3)', id: '0B4W21Meso4MjdTdLeW1qY3RXZjA' }
    ]},
    { year: 1995, issues: [
        { num: '059 (1995/1)', id: '0B4W21Meso4Mjb0JFOGs1ZGZ3RnM' },
        { num: '060 (1995/2)', id: '0B4W21Meso4MjMWlzM25nSjhiQWM' },
        { num: '061 (1995/3)', id: '0B4W21Meso4Mja2hqelZ5a2ZadEE' },
        { num: '062 (1995/4)', id: '0B4W21Meso4MjaEpkb1hCMlNTMzQ' }
    ]},
    { year: 1996, issues: [
        { num: '063 (1996/1)', id: '0B4W21Meso4Mjb2kxbGRueFpRLWs' },
        { num: '064 (1996/2)', id: '0B4W21Meso4MjQVJqc0M0R2g1TDg' },
        { num: '065 (1996/3)', id: '0B4W21Meso4MjMEZZZXlmaE0yb28' }
    ]},
    { year: 1997, issues: [
        { num: '066 (1997/1)', id: '0B4W21Meso4MjdG03VmVsLVFFMW8' },
        { num: '067 (1997/2)', id: '0B4W21Meso4MjUU1neTI1bXNCN1E' },
        { num: '068 (1997/3)', id: '0B4W21Meso4Mjd2pzeTJIX0dOYkk' }
    ]},
    { year: 1998, issues: [
        { num: '069 (1998/1)', id: '0B4W21Meso4MjMTFPRGYzc2QxQkE' },
        { num: '070 (1998/2)', id: '0B4W21Meso4MjcWhsQ1pCLVYyLU0' }
    ]},
    { year: 1999, issues: [
        { num: '071 (1999/1)', id: '0B4W21Meso4Mja0Y2cHFONVdtSmM' },
        { num: '072 (1999/2)', id: '0B4W21Meso4MjSWt5X3F2Q1BhOWM' },
        { num: '073 (1999/3)', id: '0B4W21Meso4MjLXBsWFB3Q3lEbW8' }
    ]},
    { year: 2000, issues: [
        { num: '074 (2000/1)', id: '0B4W21Meso4MjRk5kWmFsb2xaR1U' },
        { num: '075 (2000/2)', id: '0B4W21Meso4MjUnhBYWdXbzFZT2s' },
        { num: '076 (2000/3)', id: '0B4W21Meso4MjNmJiaUFFR1FmblE' }
    ]},
    { year: 2001, issues: [
        { num: '077 (2001/1)', id: '0B4W21Meso4MjR1JqbF93S0Y1NW8' },
        { num: '078 (2001/2)', id: '0B4W21Meso4MjNkVEWjFfbFNNblE' },
        { num: '079 (2001/3)', id: '0B4W21Meso4MjOVZrNHgyN3JRT3c' }
    ]},
    { year: 2002, issues: [
        { num: '080 (2002/1)', id: '0B4W21Meso4MjZEpqWVNZSVF6ZDA' },
        { num: '081 (2002/2)', id: '0B4W21Meso4Mjcjd3RXJJWGRLRnc' },
        { num: '082 (2002/3)', id: '0B4W21Meso4MjMmNHM25jcVBsLUU' }
    ]},
    { year: 2003, issues: [
        { num: '083 (2003/1)', id: '0B4W21Meso4MjUEptSDB0X3h3Umc' },
        { num: '084 (2003/2)', id: '0B4W21Meso4MjaWFTLVpqcTNkVUk' },
        { num: '085 (2003/3)', id: '0B4W21Meso4MjaFp6VEhwekt2YXM' }
    ]},
    { year: 2004, issues: [
        { num: '086 (2004/1)', id: '0B4W21Meso4MjN2Nlb1MyTGdzZkE' },
        { num: '087 (2004/2)', id: '0B4W21Meso4MjbW5iUmZ0SW5QY2c' },
        { num: '088 (2004/3)', id: '0B4W21Meso4MjdjhBdWtZcDAwdms' },
        { num: '089 (2004/4)', id: '0B4W21Meso4MjM0ZHcmtoVkFNeTQ' }
    ]},
    { year: 2005, issues: [
        { num: '090 (2005/1)', id: '0B4W21Meso4MjWV9PRUhWNzlxV1E' },
        { num: '091 (2005/2)', id: '0B4W21Meso4MjZk1fZmwyaUVmQmc' },
        { num: '092 (2005/3)', id: '0B4W21Meso4MjU0lOdkJnWmJuQjQ' }
    ]},
    { year: 2006, issues: [
        { num: '093 (2006/1)', id: '0B4W21Meso4MjNmxqdFU2TXlIcFk' },
        { num: '094 (2006/2)', id: '0B4W21Meso4MjVXp4TmhjbTZrSDQ' },
        { num: '095 (2006/3)', id: '0B4W21Meso4MjQUh0cno4YmlKa0U' }
    ]},
    { year: 2007, issues: [
        { num: '096 (2007/1)', id: '0B4W21Meso4Mjb0NmSTJCeGhjWUk' },
        { num: '097 (2007/2)', id: '0B4W21Meso4MjZGE5TzJudjVXdzg' },
        { num: '098 (2007/3)', id: '0B4W21Meso4Mjd3ZoVVJxdTNMWTA' }
    ]},
    { year: 2008, issues: [
        { num: '099 (2008/1)', id: '0B4W21Meso4MjeC1JZlFPcUlqaEk' },
        { num: '100 (2008/2)', id: '0B4W21Meso4MjWHVrYU5nOTQ5ZUk' },
        { num: '101 (2008/3)', id: '0B4W21Meso4MjVUhUcmlOd0x4VWM' }
    ]},
    { year: 2009, issues: [
        { num: '102 (2009/1)', id: '0B4W21Meso4MjaklWUmFlX0VXdGc' },
        { num: '103 (2009/2)', id: '0B4W21Meso4MjSGYzWjV2ZDMxQ28' },
        { num: '104 (2009/3)', id: '0B4W21Meso4MjUnM2aHRRM0EtSEk' }
    ]},
    { year: 2010, issues: [
        { num: '105 (2010/1)', id: '0B4W21Meso4MjYzUyRzUwX2RHVVk' },
        { num: '106 (2010/2)', id: '0B4W21Meso4MjMjRtMWlkcUJ4b3c' },
        { num: '107 (2010/3)', id: '0B4W21Meso4MjMVQ5X09sQ2RhSDg' }
    ]},
    { year: 2011, issues: [
        { num: '108 (2011/1)', id: '0B4W21Meso4MjaG5MS3l2S0JEbkU' },
        { num: '109 (2011/2)', id: '0B4W21Meso4MjTkFMV2t5Mjg1LXc' },
        { num: '110 (2011/3)', id: '0B4W21Meso4MjZVJzWms3b0xPbDA' }
    ]},
    { year: 2012, issues: [
        { num: '111 (2012/1)', id: '0B4W21Meso4MjZWRfWHZLaDNiSGc' },
        { num: '112 (2012/2)', id: '0B4W21Meso4MjMTRfbTF3UWg5V0E' },
        { num: '113 (2012/3)', id: '0B4W21Meso4MjdF9IX3ZUUU51OU0' }
    ]},
    { year: 2013, issues: [
        { num: '114 (2013/1)', id: '0B4W21Meso4MjQ2hrTktXNHpzcDA' },
        { num: '115 (2013/2)', id: '0B4W21Meso4MjX0tkc3FfZkdOZGM' },
        { num: '116 (2013/3)', id: '0B4W21Meso4MjLTNyZTBfaC01Y2M' }
    ]},
    { year: 2014, issues: [
        { num: '117 (2014/1)', id: '0B4W21Meso4MjZm1UZ3pZSUJsRWM' },
        { num: '118 (2014/2)', id: '0B4W21Meso4MjZy1FSXJDUkhoaGs' },
        { num: '119 (2014/3)', id: '0B4W21Meso4MjN1I5M3dlT3lGOWc' }
    ]},
    { year: 2015, issues: [
        { num: '120 (2015/1)', id: '0B4W21Meso4MjY25OalhEbG1KTVU' },
        { num: '121 (2015/2)', id: '0B4W21Meso4MjaXdBQWtLVFNESUE' },
        { num: '122 (2015/3)', id: '0B4W21Meso4MjR1dKQ2x0SFdabVE' }
    ]},
    { year: 2016, issues: [
        { num: '123 (2016/1)', id: '0B4W21Meso4MjYk43eERhTlNwZDg' },
        { num: '124 (2016/2)', id: '0B4W21Meso4MjQThZM3lSX29XM2s' },
        { num: '125 (2016/3)', id: '0B4W21Meso4MjMDFVWldtd25kZUU' }
    ]},
    { year: 2017, issues: [
        { num: '126 (2017/1)', id: '0B4W21Meso4MjZ1BRTjFUY2d6VkU' },
        { num: '127 (2017/2)', id: '0B4W21Meso4MjMWdBMThTV0J4Qms' },
        { num: '128 (2017/3)', id: '1cUZ3syHydPH6WTCa_UmN96g_E2IjcEQ3' }
    ]},
    { year: 2018, issues: [
        { num: '129 (2018/1)', id: '1Uc68N0S_KN5LPdevUhXIY84wmy3YfXFT' },
        { num: '130 (2018/2)', id: '1EAzjtLwMynQ2q25H11W8sDdVNiAN9WIR' },
        { num: '131 (2018/3)', id: '1RfKjX-CFiP3UYrQ0NcpXuSTwRpmaMxRw' }
    ]},
    { year: 2019, issues: [
        { num: '132 (2019/1)', id: '1Mpj7xeFYhkZafopUCMr9bdut_ASAZ8H2' },
        { num: '133 (2019/2)', id: '17tvEZVRb70IyEmgjWu4pyyKN-FRsq0ri' },
        { num: '134 (2019/3)', id: '1vWLt-NrAXEnYNCJTDRLfp69w3Iz6mW6R' }
    ]},
    { year: 2020, issues: [{ num: '135 (2020/1)', id: '1phXAbfmBAUJEliOl5xxh3FsDQtUDaRU5' }] },
    { year: 2021, issues: [{ num: '136 (2021/1)', id: '1De8DxEyh8aUNmhhPy_HlVqkg7OcpudY5' }] },
    { year: 2022, issues: [
        { num: '137 (2022/1)', id: '1S_ObetzNxaMd9-rsBIQKRYmgvUNfhSx' },
        { num: '138 (2022/2)', id: '1aBkrSFAY5-kT68rzX7kxF1-gtShHid2F' }
    ]},
    { year: 2023, issues: [{ num: '139 (2023/1)', id: '1lbqMvUVrp-9PuTWN_hTF1g3h1ogRvb5g' }] },
    { year: 2024, issues: [{ num: '140 (2024/1)', id: '1g07ecslogudpx-f50MA7j-77ySnXhkDj' }] }
];

function buildCanisteGrid() {
    var grid = document.getElementById('caniste-grid');
    if (!grid) return;

    // Ordre antéchronologique (le plus récent en premier)
    var reversed = canisteData.slice().reverse();

    reversed.forEach(function(yearData) {
        var block = document.createElement('div');
        block.className = 'caniste-year-block';

        var header = document.createElement('div');
        header.className = 'caniste-year-header';
        header.innerHTML =
            '<span class="caniste-year-label">' + yearData.year + '</span>' +
            '<span class="caniste-year-meta">' +
                '<span class="caniste-year-count">' + yearData.issues.length + ' n°</span>' +
                '<i class="fas fa-chevron-down caniste-toggle-icon"></i>' +
            '</span>';

        var issuesDiv = document.createElement('div');
        issuesDiv.className = 'caniste-issues';

        yearData.issues.forEach(function(issue) {
            var link = document.createElement('a');
            link.href = 'https://drive.google.com/uc?id=' + issue.id;
            link.target = '_blank';
            link.className = 'caniste-issue-link';
            link.textContent = 'N°\u00a0' + issue.num;
            issuesDiv.appendChild(link);
        });

        // Toggle accordéon au clic sur le header
        header.addEventListener('click', function() {
            block.classList.toggle('open');
        });

        block.appendChild(header);
        block.appendChild(issuesDiv);
        grid.appendChild(block);
    });

    // Ouvrir automatiquement les 2 années les plus récentes
    var blocks = grid.querySelectorAll('.caniste-year-block');
    for (var i = 0; i < Math.min(2, blocks.length); i++) {
        blocks[i].classList.add('open');
    }
}

// Build caniste grid on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildCanisteGrid);
} else {
    buildCanisteGrid();
}

// ==================== DROPDOWN MOBILE ====================
// Pour les nav-dropdowns en mobile (click au lieu de hover)
document.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = trigger.closest('.nav-dropdown');
            dropdown.classList.toggle('open');
            const menu = dropdown.querySelector('.dropdown-menu');
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }
    });
});
