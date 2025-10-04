// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling with EmailJS
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        
        if (!name || !email || !message) {
            showErrorPopup('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showErrorPopup('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Send email using EmailJS with your preferred format
        emailjs.send("service_30z26kq", "template_k1yzymm", {
            from_name: document.getElementById("name").value,
            from_email: document.getElementById("email").value,
            message: document.getElementById("message").value
        }).then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            showSuccessPopup();
            contactForm.reset();
        }, function(error) {
            console.log('Failed to send email:', error);
            showErrorPopup('Failed to send message. Please try again.');
        }).finally(function() {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Popup functions
function showSuccessPopup() {
    const popup = document.getElementById('success-popup');
    popup.classList.add('show');
}

function showErrorPopup(message) {
    const popup = document.getElementById('error-popup');
    const messageElement = popup.querySelector('p');
    if (message) {
        messageElement.textContent = message;
    }
    popup.classList.add('show');
}

// Popup close handlers
document.addEventListener('DOMContentLoaded', () => {
    const successPopup = document.getElementById('success-popup');
    const errorPopup = document.getElementById('error-popup');
    const successCloseBtn = document.getElementById('popup-close');
    const errorCloseBtn = document.getElementById('error-popup-close');
    
    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', () => {
            successPopup.classList.remove('show');
        });
    }
    
    if (errorCloseBtn) {
        errorCloseBtn.addEventListener('click', () => {
            errorPopup.classList.remove('show');
        });
    }
    
    // Close popup when clicking overlay
    if (successPopup) {
        successPopup.addEventListener('click', (e) => {
            if (e.target === successPopup) {
                successPopup.classList.remove('show');
            }
        });
    }
    
    if (errorPopup) {
        errorPopup.addEventListener('click', (e) => {
            if (e.target === errorPopup) {
                errorPopup.classList.remove('show');
            }
        });
    }
});

// About Section Slideshow
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Auto-play slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideshow();
            startSlideshow();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideshow();
            startSlideshow();
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopSlideshow();
            startSlideshow();
        });
    });

    // Start auto-play
    if (slides.length > 0) {
        startSlideshow();
    }

    // Pause on hover
    const slideshowWrapper = document.querySelector('.slideshow-wrapper');
    if (slideshowWrapper) {
        slideshowWrapper.addEventListener('mouseenter', stopSlideshow);
        slideshowWrapper.addEventListener('mouseleave', startSlideshow);
    }
});

// Header background on scroll
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .section-title, .about-text, .contact-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title
function typeWriter(text, element, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    typeWriter(originalText, heroTitle, 100);
});

// Add particles background effect
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Skill tags hover effect
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.1) rotate(5deg)';
            tag.style.transition = 'transform 0.3s ease';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Walking Girl Animation with Rain Effect
