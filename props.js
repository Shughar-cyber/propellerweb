/* ═══════════════════════════════════════════════
   Propeller Digital Agency — Recruitment Page
   props.js  (fully corrected)
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── STICKY NAVBAR ──────────────────────────── */
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ── HAMBURGER MENU ─────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('hidden');
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.add('hidden');
    });
  });

  /* ── SMOOTH SCROLLING ───────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── SCROLL REVEAL ──────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-right');
  const observer  = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => observer.observe(el));

  /* ── HERO INITIAL ANIMATION ─────────────────── */
  const heroReveal = document.querySelector('#hero .reveal');
  if (heroReveal) setTimeout(() => heroReveal.classList.add('visible'), 100);
  const heroRevealRight = document.querySelector('#hero .reveal-right');
  if (heroRevealRight) setTimeout(() => heroRevealRight.classList.add('visible'), 300);

  /* ── BUTTON RIPPLE ──────────────────────────── */
  document.querySelectorAll('.btn-primary, .btn-secondary, .zoom-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect   = this.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute;border-radius:50%;
        width:${size}px;height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        background:rgba(255,255,255,0.25);
        transform:scale(0);animation:ripple 0.6s ease-out forwards;
        pointer-events:none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `@keyframes ripple { to { transform:scale(2.5);opacity:0; } }`;
  document.head.appendChild(rippleStyle);

  /* ══════════════════════════════════════════════
     RESUME UPLOAD PREVIEW
  ══════════════════════════════════════════════ */
  const resumeInput   = document.getElementById('resume');
  const uploadArea    = document.getElementById('uploadArea');
  const uploadIconBox = document.getElementById('uploadIconBox');  // the div wrapper
  const uploadText    = document.getElementById('uploadText');
  const uploadSubText = document.getElementById('uploadSubText');
  const resumeError   = document.getElementById('resumeError');

  function resetUploadUI() {
    uploadArea.classList.remove('has-file');
    uploadIconBox.innerHTML = '<i class="fas fa-cloud-upload-alt text-brand-sky text-2xl"></i>';
    uploadText.textContent    = 'Click to upload your resume';
    uploadText.classList.remove('text-green-600');
    uploadSubText.textContent = 'or drag and drop your file here';
    resumeError.textContent   = '';
  }

  function applyFilePreview(file) {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      resumeError.textContent = 'File exceeds 5MB limit. Please choose a smaller file.';
      resumeInput.value = '';
      return;
    }
    resumeError.textContent = '';
    uploadArea.classList.add('has-file');
    uploadIconBox.innerHTML = '<i class="fas fa-file-circle-check text-green-500 text-2xl"></i>';
    uploadText.textContent    = file.name;
    uploadText.classList.add('text-green-600');
    uploadSubText.textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB — Click to change';
  }

  resumeInput.addEventListener('change', () => applyFilePreview(resumeInput.files[0]));

  // Drag & drop
  uploadArea.addEventListener('dragover', e => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
  });
  uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
  uploadArea.addEventListener('drop', e => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && /\.(pdf|doc|docx)$/i.test(file.name)) {
      const dt = new DataTransfer();
      dt.items.add(file);
      resumeInput.files = dt.files;
      applyFilePreview(file);
    }
  });

  /* ══════════════════════════════════════════════
     FORM VALIDATION
  ══════════════════════════════════════════════ */
  const validators = {
    fullName: {
      el:  () => document.getElementById('fullName'),
      err: () => document.getElementById('fullNameError'),
      validate(v) {
        if (!v.trim()) return 'Full name is required.';
        if (v.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      }
    },
    address: {
      el:  () => document.getElementById('address'),
      err: () => document.getElementById('addressError'),
      validate(v) {
        if (!v.trim()) return 'Address is required.';
        if (v.trim().length < 5) return 'Please enter a valid address.';
        return '';
      }
    },
    age: {
      el:  () => document.getElementById('age'),
      err: () => document.getElementById('ageError'),
      validate(v) {
        if (!v) return 'Age is required.';
        const n = parseInt(v, 10);
        if (isNaN(n) || n < 18) return 'You must be at least 18 years old.';
        if (n > 80) return 'Please enter a valid age.';
        return '';
      }
    },
    gender: {
      el:  () => document.getElementById('gender'),
      err: () => document.getElementById('genderError'),
      validate(v) {
        if (!v) return 'Please select your gender.';
        return '';
      }
    },
    phone: {
      el:  () => document.getElementById('phone'),
      err: () => document.getElementById('phoneError'),
      validate(v) {
        if (!v.trim()) return 'Phone number is required.';
        const cleaned = v.replace(/[\s\-().+]/g, '');
        if (!/^\d{7,15}$/.test(cleaned)) return 'Please enter a valid phone number.';
        return '';
      }
    },
    email: {
      el:  () => document.getElementById('email'),
      err: () => document.getElementById('emailError'),
      validate(v) {
        if (!v.trim()) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email address.';
        return '';
      }
    }
  };

  function validateField(key) {
    const def   = validators[key];
    const input = def.el();
    const errEl = def.err();
    const msg   = def.validate(input.value);
    input.classList.toggle('error', !!msg);
    input.classList.toggle('valid', !msg);
    errEl.textContent = msg;
    return !msg;
  }

  function validateAll() {
    return Object.keys(validators).map(validateField).every(Boolean);
  }

  Object.keys(validators).forEach(key => {
    const input = validators[key].el();
    input.addEventListener('blur',  () => validateField(key));
    input.addEventListener('input', () => { if (input.classList.contains('error')) validateField(key); });
  });

  /* ══════════════════════════════════════════════
     SUCCESS MODAL
  ══════════════════════════════════════════════ */
  const successModal = document.getElementById('successModal');
  const closeModal   = document.getElementById('closeModal');
  const modalOverlay = document.getElementById('modalOverlay');

  function showSuccessModal() {
    successModal.classList.remove('hidden');
    successModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function hideSuccessModal() {
    successModal.classList.add('hidden');
    successModal.classList.remove('show');
    document.body.style.overflow = '';
  }

  closeModal.addEventListener('click', hideSuccessModal);
  modalOverlay.addEventListener('click', hideSuccessModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hideSuccessModal(); });

  /* ══════════════════════════════════════════════
     FORM SUBMISSION → WEB3FORMS
  ══════════════════════════════════════════════ */
  const form      = document.getElementById('applicationForm');
  const submitBtn = document.getElementById('submitBtn');
  const submitIcon = document.getElementById('submitIcon');
  const submitText = document.getElementById('submitText');
  const successMsg = document.getElementById('successMsg');
  const errorMsg   = document.getElementById('errorMsg');

  if (!form || !submitBtn || !submitIcon || !submitText || !successMsg || !errorMsg) {
    console.warn('Application form elements are not ready; skipping submission handler.');
    return;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Run full validation first
    if (!validateAll()) {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Loading state
    submitIcon.className   = 'fas fa-spinner fa-spin';
    submitText.textContent = 'Submitting...';
    submitBtn.disabled     = true;
    errorMsg.classList.add('hidden');
    successMsg.classList.add('hidden');

    try {
      const formData = new FormData(form);

      const res = await fetch('https://usebasin.com/f/e1e8d78ad55b', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      const data = await res.json();
      console.log('Basin response:', data);

      if (res.ok && data.success) {
        // Show modal + inline banner
        showSuccessModal();
        successMsg.classList.remove('hidden');
        errorMsg.classList.add('hidden');
        // Reset form and upload UI
        form.reset();
        resetUploadUI();
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        errorMsg.classList.remove('hidden');
        successMsg.classList.add('hidden');
        console.error('Basin error:', data);
      }

    } catch (err) {
      const message = err && err.message ? err.message : 'Unknown network error.';
      console.error('Basin fetch error:', message);
      errorMsg.classList.remove('hidden');
      successMsg.classList.add('hidden');
      const errorText = errorMsg.querySelector('p');
      if (errorText) {
        errorText.textContent = 'Network error: ' + message + '. Check your connection.';
      }
    }

    // Reset button state
    if (submitIcon) submitIcon.className = 'fas fa-paper-plane';
    if (submitText) submitText.textContent = 'Submit Application';
    if (submitBtn) submitBtn.disabled = false;
  });

}); // end DOMContentLoaded