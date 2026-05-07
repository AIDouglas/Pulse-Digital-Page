// Inicializar interacciones cuando el documento esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupEventListeners);
} else {
    setupEventListeners();
}

function setupEventListeners() {
    // Menú móvil con animación
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                // Abrir menú
                mobileMenu.classList.remove('hidden');
                menuBtn.style.transform = 'rotate(90deg)';
            } else {
                // Cerrar menú
                mobileMenu.classList.add('hidden');
                menuBtn.style.transform = 'rotate(0deg)';
            }
        });

        // Cerrar menú cuando se hace click en un enlace
        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuBtn.style.transform = 'rotate(0deg)';
            });
        });
    }

    // FAQ con animación
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
}
