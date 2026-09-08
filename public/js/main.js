/**
 * ANKIT KUMAR PORTFOLIO - MAIN INTERACTIVE SCRIPT
 * MERN Stack Developer Portfolio Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiquidCanvas();
  initTypewriter();
  init3DTilt();
  initMobileMenu();
  initSkillFilter();
});

/* ==========================================================================
   1. AMBIENT LIQUID CANVAS ANIMATION
   ========================================================================== */
function initLiquidCanvas() {
  const canvas = document.getElementById('liquid-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const blobs = [
    { x: width * 0.2, y: height * 0.3, radius: 260, color: 'rgba(99, 102, 241, 0.12)', vx: 0.4, vy: 0.3 },
    { x: width * 0.8, y: height * 0.2, radius: 300, color: 'rgba(6, 182, 212, 0.12)', vx: -0.3, vy: 0.4 },
    { x: width * 0.5, y: height * 0.85, radius: 240, color: 'rgba(236, 72, 153, 0.08)', vx: 0.3, vy: -0.3 },
    { x: width * 0.15, y: height * 0.8, radius: 220, color: 'rgba(16, 185, 129, 0.09)', vx: -0.2, vy: -0.4 }
  ];

  function render() {
    ctx.clearRect(0, 0, width, height);

    blobs.forEach((blob) => {
      blob.x += blob.vx;
      blob.y += blob.vy;

      if (blob.x - blob.radius < 0 || blob.x + blob.radius > width) blob.vx *= -1;
      if (blob.y - blob.radius < 0 || blob.y + blob.radius > height) blob.vy *= -1;

      const gradient = ctx.createRadialGradient(
        blob.x, blob.y, 0,
        blob.x, blob.y, blob.radius
      );
      gradient.addColorStop(0, blob.color);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. TYPEWRITER EFFECT (MERN Stack Focus)
   ========================================================================== */
function initTypewriter() {
  const element = document.getElementById('typewriter-text');
  if (!element) return;

  const words = [
    "MERN Stack Developer",
    "React.js & Node.js Craftsman",
    "Parul University B.Tech CSE",
    "RESTful API & Backend Engineer"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   3. 3D GLASS CARD TILT EFFECT
   ========================================================================== */
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

/* ==========================================================================
   4. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      if (drawer.classList.contains('open')) {
        icon.className = 'fas fa-xmark';
      } else {
        icon.className = 'fas fa-bars';
      }
    }
  });
}

/* ==========================================================================
   5. SKILL FILTERING
   ========================================================================== */
function initSkillFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card-modern');

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied ${label}: ${text}`);
  }).catch(() => {
    showToast(`Copied to clipboard!`);
  });
}

function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-circle-check" style="color: #10b981;"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
