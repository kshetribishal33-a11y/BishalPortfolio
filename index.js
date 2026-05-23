  // ===== MOBILE NAVBAR TOGGLE =====
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // ===== SMOOTH SCROLLING FOR NAVBAR LINKS =====
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

        // ===== SKILLS ANIMATION ON SCROLL =====
     
        document.addEventListener("DOMContentLoaded", function () {

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillProgress = entry.target.querySelector('.skill-progress');
                if (skillProgress) {
                    skillProgress.style.width = skillProgress.dataset.width;
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-item').forEach(item => {
        observer.observe(item);
    });

});

        // ===== CONTACT FORM HANDLER =====
     
        document.addEventListener("DOMContentLoaded", function () {

    // 🔹 Initialize EmailJS
    (function () {
        emailjs.init("b5yrLErHQYN0760QV"); // यहाँ आफ्नो Public Key राख
    })();

    // 🔹 Form submit handler
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const button = this.querySelector('button');
        const originalText = button.textContent;

        button.textContent = 'Sending...';
        button.disabled = true;

        emailjs.send("service_os76dkv", "template_h1e6de9", {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        })
        .then(function () {
            alert("Message sent successfully! 🎉");
            form.reset();
        })
        // .catch(function () {
        //     alert("Failed to send message ❌");
        // })
        .catch(function (error) {
    console.log(error);
    alert("Failed: " + error.text);
    })
        .finally(function () {
            button.textContent = originalText;
            button.disabled = false;
        });

    });

});

        // ===== NAVBAR SHRINK ON SCROLL =====
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.padding = '0.8rem 5%';
                document.querySelector('.logo').style.fontSize = '1.5rem';
            } else {
                navbar.style.padding = '1rem 5%';
                document.querySelector('.logo').style.fontSize = '1.8rem';
            }
        });