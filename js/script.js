// ==========================================
// 1. MOBILE RESPONSIVE HAMBURGER MENU NAVIGATION
// ==========================================
function mostrarOcultarMenu() {
    const nav = document.getElementById("nav");
    const menuIcon = document.getElementById("menu-icon");
    
    if (nav.classList.contains("responsive")) {
        nav.classList.remove("responsive");
        menuIcon.className = "fas fa-bars";
    } else {
        nav.classList.add("responsive");
        menuIcon.className = "fas fa-xmark"; // Requires FontAwesome 6
    }
}

function seleccionar() {
    // Hide menu stack instantly once a navigation item hyperlink anchor link gets clicked
    const nav = document.getElementById("nav");
    const menuIcon = document.getElementById("menu-icon");
    nav.classList.remove("responsive");
    menuIcon.className = "fas fa-bars";
}

// ==========================================
// 2. DAY/NIGHT THEME SLIDER SYSTEM
// ==========================================
function toggleTheme(checkbox) {
    if (checkbox.checked) {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
    }
}

// ==========================================
// 3. SKILLS ANIMATION LAYER (SCROLL MONITOR)
// ==========================================
function efectoHabilidades() {
    const skillsSection = document.getElementById("skills");
    if (!skillsSection) return;
    
    const targetPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (targetPosition < screenPosition) {
        document.querySelectorAll(".progreso").forEach(bar => {
            bar.classList.add("active");
        });
    }
}
window.addEventListener("scroll", efectoHabilidades);
window.addEventListener("load", efectoHabilidades);

// ==========================================
// 4. CLIENT SIDE VANILLA PORTFOLIO GRID FILTER
// ==========================================
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        document.querySelectorAll(".image-container .box").forEach(item => {
            if (filterValue === "all" || item.classList.contains(filterValue)) {
                item.style.display = "block";
                setTimeout(() => { item.style.opacity = "1"; item.style.transform = "scale(1)"; }, 20);
            } else {
                item.style.opacity = "0";
                item.style.transform = "scale(0.85)";
                setTimeout(() => { item.style.display = "none"; }, 300);
            }
        });
    });
});

// ==========================================
// 5. INTERACTIVE GLITTER PARTICLE ENGINE
// ==========================================
const canvas = document.getElementById("energyCanvas");
const ctx = canvas.getContext("2d");

let mouse = { x: null, y: null, radius: 120 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener("touchmove", (e) => { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }, { passive: true });
window.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });
window.addEventListener("touchend", () => { mouse.x = null; mouse.y = null; });

let particles = [];
const baseCount = window.innerWidth < 768 ? 40 : 90;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.twinkleSpeed = Math.random() * 0.01 + 0.005;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = document.body.classList.contains("light-mode") ? "#0076a3" : "#00d2ff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        this.opacity += this.twinkleSpeed;
        if (this.opacity > 1 || this.opacity < 0.2) {
            this.twinkleSpeed *= -1;
        }

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                let force = (mouse.radius - distance) / mouse.radius;
                let pushX = (dx / distance) * force * 2;
                let pushY = (dy / distance) * force * 2;
                
                this.x -= pushX;
                this.y -= pushY;
            }
        }
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < baseCount; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ==========================================
// 6. BACKGROUND MUSIC AUTOPLAY SAFETY FALLBACK
// ==========================================
window.addEventListener("click", () => {
    const audio = document.getElementById("bgMusic");
    if(audio && audio.paused) {
        audio.play().catch(() => {/* Handle modern browser silent launch constraints safely */});
    }
}, { once: true });



// 2. Chatbot Close/Open Logic
const bot = document.getElementById('bot-container');
const closeBtn = document.getElementById('closeBot');
const openChatMenu = document.getElementById('openChatMenu');
const menuDropdown = document.getElementById('menuDropdown');

closeBtn.addEventListener('click', () => bot.classList.add('bot-hidden'));
openChatMenu.addEventListener('click', () => {
  bot.classList.remove('bot-hidden');
  menuDropdown.classList.remove('show');
});

// 3. Menu & Navigation
document.getElementById('menuBtn').addEventListener('click', () => menuDropdown.classList.toggle('show'));

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});

// 4. Drag Logic (Mobile)
bot.addEventListener('touchmove', (e) => {
  let touch = e.touches[0];
  bot.style.left = touch.clientX - 30 + 'px';
  bot.style.top = touch.clientY - 30 + 'px';
  bot.style.bottom = 'auto'; bot.style.right = 'auto';
});