document.addEventListener('DOMContentLoaded', function() {
    // Globals for walking girl animation
    var W = window.innerWidth, H = window.innerHeight;
    var canvas = document.getElementById("walking-canvas");
    
    if (!canvas) return; // Exit if canvas doesn't exist
    
    var ctx = canvas.getContext("2d");
    var dashedRain = true;
    var rainIntensity = 1;
    var maxRadius = 2;
    var speed = 5;
    var textMaxSpeed = -0.5;
    var gravity = 0.3;
    var airResistance = 1;
    var particleTTL = 25;
    var wind = 0;
    var ticker = 0;
    var circleArr = [];
    var miniCircleArr = [];
    var startDate = new Date();
    var endDate = new Date();
    var timeControl = 0.7;
    var clr = 34;
    var timeDiff = 0;
    var background = "linear-gradient(to bottom, rgba(102, 2, 31, 0.3), rgba(17, 17, 17, 0.5))";
    var words = [];
    var showThoughts = false;

    // Girl click event with glitch effect for hero content
    var walkingGirl = document.getElementById("walking-girl1");
    var heroContainer = document.querySelector(".hero-container");
    var clickHint = document.querySelector(".click-hint p");
    var isHeroVisible = true;
    
    if (walkingGirl && heroContainer) {
        walkingGirl.addEventListener("click", function() {
            // Set data-text attributes for glitch effect
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroDescription = document.querySelector('.hero-description');
            
            if (heroTitle) heroTitle.setAttribute('data-text', heroTitle.textContent);
            if (heroSubtitle) heroSubtitle.setAttribute('data-text', heroSubtitle.textContent);
            if (heroDescription) heroDescription.setAttribute('data-text', heroDescription.textContent);
            
            if (isHeroVisible) {
                // Glitch out and hide hero content
                heroContainer.classList.remove('glitch-in');
                heroContainer.classList.add('glitch-out');
                
                setTimeout(() => {
                    heroContainer.classList.add('hidden');
                }, 1000); // Wait for animation to complete
                
                // Change hint text to "go back"
                if (clickHint) {
                    clickHint.textContent = "Click the head to go back";
                }
                
                isHeroVisible = false;
            } else {
                // Glitch in and show hero content
                heroContainer.classList.remove('hidden');
                heroContainer.classList.remove('glitch-out');
                heroContainer.classList.add('glitch-in');
                
                // Change hint text back to original
                if (clickHint) {
                    clickHint.textContent = "Click the head to see what's on her mind";
                }
                
                isHeroVisible = true;
            }
            
            // Toggle thoughts as well
            showThoughts = !showThoughts;
        });
    }

    // Responsiveness
    window.addEventListener("resize", function() {
        W = window.innerWidth;
        H = window.innerHeight;
        if (canvas) {
            canvas.width = W;
            canvas.height = H;
        }
        if (walkingGirl) {
            walkingGirl.style.top = H - (300 - 44) + "px";
        }
    });

    // Lightning effect
    function lightning() {
        clr = 125;
    }

    function drawBuilding(h, n, color) {
        var y = H - h;
        var w = W / n + 1;
        var gap = w / n + 1;
        var x = gap;

        for (var v = 0; v < n; v++) {
            var grd = ctx.createLinearGradient(x + w / 2, y, x + w / 2, y + h);
            grd.addColorStop(0, color);
            grd.addColorStop(1, "#111");

            ctx.rect(x, y, w, h);
            ctx.fillStyle = grd;
            ctx.fill();
            x += w + gap;
        }
    }

    // Utility function
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // Word class for thoughts
    var Word = function(string) {
        this.string = string.toUpperCase();
        this.speed = Math.random() * textMaxSpeed;
        this.size = getRandomInt(8, 16);
        this.x = Math.random() * W;
        this.y = getRandomInt(H / 3, H - H / 2.5);
    }

    Word.prototype.draw = function() {
        ctx.font = this.size + "px impact";
        ctx.fillStyle = "rgba(255, 233, 236, 0.7)";
        ctx.fillText(this.string, this.x, this.y);
    }

    Word.prototype.update = function() {
        this.x += this.speed;
        if (this.x < -100) {
            this.x = W + 100;
        }
        this.draw();
    }

    // Circle class for rain
    var Circle = function(x, y, r, dx, dy) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.velocity = {
            x: dx,
            y: dy
        };
    };

    Circle.prototype.draw = function() {
        ctx.beginPath();
        if (dashedRain) {
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + wind, this.y + getRandomInt(1, 10));
            ctx.lineWidth = "0.5";
            ctx.strokeStyle = "rgba(173, 216, 230, 0.6)";
        } else {
            ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
            ctx.strokeStyle = "rgba(255, 233, 236, 0.5)";
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(173, 216, 230, 0.4)";
        ctx.stroke();
        ctx.fill();
    }

    Circle.prototype.update = function() {
        if (this.x + this.r > W * 3) {
            // Reset position
        } else {
            this.velocity.x += wind / 10;
        }

        if (this.y + this.r > H) {
            this.r -= this.r;
            this.velocity.y = -this.velocity.y * airResistance;
            this.shatter();
        } else {
            this.velocity.y += gravity;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    }

    Circle.prototype.shatter = function() {
        for (var v = 0; v < 8; v++) {
            miniCircleArr.push(new MiniCircle(this.x, this.y, 1));
        }
    }

    // Mini Circles for splash effect
    var MiniCircle = function(x, y, r) {
        Circle.call(this, x, y, r);
        this.velocity = {
            x: getRandomInt(-5, 5),
            y: getRandomInt(-15, 15)
        };
        this.ttl = particleTTL;
        this.opacity = 1;
    }

    MiniCircle.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 233, 236, " + this.opacity + ")";
        ctx.fill();
    }

    MiniCircle.prototype.update = function() {
        if (this.x - this.r < 0 || this.x + this.r > W) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y - this.r < 0) {
            this.velocity.y = -this.velocity.y;
        }

        if (this.y + this.r >= H) {
            this.velocity.y = -this.velocity.y * airResistance;
        } else {
            this.velocity.y += gravity;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.ttl -= 1;
        this.opacity -= 1 / this.ttl;
        this.draw();
    }

    // Start function
    function start(refresh = false) {
        if (!canvas) return;
        
        canvas.style.background = background;
        canvas.width = W;
        canvas.height = H;
        ctx.lineWidth = "1";
        ctx.strokeStyle = "rgba(255, 233, 236, 0.5)";
        ctx.fillStyle = "rgba(173, 216, 230, 0.4)";
        
        if (walkingGirl) {
            walkingGirl.style.top = H - (300 - 44) + "px";
        }

        circleArr = [];
        miniCircleArr = [];

        setTimeout(lightning, 4000);
        setTimeout(lightning, 4200);

        // Positive thoughts for your portfolio
        words.push(new Word("Creative"));
        words.push(new Word("Innovative"));
        words.push(new Word("Passionate"));
        words.push(new Word("Skilled"));
        words.push(new Word("Professional"));
        words.push(new Word("Success"));
        words.push(new Word("Dreams"));
        words.push(new Word("Code"));
        words.push(new Word("Design"));
        words.push(new Word("Future"));

        if (!refresh) {
            update();
        }
    }

    // Update function
    function update() {
        if (!canvas || !ctx) return;
        
        requestAnimationFrame(update);
        ctx.clearRect(0, 0, W, H);

        // Removed building silhouettes - clean background

        // Draw thoughts when girl is clicked
        if (showThoughts) {
            for (var v = 0; v < words.length; v++) {
                words[v].update();
            }
        }

        // Update rain drops
        for (var v = 0; v < circleArr.length; v++) {
            if (circleArr[v] && circleArr[v].r >= 0) {
                circleArr[v].update();
                if (circleArr[v].r == 0) {
                    circleArr.splice(v, 1);
                }
            }
        }

        // Update mini circles (splash effect)
        for (var v = 0; v < miniCircleArr.length; v++) {
            if (miniCircleArr[v] !== undefined) {
                miniCircleArr[v].update();
                if (miniCircleArr[v].ttl == 0) {
                    miniCircleArr.splice(v, 1);
                }
            }
        }

        // Spawn new rain drops
        for (var v = 0; v < rainIntensity; v++) {
            var r = Math.random() * maxRadius;
            var x = Math.random() * (W * 3) - 30;
            var y = 0;
            var dx = wind;
            var dy = (Math.random() - 0.5) * speed;
            circleArr.push(new Circle(x, y, r, dx, dy));
        }

        // Wind control
        endDate = new Date();
        timeDiff = (endDate - startDate) / 1000;
        if (timeDiff > timeControl) {
            if (wind >= -6 && wind <= 6) {
                wind += (Math.random() - 0.5) * 2;
            }
            
            if (wind < -3) {
                timeControl = 0.5;
                rainIntensity = 3;
            } else if (wind >= -3 && wind < -1) {
                timeControl = 0.1;
                rainIntensity = 1;
            } else {
                timeControl = 4;
                rainIntensity = 6;
            }

            startDate = endDate;
        }

        // Lightning effect
        if (clr > 51) {
            canvas.style.background = "linear-gradient(to bottom, rgba(" + clr + "," + clr + "," + clr + ", 0.3), rgba(17, 17, 17, 0.5))";
            clr -= 2;
        } else {
            canvas.style.background = background;
        }
    }

    // Initialize the animation
    start();
});

