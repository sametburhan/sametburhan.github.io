document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("starCanvas");
  const ctx = canvas.getContext("2d");
  const container = document.getElementById("star-container");

  const stars = [];
  const numStars = 200;

  function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    createStars(); // Ekran boyutu değiştiğinde yıldızları yeniden oluştur
  }

  function createStars() {
    stars.length = 0; // Mevcut yıldızları temizle
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
      });
    }
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas(); // İlk boyut ayarlaması ve yıldızları oluştur

  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
      
      star.x += star.speedX;
      star.y += star.speedY;
      
      if (star.x < 0 || star.x > canvas.width) star.speedX *= -1;
      if (star.y < 0 || star.y > canvas.height) star.speedY *= -1;
    });
    
    requestAnimationFrame(animateStars);
  }

  animateStars(); // Animasyonu başlat
});

/* JavaScript to close the menu when clicking outside */
document.addEventListener('click', function(event) {
  const menu = document.querySelector('.navbar .menu');
  const hamburger = document.querySelector('.navbar .hamburger');
  if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      menu.classList.remove('active');
  }
});

