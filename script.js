// ################# Show Menu Section ##################

const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show-menu');
    });
  }
};
showMenu('nav-toggle', 'nav-menu');

// ################# Dark/Light Theme Toggle Section ##################

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
    darkTheme
  );
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](
    iconTheme
  );
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

// ################# Smooth Scroll Section ##################

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// ################# Scroll-Activated Animations Section ##################

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-active');
    } else {
      entry.target.classList.remove('animate-active');
    }
  });
});

document.querySelectorAll('section').forEach(section => {
  section.classList.add('animate');
  observer.observe(section);
});

// ################# Typewriter Effect Section ##################

const typewriter = (text, elementId, delay = 100) => {
  const element = document.getElementById(elementId);
  let index = 0;
  const type = () => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, delay);
    }
  };
  type();
};

document.addEventListener('DOMContentLoaded', () => {
  typewriter("Hey, I'm Prateek Pandey", 'typewriter-text', 100);
});

// ################# Contact Form Validation and Submission Section ##################

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const statusMessage = document.getElementById('form-status');
  
  fetch('https://formspree.io/f/xkgwzpnj', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      statusMessage.textContent = 'Your message has been sent!';
      statusMessage.style.display = 'block';
      form.reset();
    } else {
      statusMessage.textContent = 'Oops! There was a problem with your submission. Please try again.';
      statusMessage.style.display = 'block';
    }
  }).catch(error => {
    statusMessage.textContent = 'Oops! There was a problem with your submission. Please try again.';
    statusMessage.style.display = 'block';
  });

  setTimeout(() => {
    statusMessage.style.display = 'none';
  }, 5000);
});
