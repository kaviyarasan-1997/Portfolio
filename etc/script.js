5// 1. Electrical Energy Canvas
const canvas = document.getElementById('energyCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const mouse = { x: null, y: null };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
window.addEventListener('touchstart', (e) => { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; });

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }
  update() {
    this.x += this.speedX; this.y += this.speedY;
    let dx = mouse.x - this.x; let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    if (distance < 120) {
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(this.x, this.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
    }
  }
  draw() {
    ctx.fillStyle = '#00d2ff';
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
  }
}

function init() { for(let i=0; i<80; i++) particles.push(new Particle()); }
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
init(); animate();

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
