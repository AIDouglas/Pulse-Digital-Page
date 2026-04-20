document.addEventListener('DOMContentLoaded', () => {
    // Menú móvil
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Contadores animados
    const counters = document.querySelectorAll('.counter');

    counters.forEach((counter) => {
        counter.innerText = '0';

        const updateCounter = () => {
            const target = Number(counter.getAttribute('data-target') || 0);
            const current = Number(counter.innerText || 0);
            const increment = Math.max(target / 200, 1);

            if (current < target) {
                counter.innerText = String(Math.min(Math.ceil(current + increment), target));
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = String(target);
            }
        };

        updateCounter();
    });

    // Animación del canvas
    const canvas = document.getElementById('linesCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let lines = [];
    const mouse = { x: -1000, y: -1000 };

    function resize() {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;

        if (!lines.length) {
            lines = Array.from({ length: 220 }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                speed: 0.1 + Math.random() * 0.5,
                baseHeight: 10 + Math.random() * 15,
                height: 6,
            }));
        }
    }

    window.addEventListener('resize', resize);
    resize();

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    function draw() {
        ctx.clearRect(0, 0, width, height);

        lines.forEach((line) => {
            line.x += line.speed;

            if (line.x > width) {
                line.x = 0;
                line.y = Math.random() * height;
            }

            const dx = line.x - mouse.x;
            const dy = line.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const area = 80;

            if (dist < area) {
                line.height = 40;
                ctx.fillStyle = '#4338ca';
                ctx.fillRect(line.x - 20, line.y - 6, 40, 6);
            } else {
                line.height += (line.baseHeight - line.height) * 0.1;
                ctx.beginPath();
                ctx.moveTo(line.x, line.y);
                ctx.lineTo(line.x, line.y - line.height);
                ctx.strokeStyle = '#4338ca';
                ctx.lineWidth = 3;
                ctx.stroke();
            }
        });

        requestAnimationFrame(draw);
    }

    draw();
});
