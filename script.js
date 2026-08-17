// Mobile menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Form handler — sends the message to zyses.pk@gmail.com via Web3Forms
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const budget = document.getElementById('budget').value.trim();

  if (!name || !email || !message) {
    note.textContent = 'Please fill in all required fields.';
    note.style.color = '#c0392b';
    return;
  }

  const data = {
    access_key: document.getElementById('accessKey').value,
    name: name,
    email: email,
    budget: budget || 'Not specified',
    message: message,
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  note.textContent = '';

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      note.textContent = 'Thanks ' + name + '! Your message has been sent — I\'ll reply within 24 hours.';
      note.style.color = '#2e7d32';
      form.reset();
    } else {
      note.textContent = 'Something went wrong. Please try again or email me directly at zyses.pk@gmail.com.';
      note.style.color = '#c0392b';
    }
  } catch (err) {
    note.textContent = 'Network error. Please try again or email me directly at zyses.pk@gmail.com.';
    note.style.color = '#c0392b';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send message';
  }
});