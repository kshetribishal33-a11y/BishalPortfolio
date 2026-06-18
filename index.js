// =============================================
    // 1. DARK MODE TOGGLE
    // =============================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');
    let isDark = true;

    if (localStorage.getItem('theme') === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      isDark = false;
      themeIcon.className = 'fas fa-moon';
      themeLabel.textContent = 'Dark';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.className = 'fas fa-sun';
      themeLabel.textContent = 'Light';
    }

    themeToggle.addEventListener('click', () => {
      isDark = !isDark;
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        themeLabel.textContent = 'Light';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIcon.className = 'fas fa-moon';
        themeLabel.textContent = 'Dark';
      }
    });

    // =============================================
    // 2. TYPING ANIMATION
    // =============================================
    const roles = ['Web Developer', 'UI/UX Designer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typingText');

    function typeEffect() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 60 : 100;

      if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 600;
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();

    // =============================================
    // 3. SKILLS PROGRESS BARS
    // =============================================
    const skillFills = document.querySelectorAll('.skill-fill');
    let skillsAnimated = false;

    function animateSkills() {
      if (skillsAnimated) return;
      skillFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
      });
      skillsAnimated = true;
    }

    // =============================================
    // 4. SCROLL ANIMATIONS
    // =============================================
    const projectItems = document.querySelectorAll('.project-item');
    const skillItems = document.querySelectorAll('.skill-item');

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('project-item')) {
            entry.target.classList.add('visible');
          }
          if (entry.target.classList.contains('skill-item')) {
            animateSkills();
          }
        }
      });
    }, observerOptions);

    projectItems.forEach(item => observer.observe(item));
    skillItems.forEach(item => observer.observe(item));

    setTimeout(() => {
      const rect = document.getElementById('skillsContainer').getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        animateSkills();
      }
    }, 500);

    // =============================================
    // 5. NAVBAR SCROLL EFFECT
    // =============================================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });

    // =============================================
    // 6. MOBILE MENU
    // =============================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinksContainer = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });

    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      });
    });

    // =============================================
    // 7. VIEW CV
    // =============================================
    document.getElementById('viewCVBtn').addEventListener('click', (e) => {
      e.preventDefault();
      const pdfURL = 'CV pdf.pdf';
      window.open(pdfURL, '_blank');
      showToast('📄 Opening CV...');
    });

    // =============================================
    // 8. CONTACT FORM
    // =============================================
    const toast = document.getElementById('toast');
    let toastTimeout;

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }

    document.getElementById('sendBtn').addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('nameInput').value.trim();
      const email = document.getElementById('emailInput').value.trim();
      const message = document.getElementById('messageInput').value.trim();

      if (!name || !email || !message) {
        showToast('⚠️ Please fill in all fields.');
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        showToast('⚠️ Please enter a valid email address.');
        return;
      }

      showToast('✅ Message sent! I\'ll get back to you soon.');
    });

    // =============================================
    // 9. SMOOTH SCROLL
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
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

    console.log('🚀 Portfolio loaded with all features!');