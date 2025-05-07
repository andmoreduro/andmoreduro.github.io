document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelector('section');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollX >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(navLink => {
      const className = 'active-section';
      navLink.classList.remove(className);
      if (navLink.getAttribute('href').slice(1) === current) {
        navLink.classList.add(className);
      }
    });
  });
});
