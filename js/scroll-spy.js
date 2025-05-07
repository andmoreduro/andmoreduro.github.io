document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const contentPanel = document.querySelector('.content');

    // Calculate the position of each section relative to the content panel
    function getSectionPositions() {
        return Array.from(sections).map(section => ({
            id: section.id,
            top: section.offsetTop,
            bottom: section.offsetTop + section.offsetHeight
        }));
    }

    // Keep track of section positions and recalculate if window is resized
    let sectionPositions = getSectionPositions();
    window.addEventListener('resize', () => {
        sectionPositions = getSectionPositions();
    });

    // Function to determine which section is in view with improved calculations
    function updateActiveSection() {
        // Get the current scroll position of the content panel
        const scrollPosition = contentPanel.scrollTop;
        const viewportHeight = contentPanel.clientHeight;
        const viewportMiddle = scrollPosition + (viewportHeight / 2);

        // Determine which section takes up most of the viewport
        let currentSection = null;
        let maxVisibility = 0;

        sectionPositions.forEach(section => {
            // Calculate how much of the section is visible
            const sectionTop = Math.max(section.top, scrollPosition);
            const sectionBottom = Math.min(section.bottom, scrollPosition + viewportHeight);
            const visibleHeight = Math.max(0, sectionBottom - sectionTop);

            // If this section has more visible area than the previous max,
            // or if the section contains the middle of the viewport
            if (
                visibleHeight > maxVisibility ||
                (viewportMiddle >= section.top && viewportMiddle <= section.bottom)
            ) {
                maxVisibility = visibleHeight;
                currentSection = section.id;
            }
        });

        // Special case for bottom of the page
        if (contentPanel.scrollTop + contentPanel.clientHeight >= contentPanel.scrollHeight - 20) {
            currentSection = sections[sections.length - 1].id;
        }

        // If we're at the very top, highlight the first section
        if (scrollPosition <= 10) {
            currentSection = sections[0].id;
        }

        // Update navigation highlights with smooth transition
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').substring(1);

            if (targetId === currentSection) {
                if (!link.classList.contains('active-section')) {
                    link.classList.add('active-section');
                }
            } else {
                link.classList.remove('active-section');
            }
        });
    }

    contentPanel.addEventListener('scroll', updateActiveSection);

    // Initial call to set the active section on page load
    updateActiveSection();
});
