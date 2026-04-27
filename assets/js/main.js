document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    const faqButtons = document.querySelectorAll('.faq-item');

    faqButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const panel = button.nextElementSibling;
            const isOpen = button.getAttribute('aria-expanded') === 'true';

            faqButtons.forEach((otherButton) => {
                if (otherButton !== button) {
                    otherButton.setAttribute('aria-expanded', 'false');
                    const otherPanel = otherButton.nextElementSibling;
                    if (otherPanel) otherPanel.classList.add('hidden');
                    const otherIcon = otherButton.querySelector('.faq-icon');
                    if (otherIcon) otherIcon.textContent = '+';
                }
            });

            button.setAttribute('aria-expanded', String(!isOpen));

            if (panel) {
                panel.classList.toggle('hidden');
            }

            const icon = button.querySelector('.faq-icon');
            if (icon) {
                icon.textContent = isOpen ? '+' : '−';
            }
        });
    });
});