// Skills Carousel Functionality
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const cards = document.querySelectorAll(".deconstructed-card");
    const prevBtn = document.querySelector(".carousel-button.prev");
    const nextBtn = document.querySelector(".carousel-button.next");
    const dotsContainer = document.querySelector(".dots-container");

    if (!track || !cards.length) return;

    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToCard(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    const cardWidth = cards[0].offsetWidth;
    const cardMargin = 40;
    const totalCardWidth = cardWidth + cardMargin;

    let currentIndex = 0;

    // Add mouse interaction effects
    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const xDeg = (y - 0.5) * 8;
            const yDeg = (x - 0.5) * -8;
            card.style.transform = `perspective(1200px) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
            
            const layers = card.querySelectorAll(".card-layer");
            layers.forEach((layer, index) => {
                const depth = 30 * (index + 1);
                const translateZ = depth;
                const offsetX = (x - 0.5) * 10 * (index + 1);
                const offsetY = (y - 0.5) * 10 * (index + 1);
                layer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, ${translateZ}px)`;
            });
            
            const waveSvg = card.querySelector(".wave-svg");
            if (waveSvg) {
                const moveX = (x - 0.5) * -20;
                const moveY = (y - 0.5) * -20;
                waveSvg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
                const wavePaths = waveSvg.querySelectorAll("path:not(:first-child)");
                wavePaths.forEach((path, index) => {
                    const factor = 1 + index * 0.5;
                    const waveX = moveX * factor * 0.5;
                    const waveY = moveY * factor * 0.3;
                    path.style.transform = `translate(${waveX}px, ${waveY}px)`;
                });
            }
            
            const bgObjects = card.querySelectorAll(".bg-object");
            bgObjects.forEach((obj, index) => {
                const factorX = (index + 1) * 10;
                const factorY = (index + 1) * 8;
                const moveX = (x - 0.5) * factorX;
                const moveY = (y - 0.5) * factorY;
                if (obj.classList.contains("square")) {
                    obj.style.transform = `rotate(45deg) translate(${moveX}px, ${moveY}px)`;
                } else if (obj.classList.contains("triangle")) {
                    obj.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) scale(1)`;
                } else {
                    obj.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            });
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
            const layers = card.querySelectorAll(".card-layer");
            layers.forEach((layer) => {
                layer.style.transform = "";
            });
            const waveSvg = card.querySelector(".wave-svg");
            if (waveSvg) {
                waveSvg.style.transform = "";
                const wavePaths = waveSvg.querySelectorAll("path:not(:first-child)");
                wavePaths.forEach((path) => {
                    path.style.transform = "";
                });
            }
            const bgObjects = card.querySelectorAll(".bg-object");
            bgObjects.forEach((obj) => {
                if (obj.classList.contains("square")) {
                    obj.style.transform = "rotate(45deg) translateY(-20px)";
                } else if (obj.classList.contains("triangle")) {
                    obj.style.transform = "translate(-50%, -50%) scale(0.5)";
                } else {
                    obj.style.transform = "translateY(20px)";
                }
            });
        });
    });

    function goToCard(index) {
        index = Math.max(0, Math.min(index, cards.length - 1));
        currentIndex = index;
        updateCarousel();
    }

    function updateCarousel() {
        const translateX = -currentIndex * totalCardWidth;
        track.style.transform = `translateX(${translateX}px)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            goToCard(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            goToCard(currentIndex + 1);
        });
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            goToCard(currentIndex - 1);
        } else if (e.key === "ArrowRight") {
            goToCard(currentIndex + 1);
        }
    });

    // Touch/swipe navigation
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            goToCard(currentIndex + 1);
        } else if (touchEndX - touchStartX > 50) {
            goToCard(currentIndex - 1);
        }
    }

    // Handle window resize
    window.addEventListener("resize", () => {
        const newCardWidth = cards[0].offsetWidth;
        const newTotalCardWidth = newCardWidth + cardMargin;

        const translateX = -currentIndex * newTotalCardWidth;
        track.style.transition = "none";
        track.style.transform = `translateX(${translateX}px)`;

        setTimeout(() => {
            track.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        }, 50);
    });

    // Initialize carousel
updateCarousel();
    updateCarousel();
});
