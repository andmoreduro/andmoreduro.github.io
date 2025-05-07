document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");

  function handleNavLinkClick(e) {
    // Remove 'active-section' class from all nav links
    navLinks.forEach((link) => {
      link.classList.remove("active-section");
    });

    // Add 'active-section' class to the clicked link
    e.target.classList.add("active-section");
  }

  // Add click event listener to each navigation link
  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavLinkClick);
  });
});
