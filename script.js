
    const EMAILJS_PUBLIC_KEY  = 'qQfTD2LmiMFv4CRta';   
    const EMAILJS_SERVICE_ID  = 'service_a9s62fo';   
    const EMAILJS_TEMPLATE_ID = 'template_2d609gm';  

    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

    function downloadResume() {
        const link = document.createElement('a');
        link.href = 'SumitRaghav_Resume.pdf';
        link.download = 'SumitRaghav_Resume.pdf';
        link.click();
    }

    function scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) { event.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
    }
    function navTo(id) {
      toggleMenu();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
    function toggleMenu() {
      const nav = document.getElementById('mobileNav');
      const btn = document.getElementById('hamburger');
      nav.classList.toggle('open');
      btn.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    }

    const sections = ['about','skills','projects','achievements','contact'];
    const navLinks = document.querySelectorAll('.nav-links .nav-btn');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      });
      navLinks.forEach(a => {
        a.style.color = a.textContent.toLowerCase().trim() === (current === 'achievements' ? 'credentials' : current) ? 'var(--accent)' : '';
      });
    });
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursorRing');
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
      ring.style.left   = e.clientX + 'px';
      ring.style.top    = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width  = '16px'; cursor.style.height = '16px';
        ring.style.width    = '52px'; ring.style.height   = '52px';
        ring.style.borderColor = 'var(--accent2)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width  = '10px'; cursor.style.height = '10px';
        ring.style.width    = '36px'; ring.style.height   = '36px';
        ring.style.borderColor = 'var(--accent)';
      });
    });

    // Typing effect
    const roles = ['Full Stack Developer', 'MERN Stack Developer', 'UI/UX Designer', 'React Developer'];
    let ri = 0, ci = 0, deleting = false;
    const typingEl = document.getElementById('typingText');
    function type() {
      const word = roles[ri];
      if (!deleting) {
        typingEl.textContent = word.slice(0, ci++);
        if (ci > word.length) { deleting = true; setTimeout(type, 1400); return; }
      } else {
        typingEl.textContent = word.slice(0, ci--);
        if (ci < 0) { deleting = false; ri = (ri + 1) % roles.length; ci = 0; }
      }
      setTimeout(type, deleting ? 50 : 90);
    }
    type();

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), 80); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    async function handleSubmit(e) {
      e.preventDefault();
      const btn  = document.getElementById('submitBtn');
      const form = document.getElementById('contactForm');

      const name    = form.querySelector('[name="from_name"]').value.trim();
      const email   = form.querySelector('[name="reply_to"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();
      if (!name || !email || !message) {
        showToast('Please fill in Name, Email, and Message.', 'error');
        return;
      }

      btn.textContent = 'Sending...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      try {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#00c8ff';
        btn.style.opacity = '1';
        showToast('Message sent! I\'ll reply within 24 hours.', 'success');
        form.reset();
        setTimeout(() => {
          btn.textContent = 'Send Message →';
          btn.style.background = 'var(--accent)';
          btn.disabled = false;
        }, 4000);
      } catch (err) {
        console.error('EmailJS error:', err);
        btn.textContent = 'Send Message →';
        btn.style.opacity = '1';
        btn.style.background = 'var(--accent)';
        btn.disabled = false;
        showToast('Failed to send. Please email me directly at raghavsumitkr@gmail.com', 'error');
      }
    }

    // Using Toast for notification
    function showToast(msg, type) {
      const existing = document.getElementById('toast');
      if (existing) existing.remove();
      const toast = document.createElement('div');
      toast.id = 'toast';
      toast.textContent = msg;
      toast.style.cssText = `
        position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
        padding: 1rem 1.5rem; max-width: 360px;
        font-family: 'Space Mono', monospace; font-size: 0.78rem;
        background: ${type === 'success' ? 'rgba(0,200,255,0.1)' : 'rgba(255,80,80,0.1)'};
        border: 1px solid ${type === 'success' ? 'rgba(0,200,255,0.4)' : 'rgba(255,80,80,0.4)'};
        color: ${type === 'success' ? 'var(--accent2)' : '#ff6b6b'};
        backdrop-filter: blur(12px);
        animation: slideIn 0.3s ease;
      `;
      document.body.appendChild(toast);
      setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.5s'; setTimeout(() => toast.remove(), 500); }, 5000);
    }
