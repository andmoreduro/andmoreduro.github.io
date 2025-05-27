// js/hamburger-menu.js
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.getElementById('hamburger-button');
    const closeNavButton = document.getElementById('close-nav-button');
    const navPanel = document.getElementById('nav-panel');
    const navLinks = navPanel.querySelectorAll('a.nav-link');
    const mainContent = document.querySelector('.content'); // Or a more specific main wrapper if needed

    const openNav = () => {
        navPanel.classList.add('nav-open');
        hamburgerButton.classList.add('active');
        hamburgerButton.setAttribute('aria-expanded', 'true');
        document.body.classList.add('no-scroll'); // Prevent body scroll when nav is open
    };

    const closeNav = () => {
        navPanel.classList.remove('nav-open');
        hamburgerButton.classList.remove('active');
        hamburgerButton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll'); // Restore body scroll
    };

    if (hamburgerButton && navPanel) {
        hamburgerButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navPanel.classList.contains('nav-open')) {
                closeNav();
            } else {
                openNav();
            }
        });
    }

    if (closeNavButton) {
        closeNavButton.addEventListener('click', (e) => {
            e.stopPropagation();
            closeNav();
        });
    }

    // Close nav when a link is clicked (useful for SPAs or same-page anchors)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if the hamburger button is visible (i.e., we are in mobile view)
            if (getComputedStyle(hamburgerButton).display !== 'none') {
                // If it's a link to a different page or a hash link on the same page, close nav.
                closeNav();
            }
        });
    });

    // Close nav if user clicks outside of it on the main content (optional)
    // Be careful with this if content has interactive elements near the edge
    document.addEventListener('click', (e) => {
        if (navPanel.classList.contains('nav-open') &&
            !navPanel.contains(e.target) &&
            !hamburgerButton.contains(e.target)) {
            closeNav();
        }
    });


    // Close nav on 'Escape' key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navPanel.classList.contains('nav-open')) {
            closeNav();
        }
    });
});
